
const Phone = require('../models/Smarthphone');
const mongoose = require('mongoose')

const getPhone = async (req, resp) =>{
    let id = mongoose.Types.ObjectId(req.params.id);
    const phone = await Phone.find({_id:id},{__v:false});
    if(phone.length > 0){
        resp.status(200).send(phone);
    }else{
        resp.status(400).send('Celular não encontrado');
    }
};


const addPhone = async (req, resp) =>{

    const phone = new Phone(req.body);
    phone.save()
    .then(()=>{
        resp.redirect('/')
    })
    .catch(err=>{
        resp.status(400).send('Falha ao salvar');
    });

};

const getPhones = async (req, resp) =>{

    const phones = await Phone.find({},{__v:false});
    resp.status(200).send(phones);

}

const updatePhone = async (req, resp) =>{
    
  let id = mongoose.Types.ObjectId(req.params.id);
    Phone.findOneAndUpdate(
    {_id:id},{$set:{nome:req.body.nome,preco:req.body.preco,ram:req.body.ram,processador:req.body.processador}}
        ).exec(function(err,res){
            if(err) {
                resp.status(500).send(err);
            } else {
               resp.redirect('/')
            }
        })
}

const deletePhone = async (req, resp)=>{

    let id = mongoose.Types.ObjectId(req.params.id);
    const result = await Phone.deleteOne({_id:id});

    if(result.deletedCount > 0){
        resp.status(200).send('Removido com sucesso!');
    }else{
        resp.status(400).send('Aparelho não encontrado');
    }
};


module.exports = {addPhone, getPhones, updatePhone, deletePhone, getPhone};