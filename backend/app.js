require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');

main()
.then(resp=>{
    console.log('Conectado ao mongoDB')
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/test`);
}

app.use(express.static(path.join(__dirname, "../frontend")));

app.listen( process.env.API_PORT,(req,res) => {
    console.log(`Servidor rodando em http://localhost:${process.env.API_PORT}`)
});


app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/index.html"));;
});
