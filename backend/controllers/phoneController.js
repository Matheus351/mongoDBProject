const Phone = require('../models/Smarthphone');

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

    const result = await Phone.updateOne(
        {_id:req.params.id},
        {$set:{nome:req.body.nome, 
            preco:req.body.preco,
            ram:req.body.ram,
            processador:req.body.processador}}
        );

    if(result.modifiedCount>0){
        resp.status(200).send('Atualizado');
    }else{
        resp.status(400).send('Não foi possível atualizar');
    }

}

const deletePhone = async (req, resp)=>{

    const result = await Phone.deleteOne({_id: req.params.id});

    if(result.deletedCount > 0){
        resp.status(200).send('Removido com sucesso!');
    }else{
        resp.status(400).send('Aparelho não encontrado');
    }
};


module.exports = {addPhone, getPhones, updatePhone, deletePhone};