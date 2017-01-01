# aria2web

> An Aria2 Web Frontend project with Vue.js 

![aria2web截图](http://oaigdk90m.bkt.clouddn.com/aria2web-01.01.jpg?imageMogr2/auto-orient/format/webp)

## Usage
[Demo](http://whitecode.coding.me/aria2web/)   [Code](https://github.com/whitecodes/aria2web)
这个项目只是个`Aria2c`的页面管理工具，具体的下载功能需要`Aria2c`来完成。

1. 去[官网](https://aria2.github.io/)下载`Aria2c`。
2. 配置`aria2.conf`，开机自启
`aria2.conf`内容如下，其他设置参看[Manual](https://aria2.github.io/manual/en/html/index.html)
``` xml
# 下载文件存放的地址
dir=E:\Download\Aria2

# 下载 log 和记录都放在 Aria2c 同一个文件夹下
log=D:\aria2\Aria2.log
input-file=D:\aria2\aria2.session
save-session=D:\aria2\aria2.session
save-session-interval=60
force-save=false
log-level=error

# RPC Options 
# 开启 RPC
enable-rpc=true
pause=false
rpc-allow-origin-all=true
rpc-listen-all=true
rpc-save-upload-metadata=true
# rpc密码还没有完成，所以先注释掉
# rpc-secret=aria
```
`windows`环境下的开机自启。新建`HideRun.vbs`,并加入自启列表。
``` vbs
CreateObject("WScript.Shell").Run "D:\aria2\aria2c.exe --conf-path=aria2.conf",0
```
3.打开网页: [aria2web](http://whitecode.coding.me/aria2web/)就可以了。


## Build Setup
``` bash
# install dependencies
# 建议先设定使用国内的镜像
npm install

# serve with hot reload at localhost:8080
# 可以通过修改 package.json 来更改运行端口
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).