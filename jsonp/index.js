//在复杂的业务场景，我们需要在前端跨域获取数据，这时候就需要提供跨域请求的接口，通常是使用jsonp的方式提供跨域接口



const Koa = require('koa');
const app = new Koa();
const jsonp = require('koa-jsonp');
//原生实现
/*
app.use(async (ctx)=>{
    //如果jsonp的请求为get
    if(ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp'){
        let callbackName = ctx.query.callback || 'callback';
        let returnData ={
            success:true,
            //这块data内容自己定义
            data:{
                text:'this is a jsonp api',
                time:new Date().getTime()
            }
        }
        //jsonp的script的字符串
        let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;
        //用text/javascript，让请求支持跨域获取
        ctx.type = 'text/javascript';
        ctx.body = jsonpStr;
    }else{
        ctx.body = 'hello jsonp'
    }
})
*/
//使用koa-jsonp

app.use(jsonp());
app.use(async(ctx)=>{
    let returnData = {
        success:true,
        data:{
            text:'this is a jsonp api',
            time:new  Date().getTime
        }
    }
    ctx.body = returnData;
})


app.listen(3000,()=>{
    console.log('the server run port 3000');
})




