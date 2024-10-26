const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  

const app = express();
app.use(cors());
app.use(bodyParser.json());  

const invokeUrl = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl";
const API_KEY = process.env.API_KEY;  

app.post('/generate', async (req, res) => {
    const payload = req.body;

    try {
        const response = await fetch(invokeUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            const errorBody = await response.text();
            res.status(response.status).json({ error: errorBody });
            return;
        }

        const responseData = await response.json();
        res.json(responseData);
    } catch (error) {
        console.error("Error during Nvidia API request:", error);
        res.status(500).send({ error: "Server error. Unable to generate image." });
    }
});


const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});