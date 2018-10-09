//对于post koa2没有封装获取参数的方法，需要通过解析上下文ctx中的请求对象，将post表单数据解析成query String
//再将 query string转换为json格式



const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = await parsePostData( ctx )
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})
//解析上下文里node原生请求函数
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postData = "";
            ctx.req.addListener('data',(data)=>{
                postData +=data;
            })
            ctx.req.addListener('end',()=>{
                let parseData = parseQueryStr(postData);
                resolve(parseData);
            })
        }catch(err){
            reject(err);
        }
    })
}
//将post 请求参数字符串解析成JSON
//Array.entries该方法返回一个新的iterator对象，该对象包含数组中每个索引对应的键值对
function parseQueryStr(queryStr){
    let queryData = {};
    let queryStrList = queryStr.split('&');
    for (  let [index,queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
      }
      return queryData;
}
app.listen(3000, () => {
    console.log('[demo] request post is starting at port 3000');
})