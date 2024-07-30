const router = require('express').Router();
const File =require('../models/file');
require('dotenv').config();

//this method will send back images with that particular uuid
router.get('/:uuid',async (req,res)=>{
    try{
        const file = await File.findOne({uuid: req.params.uuid});
        if(!file){
            return res.render('download',{error: 'Link expired: upload file again.'});
        }
        return res.render('download',{
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`

        })
    }catch(err){
        return res.render('download',{error: 'something went wrong'});
    }
    
})








module.exports = router;