const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
});

//const Contact : Model <any ,{}>

const Contact = mongoose.model('contact', ContactSchema);
module.exports = Contact;