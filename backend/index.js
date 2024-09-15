import express, { response } from 'express'
import bodyparser from 'json-body-parser'
import dotenv from 'dotenv'
import mysql2 from 'mysql2'
import {GoogleGenerativeAI} from '@google/generative-ai'
import jwt from 'jsonwebtoken'
import OpenAI from "openai";
import { Server } from 'socket.io'
import { createServer } from 'http'
import { error } from 'console'

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

const jwtKey = 'aanv'
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
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors:'*'
})

app.use(bodyparser)

//code starts here



//socket connections here

io.on('connection', (socket)=>{
    console.log("new user connected with id as ",socket.id);

    socket.on('message', (message)=>{
        io.emit('reply', message)
    })

    socket.on('join', (room)=>{
        socket.join(room)
    })

    socket.on('collab', (code, room)=>{
        socket.to(room).emit('updated', code)
    })
})


//normal requests here

app.post('/api/getfriends', authenticateUser, (req, res)=>{
    console.log(req.user.userid, " wants to get friend with query",req.body.query);

    const s = '%' + req.body.query + '%'

    db.query('select username, userid from users where username like ? and userid != ? ;', [s, req.user.userid], (err, resp)=>{
        if ( err ) return console.log(err);
        
        console.log(resp);
        res.json(resp)
    })
})

app.post('/api/aihelp',(req, res)=>{

    try {
        
    // console.log(req.body.code);
    
    const language = "c"

    // res.send("I can hear You")

    async function run() {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      
        //prompt to send to AI

        const prompt = `"Can you help me with this ${language} code? Dont tell me the answer, just tell me where I could be wrong in the code. If it is correct pls tell me so: ${req.body.code}
        
        here is the problem description:
        ${req.body.description}
        `;
      
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
        // console.log(testcases);
        
        
        res.json({resp : "submitted question"})

    } catch (error) {
        console.log(error);
        res.json({resp: "An error occurred in server"})
    }
})

app.get('/api/getProblemList/:type' , (req, res)=>{
    const type = req.params.type
    // console.log(type);
    
    let q = "select q_id, qname, qtype from questions where qtype = ?;"


    if (type == 'all') {
        q = "select q_id, qname, qtype from questions;"
    }

    db.query(q, [type], (err, resp)=>{
        if (err) {
            throw err
        }

        // console.log(resp);
        res.json(resp)  
    })
})


app.get('/api/getprobleminfo/:qid', (req, res)=>{

    const qid = req.params.qid

    // console.log(qid);

    const q = "select * from questions where q_id = ? ;"

    db.query(q, [qid], (err, result)=>{
        if (err) {
            throw err
        }

        // console.log(result);
        res.json(result)
    })
    
    
})

app.post('/api/checktc', async (req, res) => {

    // console.log(req.body.usercode);

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

        // console.log(result);

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
            // console.log(data);

            // console.log("code op "+data.run.stdout);
            // console.log("\ndesired "+testc.op);
            
            

            if (data.run.stderr) {
                //error aaya
                // console.log(data.run.stderr);
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
    // console.log(req.body);

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

    // console.log(data);
    

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

app.post('/api/checksolved' , authenticateUser, (req, res)=>{
    const userid = req.user.userid
    const qid = req.body.qid

    // console.log(req.body);
    

    db.query("select * from solved where q_id = ? and user_id = ? ;", [qid, userid], (err, result)=>{
        if (err) {
            res.json({"error":err})
            return
        }

        if (result.length === 0) {
            res.json({'status':false, 'userid' : userid})
            return
        }
        res.json({"status": true})
    })
})

app.post('/api/checkbyai',(req, res)=>{
    // console.log(req.body);

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

        // console.log(text);


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

app.post('/api/getSolvedProblems',authenticateUser, async (req , res)=>{

    const userid =  req.user.userid
    // console.log(userid);

    
    db.query('select * from solved where user_id = ?', [userid], (err , result)=>{
        if (err) {
            res.json({error : err})
        }

        // console.log(result);
        
        const finalQids = []

        result.forEach((el)=>{
            finalQids.push(el.q_id)
            
        })

        // console.log(finalQids);
        
        res.json({quids : finalQids})
        
    })
    
})


app.post('/api/signup', (req, res)=>{

    // console.log(req.body);
    
    let data = [req.body.name , req.body.email , req.body.password]

    let q = "insert into users(username , email, password) values (? , ? , ?) ; "


    db.query(q, data, (error, response)=>{
        if (error) {
            console.log(error);
            res.json({"message":"failure"})
        }

        // console.log(response);
        res.json({"message": "success"})
        
    })
})

app.post('/api/login', async (req, res)=>{

    let data = [req.body.email , req.body.password]

    // console.log(req.body);
    

    //check database

    let q = "select * from users where email = ? and password = ? ;";

    db.query(q, data, (error, response)=>{
        if (error) {
            console.log(error);
            res.json({"message":false})
        }

        // console.log("len is "+ response.length);
        // console.log(response);
        
        
        if (response.length === 0) {
            res.json({"message": false})
           
        }  
        else{

            //user is authenticated
            const username = response[0].username
            const userid = response[0].userid
            const role = response[0].role

            const tokenData = {
                username : username,
                userid : userid,
                role : role  
            }
            
            // console.log(tokenData);

            const accessToken =  jwt.sign(tokenData, 'aanv')
            
            res.json({"message": true, accessToken : accessToken})
         
        }    
    })
})


app.get('/api/getleaders', authenticateUser, (req, res)=>{
    
    db.query('select u.username, s.user_id, count(distinct s.q_id) as question_count from solved s join users u on s.user_id = u.userid group by u.userid order by question_count desc;', [], (err, response)=>{
        if(err) return res.status(400)



        const data = {}
        data.leaders = response
        data.me = req.user.userid
        // console.log(data);
        
        res.json(data)
        
    })

})

function authenticateUser(req, res, next) {

    // const authToken = req.body.authToken
    const authHeader = req.headers['authorization'] 
    const authToken = authHeader.split(' ')[1]
    // console.log("Auth token is "+authToken);
    

    if (authToken) {
        jwt.verify(authToken, jwtKey, (error, user)=>{
           if (error) return res.sendStatus(401)
            req.user = user
            next()
        })
    }
    
}

app.post('/api/getUserInfo',authenticateUser, (req, res)=>{
    // console.log(req.user);
    
    res.json({data : req.user})
})

app.post('/api/searchUser', (req, res)=>{

    const {query, userid} = req.body
    
    const q = "select username, userid, role from users where username = ?;"
    db.query(q, [query], (err, result)=>{
        if (err) {
            res.status(500)
        }
        const newArray = result.filter((person)=>{
            return person.userid!=userid
        })
        // console.log(newArray);
        res.json(newArray)
    })    
})

app.post('/api/makeAdmin',authenticateUser, (req, res)=>{
    // console.log("admin");
    // console.log(req.body.id);
    
    db.query("update users set role = ? where userid = ?", ["admin", req.body.id], (err, result)=>{
        if (err) return res.json({staus : false})
        res.json({status : true})
    })
        
})

app.get('/api/getprofileInfo', authenticateUser, (req, res)=>{
    //no of solved
    //total questions
    //username

    // res.json({message:"Hello"})
    // console.log(req.user.userid);
    
    // return

     const q = "select u.username, u.email, u.role, (select count(distinct q_id) from solved s where s.user_id = ?) as solved, (select count(q.q_id) from questions q) as total from users u where userid = ?;"

    db.query(q, [req.user.userid, req.user.userid], (err, result)=>{
        if (err) return res.status(500)
            // console.log(result);
            
        res.json(result)
    })
    
})

//select distinct s.q_id, u.username,u.userid, q.qtype from users u left join solved s on u.userid = s.user_id left join questions q on s.q_id = q.q_id;

// select qtype, count(qtype) from (select distinct s.q_id, u.username, u.userid, q.qtype from users u left join solved s on u.userid = s.user_id left join questions q on s.q_id = q.q_id) as subquery where userid = 9 group by qtype;

// select qtype, count(qtype) from (select distinct s.q_id, u.username, u.userid, q.qtype from users u left join solved s on u.userid = s.user_id left join questions q on s.q_id = q.q_id) as subquery where userid = 10 group by qtype;

// select subquery.qtype, count(subquery.qtype) as usercount, total.qcount from (select distinct s.q_id, u.username, u.userid, q.qtype from users u left join solved s on u.userid = s.user_id left join questions q on s.q_id = q.q_id where userid = 9) as subquery join (select q.qtype, count(q.qtype) as qcount from questions q group by q.qtype) as total on subquery.qtype = total.qtype group by subquery.qtype, total.qcount;

// SELECT COALESCE(subquery.qtype, total.qtype) AS qtype, 
//        COUNT(subquery.qtype) AS usercount, 
//        total.qcount
// FROM (
//     SELECT DISTINCT s.q_id, u.userid, q.qtype
//     FROM users u
//     LEFT JOIN solved s ON u.userid = s.user_id
//     LEFT JOIN questions q ON s.q_id = q.q_id
//     WHERE u.userid = 2
// ) AS subquery
// RIGHT JOIN (
//     SELECT q.qtype, COUNT(q.qtype) AS qcount
//     FROM questions q
//     GROUP BY q.qtype
// ) AS total
// ON subquery.qtype = total.qtype
// GROUP BY COALESCE(subquery.qtype, total.qtype), total.qcount;

app.get('/api/getchartinfo', authenticateUser, (req, res)=>{
    const q =  `SELECT COALESCE(subquery.qtype, total.qtype) AS qtype, 
       COUNT(subquery.qtype) AS usercount, 
       total.qcount
FROM (
    SELECT DISTINCT s.q_id, u.userid, q.qtype
    FROM users u
    LEFT JOIN solved s ON u.userid = s.user_id
    LEFT JOIN questions q ON s.q_id = q.q_id
    WHERE u.userid = ?
) AS subquery
RIGHT JOIN (
    SELECT q.qtype, COUNT(q.qtype) AS qcount
    FROM questions q
    GROUP BY q.qtype
) AS total
ON subquery.qtype = total.qtype
GROUP BY COALESCE(subquery.qtype, total.qtype), total.qcount;`

    db.query(q, [req.user.userid], (err, result)=>{
        if(err) return res.status(500)
        
        res.json(result)
    })
})

// app.listen(port, ()=>{
//     console.log("App is listening at port "+port);
// })

httpServer.listen(port, (req, res)=>{
    console.log("http server up at ",port);
})