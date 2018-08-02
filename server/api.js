"use strict";
const db = require('./db');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
// 注册
router.post('/api/admin/signUp', (req, res) => {
    //是否重名
    db.User.find({ name: req.body.name }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({ 'status': 0, 'msg': '用户名已注册' });
        } else {
            db.User.find({ nickName: req.body.nickName }, (err, docs) => {
                if (err) {
                    res.send(err);
                    return
                }
                if (docs.length > 0) {
                    res.send({ 'status': 0, 'msg': '昵称已注册' });
                } else {
                    // const fs = require('fs');
                    // let pathImg='./upload/avatar/'+Date.now() + '.png'
                    // let base64 = req.body.avatar.replace(/^data:image\/\w+;base64,/, "");
                    // let dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
                    // // console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
                    // fs.writeFile(pathImg, dataBuffer, function (err) {//用fs写入文件
                    //     if (err) {
                    //         console.log(err);
                    //     } else {
                    //         console.log('写入成功！');
                    //     }
                    // })
                    let newUser = new db.User({
                        name: req.body.name,
                        password: req.body.password,
                        nickName: req.body.nickName,
                        avatar: null,
                        // type: req.body.type
                        type: 2//1为管理员，2为游客,写死，新建管理员数据库直接改
                    });
                    newUser.save(function (err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({ 'status': 1, 'msg': '注册成功' });
                        }
                    })
                }
            })
        }
    })
})

//登录
router.post('/api/admin/signIn', (req, res) => {
    db.User.find({ name: req.body.name, password: req.body.password }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            let content = { name: req.body.name }; // 要生成token的主题信息
            let secretOrPrivateKey = "123456" // 这是加密的key（密钥）
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60 * 24  // 24小时过期
            });

            docs[0].token = token
            db.User(docs[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
                res.send({ 'status': 1, 'msg': '登陆成功', 'token': docs[0].token,'user_name': docs[0]["name"], 'type': docs[0]["type"], 'nickName': docs[0]["nickName"], 'avatar': docs[0]["avatar"]  })
            })
        } else {
            res.send({ 'status': 0, 'msg': '登录失败' });
        }
    })
})
// 退出
router.post('/api/admin/signOut', (req, res) => {
    db.User.find({ name: req.body.name, token: req.body.token }, (err, docs) => {
        if (err) {
            return
        }
        if (docs.length > 0) {
            docs[0].token = '';
            db.User(docs[0]).save(function (err) {
                if (err) {
                    res.status(500).send()
                    return
                }
                res.send({ 'status': 1, 'msg': '退出成功' })
            })
        } else {
            res.send({ 'status': 0, 'msg': '退出失败' })
        }
    })
})
// 用户信息更新
router.post('/api/admin/updateUser', (req, res) => {
    db.User.find({ name: req.body.name, token: req.body.token }, (err, docs) => {
        if (err) {
            return
        }
        if (docs.length > 0) {
            const fs = require('fs');
            let pathImg='./upload/avatar/'+Date.now() + '.png'
            let base64 = req.body.avatar.replace(/^data:image\/\w+;base64,/, "");
            let dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
            // console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
            fs.writeFile(pathImg, dataBuffer, function (err) {//用fs写入文件
                if (err) {
                    console.log(err);
                } else {
                    console.log('写入成功！');
                    docs[0].nickName = req.body.nickName;
                    docs[0].avatar = './static' + pathImg.slice(1);
                    db.User(docs[0]).save(function (err) {
                        if (err) {
                            res.status(500).send()
                            return
                        }
                        res.send({ 'status': 1, 'msg': '更新成功','user_name': docs[0]["name"], 'type': docs[0]["type"], 'nickName': docs[0]["nickName"], 'avatar': docs[0]["avatar"] })
                    })
                }
            })
        } else {
            res.send({ 'status': 0, 'msg': '更新失败' })
        }
    })
})
//检测token
router.post('/api/admin/checkUser', (req, res) => {
    db.User.find({ name: req.body.user_name, token: req.body.token }, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            let token = req.body.token; // 从body或query或者header中获取token
            let secretOrPrivateKey = "123456" // 这是加密的key（密钥）

            jwt.verify(token, secretOrPrivateKey, function (err, decode) {
                if (err) {  //  时间失效的时候/ 伪造的token          
                    res.send({ 'status': 0 });
                } else {
                    res.send({ 'status': 1, 'type': docs[0]["type"], 'user_name': docs[0]["name"], 'avatar': docs[0]["avatar"], 'nickName': docs[0]["nickName"] });
                }
            })
        } else {
            res.send({ 'status': 0 });
        }
    })
})

//获取所有文章列表
router.post('/api/articleList', (req, res) => {
    db.Article.find({}, (err, data) => {
        if (err) {
            res.send(err);
            return
        }
        if (req.body.type == 'archives') {//archives结构
            let arr = [];
            let data_archives = [];

            for (let i = 0; i < data.length; i++) {
                let date = data[i]["date"].slice(0, 4);

                if (arr.indexOf(date) == -1) {
                    let obj = {
                        "type": date,
                        "list": [{
                            "_id": data[i]['_id'],
                            "date": data[i]['date'],
                            "title": data[i]['title'],
                            "category": data[i]['category']
                        }]
                    }
                    data_archives.push(obj);
                    arr.push(date);
                } else {
                    let obj = {
                        "_id": data[i]['_id'],
                        "date": data[i]['date'],
                        "title": data[i]['title'],
                        "category": data[i]['category']
                    }
                    for (let i = 0; i < data_archives.length; i++) {
                        if (data_archives[i]['type'] == date) {
                            data_archives[i]['list'].push(obj)
                        }
                    }
                }
            }
            res.send(data_archives)
        } else if (req.body.type == 'categories') {//categories结构
            let arr = [];
            let data_categories = [];

            for (let i = 0; i < data.length; i++) {
                let cates = data[i]["category"];

                for (let i2 = 0; i2 < cates.length; i2++) {
                    if (arr.indexOf(cates[i2]) == -1) {
                        let obj = {
                            "type": cates[i2],
                            "list": [{
                                "_id": data[i]['_id'],
                                "date": data[i]['date'],
                                "title": data[i]['title'],
                                "category": data[i]['category']
                            }]
                        }
                        data_categories.push(obj);
                        arr.push(cates[i2]);
                    } else {
                        let obj = {
                            "_id": data[i]['_id'],
                            "date": data[i]['date'],
                            "title": data[i]['title'],
                            "category": data[i]['category']
                        }
                        for (let i3 = 0; i3 < data_categories.length; i3++) {
                            if (data_categories[i3]['type'] == cates[i2]) {
                                data_categories[i3]['list'].push(obj)
                            }
                        }
                    }
                }
            }
            res.send(data_categories)
        } else {//article结构
            for (let i = 0; i < data.length; i++) {
                data[i]["comments"] = data[i]["comments"].length;
                data[i]["content"] = null;
            }
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
        let prev = {};
        let next = {};

        db.Article.find({ '_id': { "$gt": req.params.id } }) //上一条
            .then(res2 => {
                if (res2.length > 0) {
                    prev.title = res2[0]["title"];
                    prev._id = res2[0]["_id"];
                }
                db.Article.find({ '_id': { "$lt": req.params.id } }) //下一条
                    .then(res3 => {
                        if (res3.length > 0) {
                            next.title = res3[res3.length - 1]["title"];
                            next._id = res3[res3.length - 1]["_id"];
                        }
                        let obj = JSON.parse(JSON.stringify(docs));
                        obj.prev = prev;
                        obj.next = next;
                        res.send(obj)
                    })
            })
            .catch(rej => {
                console.log(rej);
            });
    })
})
//文章保存
router.post('/api/admin/saveArticle', (req, res) => {
    let newArticle = new db.Article(req.body.articleInformation);
    newArticle.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'status': 1, 'msg': '保存成功' });
        }
    })
})
// 文章更新
router.post('/api/admin/updateArticle', (req, res) => {
    let info = req.body.articleInformation
    db.Article.find({ _id: info._id }, (err, docs) => {
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
            res.send({ 'status': 1, 'msg': '更新成功' })
        })
    })
})
// 文章删除
router.post('/api/admin/deleteArticle', (req, res) => {
    db.Article.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'status': 1, 'msg': '删除成功' })
    })
})
//评论--新建
router.post('/api/comment/new', (req, res) => {
    db.Article.find({ _id: req.body._id }, (err, docs) => {
        if (err) {
            return
        }
        let { id, from_uid, from_uname, avatar, content, date } = req.body;
        let obj = { id, from_uid, from_uname, avatar, content, date, child: [] };

        docs[0].comments.push(obj);
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'status': 1, 'msg': '发表成功' })
        })
    })
})
//评论--回复
router.post('/api/comment/reply', (req, res) => {
    db.Article.find({ _id: req.body._id }, (err, docs) => {
        if (err) {
            return
        }
        let { id, from_uid, from_uname, avatar, to_uid, to_uname, content, date } = req.body;
        let obj = { from_uid, from_uname, avatar, to_uid, to_uname, content, date };
        let comments = docs[0].comments;

        for (let i = 0; i < comments.length; i++) {
            if (comments[i]["id"] == id) {
                comments[i]["child"].push(obj)
            }
        }
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send({ 'status': 1, 'msg': '回复成功' })
        })
    })
})



//获取所有demo列表
router.post('/api/demoList', (req, res) => {
    db.Demo.find({}, (err, data) => {
        if (err) {
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
router.post('/api/admin/saveDemo', (req, res) => {
    let newDemo = new db.Demo(req.body.demoInformation);
    newDemo.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ 'status': 1, 'msg': '保存成功' });
        }
    })
})
// demo更新
router.post('/api/admin/updateDemo', (req, res) => {
    let info = req.body.demoInformation;
    db.Demo.find({ _id: info._id }, (err, docs) => {
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
            res.send({ 'status': 1, 'msg': '更新成功' })
        })
    })
})
// demo删除
router.post('/api/admin/deleteDemo', (req, res) => {
    db.Demo.remove({ _id: req.body._id }, (err) => {
        if (err) {
            res.status(500).send()
            return
        }
        res.send({ 'status': 1, 'msg': '删除成功' })
    })
})

module.exports = router;