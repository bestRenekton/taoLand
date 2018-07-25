// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/tao');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式Schema **************/
// const loginSchema = mongoose.Schema({
//     account : String,
//     password : String
// });

//user
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    nickName: String,
    type: String,//1管理员，2游客
    token: String,
    avatar: String
})
//文章
const articleSchema = new mongoose.Schema({
    title: String,
    date: String,
    category: Array,
    gist: String,
    content: String,
    comments: Array
})
//demo
const demoSchema = new mongoose.Schema({
    title: String,
    date: String,
    file: String,
    pic: String,
    gist: String,
})
/************** 定义模型Model **************/
// const Models = {
//     Login : mongoose.model('Login',loginSchema)
// }

const Models = {
    User: mongoose.model('User', userSchema),
    Article: mongoose.model('Article', articleSchema),
    Demo: mongoose.model('Demo', demoSchema)
}

module.exports = Models;