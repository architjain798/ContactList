const { response } = require('express');
const express = require('express');
const { request } = require('http');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.use(express.urlencoded());

app.use(express.static('assets'))

/*
app.use((req, resp, next) => {

    if (req.query.admin == "true") {
        next();
        return;
    }
    resp.send('NO ACCESS');
})*/

const contactList = [
    {
        name: "Archit",
        mobile: 9811123312
    },
    {
        name: "Ritika",
        mobile: 9877712212
    },
    {
        name: "Kriti",
        mobile: 8711123312
    }
]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (request, response) => {
    console.log(__dirname);
    return response.render('home', { title: 'My Contacts' });
})

app.get('/practice', (request, response) => {
    // THIS WAS STATIC DATA 
    /*
    return response.render('practice', {
        title: 'I am Playing',
        limit: 5,
        contact: contactList
    })*/
    // DATABASE SE DATA AA RHA HAI ABB
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('error in fetching contact from db');
            return;
        }
        return response.render('practice', {
            title: 'I am Playing',
            limit: 5,
            contact: contacts
        })
    })
})

app.post("/create-contact", (req, resp) => {
    //contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        mobile: req.body.mobile
    }, function (err, newContact) {
        if (err) {
            console.log('error in creatiing a contact');
            return;
        }
        console.log('**********', newContact);
        return resp.redirect('back');
    })

    //return resp.redirect('back');
})

app.get('/delete-contact', (req, resp) => {

    /*
    FOR STATIC DATA
    console.log(req.query.name);
    let mobileNumber = req.query.mobile;
    let index = positionFound(mobileNumber);
    return resp.redirect('back');  */


    let id = req.query.id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Error in deleting an object from database');
            return;
        }
        return resp.redirect('back');
    })

})

positionFound = (mobileNumber) => {
    let i = 0;
    for (let x of contactList) {
        if (x.mobile == mobileNumber) {
            contactList.splice(i, 1);
            return i;
        }
        i++;
    }
    return -1;
}


app.listen(port, (err) => {
    if (err) {
        console.log('error in running');
    }
    console.log('server is running', port);
})