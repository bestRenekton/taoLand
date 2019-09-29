#制定node镜像的版本
FROM node
#声明作者
LABEL version="1.0" description="这是一个node服务" by="yyt"
# RUN npm install -g nodemon

#移动当前目录下面的文件到node目录下
COPY . /node/
#进入到node目录下面，类似cd
WORKDIR /node
#安装依赖
RUN yarn
#对外暴露的端口
EXPOSE 8088
#程序启动脚本
# CMD ["yarn", "dev"]
CMD [ "node", "./api/index.js" ]
