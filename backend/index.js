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
const baseURLGlobal = "https://emkc.org/api/v2/piston/execute"

app.use(bodyparser)


app.post('/api/aihelp',(req, res)=>{

    try {
        
    // console.log(req.body.code);
    
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

        // console.log(text);

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
        const questionQuery = `insert into questions(qname, description, defcode, checkBy, funcname, solution, qtype) values ( ?, ?, ?, ?, ?, ?, ?);`;
        const qValuesArray = [questionData.qname, questionData.desc, questionData.defaultCode, questionData.checkBy, questionData.funcName, questionData.solution, questionData.qtype]
        
        db.query(questionQuery, qValuesArray, (err, result)=>{

            //insert the question into database
            if(err){
                throw err
            }
            // console.log(result);
        })

        
        var current_question_id = 0

        if(questionData.checkBy == 'testcase'){
            //if the q is checked by testcase, then add it to db
            

            db.query("select max(q_id) as current_id from questions", [], (err, result)=>{
                // console.log(result[0].current_id);
               current_question_id = result[0].current_id
               
               
               //insert into testcase db

               const testcases = questionData.testcases;
            //    console.log(testcases);

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
    const q = "select q_id, qname, qtype from questions;"

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

app.post('/api/checktc', async (req, res) => {

    console.log(req.body.usercode);

    let error = ''
    let wrong_input = ''
    let your_output = ''
    let expected_output = ''
    let usercode = req.body.usercode;

    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM testcases WHERE q_id = ? ;', [req.body.qid], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        console.log(result);

        const baseURL = "https://emkc.org/api/v2/piston/execute"; // post

        let status = true;

        async function testQuestion(testc) {
            const response = await fetch(baseURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language: "c",
                    version: "10.2.0",
                    aliases: ["gcc"],
                    runtime: "gcc",
                    files: [
                        {
                            name: "my_cool_code.c",
                            content: usercode + testc.runnercode,
                        },
                    ],
                    stdin: "",
                    args: [],
                    compile_timeout: 10000,
                    run_timeout: 3000,
                }),
            });

            const data = await response.json();
            // console.log('\n' + usercode + testc.runnercode);
            console.log(data);

            console.log("code op "+data.run.stdout);
            console.log("\ndesired "+testc.op);
            
            

            if (data.run.stderr) {
                //error aaya
                console.log(data.run.stderr);
                error = data.run.stderr;
                
                status = false;
                return false;
            }

            else if (data.run.stdout != testc.op ) {

                your_output = data.run.stdout
                return false
            }
            return true;

            //function ends
        }

        // Iterate over each test case with a 300ms delay
        for (const testc of result) {
            const isSuccess = await testQuestion(testc);
            if (!isSuccess) {
                res.json({ remark: "wrong" , error : error, input : testc.ip, expected_output: testc.op , your_output : your_output});
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        res.json({ remark: "correct" });

    } catch (error) {
        console.error("Error during database query or execution:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/api/tcvalid',async (req, res)=>{
    console.log(req.body);

    const response = await fetch(baseURLGlobal, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            language: "c",
            version: "10.2.0",
            aliases: ["gcc"],
            runtime: "gcc",
            files: [
                {
                    name: "my_cool_code.c",
                    content:req.body.code,
                },
            ],
            stdin: "",
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
        }),
    });

    const data = await response.json();

    const remark = {}
    remark.status = 'invalid'

    if (data.run.stderr) {
        remark.error = data.run.stderr
    }

    else if (data.run.stdout == req.body.op) {
        remark.status = 'valid'
    }

    console.log(data);
    

    res.json(remark)
})


app.get('/api/getTestcases/:qid', (req, res)=>{
    const qid = req.params.qid

    db.query('select * from testcases where q_id = ?' , [qid], (err, result)=>{
        if (err) {
            res.json({"error":err})
            return
        }

        res.json(result)
    })
})

app.post('/api/solved', (req , res)=>{

    const userid = req.body.userid
    const qid = req.body.qid

    db.query("insert into solved(q_id, user_id) values (? , ?);", [qid, userid], (err, result)=>{
        if (err) {
            res.json({"error":err})
            return
        }

        res.json({"status": "added"})
    })
})

app.post('/api/checksolved' , (req, res)=>{
    const userid = req.body.userid
    const qid = req.body.qid

    console.log(req.body);
    

    db.query("select * from solved where q_id = ? and user_id = ? ;", [qid, userid], (err, result)=>{
        if (err) {
            res.json({"error":err})
            return
        }

        if (result.length === 0) {
            res.json({'status':false})
            return
        }
        res.json({"status": true})
    })
})

app.post('/api/checkbyai',(req, res)=>{
    console.log(req.body);

    const desc = req.body.desc
    const code = req.body.code


    const prompt = `You are an instructor who will check a user written code. If the user written code is correct and should execute, just say 'pass' . Else if there is any minor or major mistake, say 'fail'.  
    here is the question 
    ${desc}
    Here is the code wriitten by user : ${code}`

try{
    async function run() {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      
        //prompt to send to AI
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log(text);


        if (text.includes('pass')) {
            
            const userid = req.body.userid
            const qid = req.body.qid
        
            db.query("insert into solved(q_id, user_id) values (? , ?);", [qid, userid], (err, result)=>{
                if (err) {
                    res.json({"error":err})
                    return
                }
                console.log("added to db");
                
            })
        }
        res.json({response : text})
    }
      
    run();

} catch (error) {
    console.log(error);
    res.json({response : "An error occured in the server"})  
}
})

app.get('/api/getSolvedProblems/:userid',async (req , res)=>{

    const userid =  req.params.userid
    console.log(userid);

    
    db.query('select * from solved where user_id = ?', [userid], (err , result)=>{
        if (err) {
            res.json({error : err})
        }

        console.log(result);
        
        const finalQids = []

        result.forEach((el)=>{
            finalQids.push(el.q_id)
            
        })

        console.log(finalQids);
        
        res.json({quids : finalQids})
        
    })
    
})

app.listen(port, ()=>{
    console.log("App is listening at port "+port);
})