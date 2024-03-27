const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    TieuDe: String,
    Gia:String,
    DienThoai:String,
    Image: String,
    Nhom: mongoose.SchemaTypes.ObjectId,
    NoiBan:mongoose.SchemaTypes.ObjectId,
    Active:Boolean,
    NgayDang: Date
});

module.exports = mongoose.model("Post", postSchema);