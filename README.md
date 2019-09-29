# taoLand
>博客：vue全家桶+node+mongodb

## 介绍
+ 实现了用户注册、登录、检测登录、博客管理（文章的修改和删除）、文章编辑（Markdown）、标签分类等功能。
+ 前端使用vue全家桶（cli,router,vuex,axios），框架用的elmentUI
+ 后端使用node,框架用的express,mongoose
+ 数据库采用mongodb
+ 响应式，移动端勉强能看...
## 线上预览
[https://www.yangyuetao.cn/](https://www.yangyuetao.cn/)

## 食用
+ 下载到本地
	+ `git clone https://github.com/bestRenekton/taoLand.git` 
+ 安装
	+ `npm i`
	+ 或者使用淘宝的`cnpm i`
+ 安装mongodb
	+ mongodb安装可以用官网的4.0版本，不过安的时候会卡很久
	+ 也可以安3.4，参考[https://www.cnblogs.com/xuanmanstein/p/7991589.html](https://www.cnblogs.com/xuanmanstein/p/7991589.html)
+ 启动mongodb
+ 进入server启动node
	+ 开第一个命令行
	+ cd进入项目根目录的server文件夹
	+ `node index`
		+ 看到`Mongo connection successed`即node启动成功
+ 启动项目
	+ 再开第二个命令行，cd进入项目根目录
	+ `npm run dev`
+ 打开`http://127.0.0.1:8080`

## docker 部署
+ 设置`docker-compose.yml`MONGO_INITDB_ROOT_USERNAME 为自己的数据库账号密码
+ 修改`static/js/public.js`webUrl为自己的Ip
+ 修改`server/api/db.js`mongoose.connect为自己的ip和数据库账号密码
+ `npm run build`打包
+ dist,mongodb,nginx,server,docker-compose.yml，这5个部分放到自己的服务器上面，比如：taoland_docker
+ 服务器安装docker和docker-compose
+ cd 进taoland_docker后`docker-compose up -d`
+ 访问 `自己IP:81`
+ 其他：所以配置都在`docker-compose.yml`里面，可以自己设置