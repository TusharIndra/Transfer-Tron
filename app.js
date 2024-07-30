const express = require('express');
const app = express();
const path =require('path'); 
require('dotenv').config();

const connectDb = require('./config/db');
connectDb();
app.use(express.static('public'));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
//routes

const filePath = path.resolve(__dirname, 'index.html');

app.get('/',(req,res)=>{
    res.sendFile(filePath);
})
app.use('/api/files',require('./routes/files'));   //upload file
app.use('/files',require('./routes/show'))//generate download link
app.use('/files/download',require('./routes/download'));

app.listen(process.env.APP_PORT,()=>{
    console.log(`Listening on port: ${process.env.APP_PORT}`);
})