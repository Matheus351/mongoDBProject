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

    const phones = await Phone.find({},{_id: false, __v:false});
    resp.status(200).send(phones);

}

module.exports = {addPhone, getPhones};