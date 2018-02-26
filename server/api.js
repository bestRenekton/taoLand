"use strict";
const db = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
// router.post('/api/admin/signup',(req,res) => {
//     // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
//     let newAccount = new db.Login({
//         account : req.body.account,
//         password : req.body.password
//     });
//     // 保存数据newAccount数据进mongoDB
//     newAccount.save((err,data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send('createAccount successed');
//         }
//     });
// });
// 获取已有账号接口
router.post('/api/admin/getAccount',(req,res) => {
    // 通过模型去查找数据库
    db.User.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
// 注册
router.post('/api/admin/signUp',(req, res)=>{
    //是否重名
    db.User.find({ name: req.body.name },(err, docs)=>{
        if (err) {
            res.send(err);
            return
        }
        if(docs.length>0){
            res.send({'status':0,'msg':'用户名已注册'});
        }else{
            let newUser = new db.User({
                name : req.body.name,
                password : req.body.password
            });
            newUser.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({'status':1,'msg':'注册成功'});
                }
            })
        }
    })
})
//登录
router.post('/api/admin/signIn',(req, res)=>{
    db.User.find({ name: req.body.name,password: req.body.password},(err, docs)=>{
        if (err) {
            res.send(err);
            return
        }
        if(docs.length>0){
            req.session.sign = true;
            res.send({'status':1,'msg':'登陆成功'});
        }else{
            res.send({'status':0,'msg':'登录失败'});
        }
    })
})
//检测session
router.post('/api/admin/checkUser',(req, res)=>{
    if (req.session.sign) {//检查用户是否已经登录
        res.send({'status':1});
    } else {//否则展示index页面
        // req.session.sign = true;
        res.send({'status':0});
    }
})




//获取所有文章列表
router.post('/api/articleList',(req,res)=>{
    db.Article.find({},(err,data)=>{
        if(err){
            res.send(err);
            return
        }
        if(req.body.type=='archives'){//archives结构
            let arr=[];
            let data_archives=[];

            for(let i=0;i<data.length;i++){
                let date=data[i]["date"].slice(0,4);

                if(arr.indexOf(date)==-1){
                    let obj={
                        "type":date,
                        "list":[{"_id":data[i]['_id'],
                            "date":data[i]['date'],
                            "title":data[i]['title'],
                            "category":data[i]['category']
                        }]
                    }
                    data_archives.push(obj);
                    arr.push(date);
                }else{
                    let obj={
                        "_id":data[i]['_id'],
                        "date":data[i]['date'],
                        "title":data[i]['title'],
                        "category":data[i]['category']
                    }
                    for(let i=0;i<data_archives.length;i++){
                        if(data_archives[i]['type']==date){
                            data_archives[i]['list'].push(obj)
                        }
                    }
                }
            }
            res.send(data_archives)
        }else if(req.body.type=='categories'){//categories结构
            let arr=[];
            let data_categories=[];

            for(let i=0;i<data.length;i++){
                let cates=data[i]["category"];
                
                for(let i2=0;i2<cates.length;i2++){
                    if(arr.indexOf(cates[i2])==-1){
                        let obj={
                            "type":cates[i2],
                            "list":[{"_id":data[i]['_id'],
                                "date":data[i]['date'],
                                "title":data[i]['title'],
                                "category":data[i]['category']
                            }]
                        }
                        data_categories.push(obj);
                        arr.push(cates[i2]);
                    }else{
                        let obj={
                            "_id":data[i]['_id'],
                            "date":data[i]['date'],
                            "title":data[i]['title'],
                            "category":data[i]['category']
                        }
                        for(let i3=0;i3<data_categories.length;i3++){
                            if(data_categories[i3]['type']==cates[i2]){
                                data_categories[i3]['list'].push(obj)
                            }
                        }
                    }
                }
            }
            res.send(data_categories)
        }else{//article结构
            res.send(data)
        }
    })
})
// 文章详情页
router.get('/api/articleDetail/:id', function (req, res) {
    db.Article.findOne({ _id: req.params.id }, function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      res.send(docs)
    })
})
//文章保存
router.post('/api/admin/saveArticle',(req,res)=>{
    let newArticle = new db.Article(req.body.articleInformation);
    newArticle.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({'status':1,'msg':'保存成功'});
        }
    })
})
// 文章更新
router.post('/api/admin/updateArticle',(req, res)=>{
    let info = req.body.articleInformation
    db.Article.find({_id: info._id},(err, docs)=>{
      if (err) {
        return
      }
      docs[0].title = info.title
      docs[0].date = info.date
      docs[0].category = info.category
      docs[0].gist = info.gist
      docs[0].content = info.content
      docs[0].html = info.html
      db.Article(docs[0]).save(function (err) {
        if (err) {
          res.status(500).send()
          return
        }
        res.send({'status':1,'msg':'更新成功'})
      })
    })
})
// 文章删除
router.post('/api/admin/deleteArticle', (req, res)=>{
    db.Article.remove({_id: req.body._id},(err)=>{
        if (err) {
        res.status(500).send()
        return
        }
        res.send({'status':1,'msg':'删除成功'})
    })
})





//获取所有demo列表
router.post('/api/demoList',(req,res)=>{
    db.Demo.find({},(err,data)=>{
        if(err){
            res.send(err);
            return
        }
        res.send(data)
    })
})
// demo详情页
router.get('/api/demoDetail/:id', function (req, res) {
    db.Demo.findOne({ _id: req.params.id }, function (err, docs) {
      if (err) {
        console.error(err)
        return
      }
      res.send(docs)
    })
})
//demo保存
router.post('/api/admin/saveDemo',(req,res)=>{
    let newDemo = new db.Demo(req.body.demoInformation);
    newDemo.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({'status':1,'msg':'保存成功'});
        }
    })
})
// demo更新
router.post('/api/admin/updateDemo',(req, res)=>{
    let info = req.body.demoInformation;
    db.Demo.find({_id: info._id},(err, docs)=>{
      if (err) {
        return
      }
      docs[0].title = info.title
      docs[0].date = info.date
      docs[0].file = info.file
      docs[0].pic = info.pic
      docs[0].gist = info.gist
      db.Demo(docs[0]).save(function (err) {
        if (err) {
          res.status(500).send()
          return
        }
        res.send({'status':1,'msg':'更新成功'})
      })
    })
})
// demo删除
router.post('/api/admin/deleteDemo', (req, res)=>{
    db.Demo.remove({_id: req.body._id},(err)=>{
        if (err) {
        res.status(500).send()
        return
        }
        res.send({'status':1,'msg':'删除成功'})
    })
})

module.exports = router;