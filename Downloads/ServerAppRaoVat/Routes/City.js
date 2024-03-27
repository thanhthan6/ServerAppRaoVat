const City = require("../Models/City");

module.exports = function(app){

    app.get("/city", function(req, res){
        res.render("admin_master", {content:"./city/city.ejs"});
    });

    app.post("/city/add", function(req, res){
        var newCity = City({
            Name: req.body.Name
        });
        newCity.save(function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1});
            }
        });
    });

    app.post("/city", function(req, res){
        City.find(function(err, data){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1, list:data});
            }
        });
    });

    app.post("/city/update", function(req, res){
        City.findByIdAndUpdate(req.body.CityID, {Name: req.body.Name}, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1});
            }
        });
    });

    app.post("/city/delete", function(req, res){
        City.findByIdAndDelete(req.body.CitiID, function(err){
            if(err){
                res.json({kq:0, errMsg:err});
            }else{
                res.json({kq:1});
            }
        })
    });

}