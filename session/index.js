//koa允许在ctx中直接设置cookie但是并没有提供session操作，session只能通过第三方中间件实现，在koa2中实现session的方案有以下几种情况
//1.session数据量很小，可以直接存储到内存当中
//2.session数据量很大，则需要存储介质存放session数据

//数据库进行存储

//将session存储到数据库中需要用到中间件   koa-session-minimal  提供就介质的读写接口
//  koa-mysql-session  为koa-session-minimal中间件提供mysql数据库的session数据读写操作
//将数据库存储的sessionId存储到页面的cookie中
//根据cookie的sessionId去获取对于session的信息
const Koa = require('koa');
const app = new Koa();
const session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');

//配置session信息的mysql
let store = new MysqlSession({
    user:'root',
    password:'520956wjx',
    database:'blog',
    host:'127.0.0.1'
})

//存放sessionId的cookie配置
let cookie = {
    maxAge:20*60*1000,
    expires:'',
    path:'',
    domain:'',//写cookie所在域名
    httpOnly:'',//是否只用于http中获取
    overWrite:''
}
app.use(session({
    key:'SESSION-ID',
    store:store,
    cookie:cookie
}))

app.use(async(ctx)=>{
    if(ctx.url === '/set'){
        ctx.session={
            user_id:Math.random().toString(36).substr(2),
            count:0
        }
        ctx.body = ctx.session;
    }else if(ctx.url === '/'){
        ctx.session.count = ctx.session.count+1;
        ctx.body = ctx.session;
    }
})
app.listen(3000,()=>{
    console.log("the server run port 3000");
})