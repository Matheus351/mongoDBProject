require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

app.get("/addphone", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/form.html"));;
});

//Operações CRUD
const phoneController = require('./controllers/phoneController');

app.post('/save/phones', phoneController.addPhone);

app.get('/phones', phoneController.getPhones);

app.get('/phones/:id', phoneController.getPhone);

app.post('/phones/:id', phoneController.updatePhone);

app.delete('/phones/:id', phoneController.deletePhone);

module.exports = mongoose;