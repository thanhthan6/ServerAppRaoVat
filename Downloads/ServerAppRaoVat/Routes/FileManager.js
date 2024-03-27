var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/upload");
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + "-" +  file.originalname);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        if( file.mimetype=="image/bmp" || 
            file.mimetype=="image/png" ||
            file.mimetype=="image/jpeg" ||
            file.mimetype=="image/jpg" 
        ){
            cb(null, true);
        }else{
            return cb(new Error("Your file is not image."));
        }
    }
}).single("hinhdaidien");

module.exports = function(app){

    app.post("/uploadFile", function(req, res){
        upload(req, res, function(err){
            if(err instanceof multer.MulterError){
                setTimeout(()=>{
                    res.json({kq:0, errMsg:err});
                }, 3000);
            }else if(err){
                setTimeout(()=>{
                    res.json({kq:0, errMsg:err});
                }, 3000);
            }else{
                setTimeout(()=>{
                    res.json({kq:1, urlFile: req.file});
                }, 3000);
            }
        });
    });

}