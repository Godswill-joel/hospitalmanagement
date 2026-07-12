import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
// ensure uploads folder exists

// multer setup
const storage = multer.diskStorage({
    destination: function( req, file, cb){
        cb(null, uploadDir)
    },

    filename: function(req, file, cb){
        const uniqueName = Date.now() + "-"
    }
})