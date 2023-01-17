const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors =require("cors");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-vQXlzzUHwsCeBaDfYSA6tJjc",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req,res) =>{
  const {message, currentModels}=req.body; 
 
      const response = await openai.createCompletion({
        model:`${currentModels}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      }); 
      res.json({
        message : response.data.choices[0].text
      })
})

app.get("/models" , async (req,res) =>{
  const response = await openai.listEngines();
   console.log(response.data.data);
  res.json({
      models: response.data.data
  })
})

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));