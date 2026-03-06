const express = require("express");
const axios = require("axios");
const Sentiment = require("sentiment");   
const sentiment = new Sentiment();        
require("dotenv").config();
const router = express.Router();

function detectMood(text){
    const score = sentiment.analyze(text).score

    if(score>2){
        return "happy";
    }
    if(score<-2){
        return "sad";
    }
    return "relaxed";
}

router.post("/", async(req, res)=>{
    const mood = detectMood(req.body.text);
    const YOUTUBE_API = process.env.API_KEY;
    
    const query={
        happy:"Shararat",
        sad:"Arijit Singh songs ",
        relaxed:"MS Dhoni songs"
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query[mood]}&key=${YOUTUBE_API}&type=video&maxResults=5`;
    const response = await axios.get(url);
    res.json(response.data.items);
});

module.exports=router;