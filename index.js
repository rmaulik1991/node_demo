const express = require("express");
const fs = require("fs");
const url  = require("url");
const path  = require("path");
const xmlparser = require('express-xml-bodyparser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xmlparser());

app.post("/", (req,res) => {
    const myURL =  new URL("http://"+req.hostname+req.url);
    res.set('Content-Type', 'text/xml');

        res.sendFile(path.join(__dirname,"public","noCompanyList.xml"));

});

app.post("/:action", (req,res) => {
    const myURL =  new URL("http://"+req.hostname+req.url);
    res.set('Content-Type', 'text/xml');
    if(req.params.action == "companyList") {

        if(myURL.searchParams.get('type') == '1') {
            res.sendFile(path.join(__dirname,"public","singleCompanyList.xml"));
        } else if(myURL.searchParams.get('type') == 2) {
            res.sendFile(path.join(__dirname,"public","multipleCompanyList.xml"));
        } else {
            res.sendFile(path.join(__dirname,"public","noCompanyList.xml"));
        }
    } else {
        res.sendFile(path.join(__dirname,"public","noCompanyList.xml"));
    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));