//koa加载模板引擎
//koa记载模板引擎需要使用到中间件  koa-views
//常见的模板引擎有  ejs jade等
const Koa = require('koa');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
//加载模板引擎
app.use(views(path.join(__dirname,'./views'),{
    extension:'ejs'
}))
app.use(async (ctx)=>{
    let title = 'hello koa2';
    await ctx.render('index',{
        title,
    })
})
app.listen(3000,()=>{
    console.log('the server run port 3000');
})