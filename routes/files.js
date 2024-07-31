const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file')
const {v4 : uuid4} = require('uuid')
require('dotenv').config();

let storage= multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename: (req,file,cb)=>{
        const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniquename);
    }
})

let upload = multer({
    storage,
    limit: {fileSize: 1000000 * 100},

}).single('myfile');

router.post('/',(req,res)=>{
    upload(req,res,async(err)=>{
        //validates request
        if(err){
            return res.status(500).send({error: err.message});
        }
        if(!req.file)return res.json({error: 'all fields are required!'});


        //store into database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size 
        });

        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        //this response will generate a link like this: http://localhost:3000/files/{210210001-1293219} this is uuid
    })
})

module.exports= router;