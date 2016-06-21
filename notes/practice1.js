"use strict";
//问题: 如何将一个表里的重复数据删除;

var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 10,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'test'
});

var id = 1, num = 0,max=0;
pool.query('select * from num order by id',function(error,rows,fields){
    max = rows[rows.length-1].id;
    id = rows[0].id;
    query();
});
function query (){
    if(id <= max){
        pool.query('select * from num where id='+id,function(err,rows,fields){
            console.log(rows);
            if(rows.length > 0 ){
                num = rows[0].number;
                pool.query('select * from num where number='+num,function(error,result,fields){
                    if(result.length > 1 ){
                        pool.query('delete from num where number='+num,function(error,result1,fields){
                            id++;
                            query();
                        })
                    } else {
                        id++;
                        query();
                    }
                })
            } else {
                id++;
                query();
            }

        })
    }
}


