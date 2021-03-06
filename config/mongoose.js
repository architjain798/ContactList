const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contacts_list_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connectiong to db'));

db.once('open', function () {
    console.log("Successfully connected to the database");
})