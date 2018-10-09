//由于MySQL模块都是异步操作，每次操作的结果都是在回调函数中执行，我们通过async/await，就可以用同步的方法去操作数据库
//Promise封装
const mysql = require('mysql');
const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456wjx',
    database:'blog'
})

let query = function(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,res)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                    connection.release();
                })
            }
        })
    })
}
//抛出一个Promise对象
module.exports = {
    query
}