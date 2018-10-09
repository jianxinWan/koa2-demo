const Koa  = require('koa');
const fs = require('fs');
const app = new Koa();

const Router  = require('koa-router');
//主要区别在于一级路由和二级路由的区分，可以将一个模块的分开写
//子路由1
let home = new Router();
home.get('/',async (ctx)=>{
    ctx.body="index";
})
//子路由2  
let page = new Router();
page.get('/login',async(ctx)=>{
    ctx.body="login";
})
page.get('/regist',async(ctx)=>{
    ctx.body="regist";
})
//装载所有路由
let router = new Router();
router.use('/',home.routes(),home.allowedMethods());
router.use('',page.routes(),page.allowedMethods());
app.use(router.routes()).use(router.allowedMethods);
app.listen(3000,()=>{
    console.log("the server run 3000");
})