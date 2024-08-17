import express, { response } from 'express'
import bodyparser from 'json-body-parser'
import dotenv from 'dotenv'
import mysql2 from 'mysql2'
import {GoogleGenerativeAI} from '@google/generative-ai'
import OpenAI from "openai";

// const openai = new OpenAI();

// async function main() {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a helpful assistant." }],
//       model: "gpt-4o-mini",
//     });
  
//     console.log(completion.choices[0]);
//   }
  
//   main();



// const { GoogleGenerativeAI } = require("@google/generative-ai");

// configure env files
dotenv.config()


//configure mysql database
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: "codesync",
  });
  

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const app = express()
const port = 5000

app.use(bodyparser)


app.post('/api/aihelp',(req, res)=>{

    try {
        
    console.log(req.body.code);
    
    const language = "c"

    // res.send("I can hear You")

    async function run() {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      
        //prompt to send to AI

        const prompt = "Can you help me with this "+ language  +" code? Dont tell me the answer, just tell me where I could be wrong in the code. If it is correct pls tell me so: " + req.body.code;
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log(text);

        res.json({response : text})
    }
      
    run();

} catch (error) {
    console.log(error);
    res.json({response : "An error occured in the server"})  
}
})


app.post('/api/submitquestion', (req, res)=>{
    //submit question

    try {
        
        const questionData = req.body
        //console.log(questionData);

        // {
        //     desc: '',
        //     qname: '',
        //     defaultCode: '//enter your default code here \n #include<stdio.h>',
        //     checkBy: 'testcase',
        //     testcases: [
        //       {
        //         no: 0,
        //         op: '',
        //         opType: 'string',
        //         ip: 'ee',
        //         ipType: 'string',
        //         runnercode: 'fffff'
        //       }
        //     ],
        //     funcName: 'ff'
        //   }

        //first add data to questions table
        const questionQuery = `insert into questions(qname, description, defcode, checkBy, funcname) values ( ?, ?, ?, ?, ?);`;
        const qValuesArray = [questionData.qname, questionData.desc, questionData.defaultCode, questionData.checkBy, questionData.funcName]
        
        db.query(questionQuery, qValuesArray, (err, result)=>{

            //insert the question into database
            if(err){
                throw err
            }
            console.log(result);
        })

        
        var current_question_id = 0

        if(questionData.checkBy == 'testcase'){
            //if the q is checked by testcase, then add it to db
            

            db.query("select max(q_id) as current_id from questions", [], (err, result)=>{
                // console.log(result[0].current_id);
               current_question_id = result[0].current_id
               
               
               //insert into testcase db

               const testcases = questionData.testcases;
               console.log(testcases);

// +------------+--------------+------+-----+---------+----------------+
// | Field      | Type         | Null | Key | Default | Extra          |
// +------------+--------------+------+-----+---------+----------------+
// | t_id       | int          | NO   | PRI | NULL    | auto_increment |
// | tno        | int          | YES  |     | NULL    |                |
// | q_id       | int          | YES  |     | NULL    |                |
// | runnercode | text         | YES  |     | NULL    |                |
// | ip         | varchar(100) | YES  |     | NULL    |                |
// | iptype     | varchar(100) | YES  |     | NULL    |                |
// | op         | varchar(100) | YES  |     | NULL    |                |
// | optype     | varchar(100) | YES  |     | NULL    |                |
// +------------+--------------+------+-----+---------+----------------+

               testcases.forEach(testcase => {
                const query = `INSERT INTO testcases (tno, q_id, runnercode, ip, iptype, op, optype) VALUES (?, ?, ?, ?, ?, ?, ?);`;
            
                db.query(query, [testcase.no, current_question_id, testcase.runnercode, testcase.ip, testcase.ipType, testcase.op, testcase.opType], (err, res) => {
                    if (err) {
                        console.log("Error inserting testcase:", err);
                        throw err
                    } else {
                        console.log("Inserted testcase:", res);
                    }
                });
            });
            
               

            })

        }

        


        

//         +-------------+--------------+------+-----+---------+----------------+
// | Field       | Type         | Null | Key | Default | Extra          |
// +-------------+--------------+------+-----+---------+----------------+
// | q_id        | int          | NO   | PRI | NULL    | auto_increment |
// | qname       | varchar(500) | YES  |     | NULL    |                |
// | description | text         | YES  |     | NULL    |                |
// | defcode     | text         | YES  |     | NULL    |                |
// | checkBy     | varchar(100) | YES  |     | NULL    |                |
// | funcname    | varchar(100) | YES  |     | NULL    |                |
// +-------------+--------------+------+-----+---------+----------------+

        const testcases = questionData.testcases
        console.log(testcases);
        
        
        res.json({resp : "submitted question"})

    } catch (error) {
        console.log(error);
        res.json({resp: "An error occurred in server"})
    }
})

app.get('/api/getProblemList' , (req, res)=>{
    const q = "select q_id, qname from questions;"

    db.query(q, [], (err, resp)=>{
        if (err) {
            throw err
        }

        console.log(resp);
        res.json(resp)  
    })
})


app.get('/api/getprobleminfo/:qid', (req, res)=>{

    const qid = req.params.qid

    console.log(qid);

    const q = "select * from questions where q_id = ? ;"

    db.query(q, [qid], (err, result)=>{
        if (err) {
            throw err
        }

        console.log(result);
        res.json(result)
    })
    
    
})

app.post('/api/checktc', (req, res)=>{

    console.log(req.body.usercode);

    let usercode = req.body.usercode

    db.query('select * from testcases where q_id = ? ;',[req.body.qid], (err, result)=>{
        if (err) {
            throw err
        }

        console.log(result);
        
    })
    

    res.json({resp : "check"})
})


app.listen(port, ()=>{
    console.log("App is listening at port "+port);
})