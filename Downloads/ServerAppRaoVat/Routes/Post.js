const Post = require("../Models/Post");

module.exports = function(app){

    app.post("/post/add", function(req, res){
        var newPost = Post({
            TieuDe: req.body.TieuDe,
            Gia:req.body.Gia,
            DienThoai:req.body.DienThoai,
            Image: req.body.Image,
            Nhom: req.body.Nhom,
            NoiBan:req.body.NoiBan,
            Active:true,
            NgayDang: Date.now()
        });
        newPost.save(function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1});
            }
        });
    });

}