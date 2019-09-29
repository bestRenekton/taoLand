
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