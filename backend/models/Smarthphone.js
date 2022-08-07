const mongoose = require('mongoose');


const phoneSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    ram:String,
    processador:String
});

const Phone = mongoose.model('smartphone', phoneSchema);

module.exports = Phone;