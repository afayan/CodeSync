import express, { response } from 'express'
import bodyparser from 'json-body-parser'
import dotenv from 'dotenv'
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

dotenv.config()


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


app.listen(port, ()=>{
    console.log("App is listening at port "+port);
})