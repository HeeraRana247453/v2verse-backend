const multer = require("multer");


const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}-${Date.now()}`);
    }
});

exports.upload = multer({storage:storage});