const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '116.62.171.43',
    user: 'root',
    password: '12345688',
    database: 'bishe',
    multipleStatements: true, //  允许执行多条语句
})


connection.connect(function () {
    console.log('链接成功')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//  查询parent
app.get('/getdata_parent', (req, res) => {
    let sql_p = `select p.parent_name, p.password
    from parents_table as p
    `;

    connection.query(sql_p, (err, results) => {
        if (err) return res.json({
            code: 100,
            data: '没有内容'
        });
        res.json({
            code: 200,
            data: results
        });
    })
});

//  查询teacher
app.get('/getdata_teacher', (req, res) => {
    let sql_t = `select t.schoolid, t.idcard, t.password, t.teacher_name, t.money, t.count, t.count_time, t.course, t.study_time
    from teachers_table as t
    `;

    connection.query(sql_t, (err, results) => {
        if (err) return res.json({
            code: 100,
            data: '没有内容'
        });
        res.json({
            code: 200,
            data: results
        });
    })
});

//  查询student
app.get('/getdata_student', (req, res) => {
    let sql_t = `select s.id,s.schoolid, s.idcard, s.child_name, s.parent_name, s.phone, s.count, s.count_time, s.course, s.study_time, s.homeword, s.comment
    from students_table as s
    `;

    connection.query(sql_t, (err, results) => {
        if (err) return res.json({
            code: 100,
            data: '没有内容'
        });
        res.json({
            code: 200,
            data: results
        });
    })
});

//  查询administrator
app.get('/getdata_administrator', (req, res) => {
    let sql_a = `select *
    from administrator_table as a
    `;

    connection.query(sql_a, (err, results) => {
        if (err) return res.json({
            code: 100,
            data: '没有内容'
        });
        res.json({
            code: 200,
            data: results
        });
    })
});

//  插入parent
app.post('/insertdata_parent', (req, res) => {
    let params = [req.body.parent_name, req.body.password] //  传来的参数
    let addsql = `insert into parents_table(parent_name,password) value (?,?)` //  插入语句，?代表插入的值，要插入到test表内容

    let parent = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })

    Promise.all([parent]).then(result => {
         //last_insert_id是获取表中最后一条数据
        connection.query('select last_insert_id()', (err, results) => {
            res.json({
                code: 200,
                data: {
                    id: results[0]['last_insert_id()'],
                    parent_name: req.body.parent_name,
                    password: req.body.password
                }
            });
        })
    }).catch(err => {
        res.json({
            code: 100,
            data: `插入数据有误`
        })
    })
});

//  插入teacher
app.post('/insertdata_teacher', (req, res) => {
    let params = [req.body.idcard, req.body.schoolid, req.body.teacher_name, req.body.password, req.body.money, req.body.course, req.body.study_time] //  传来的参数
    let addsql = `insert into teachers_table(idcard, schoolid, teacher_name, password, money, course, study_time) value (?,?,?,?,?,?,?)` //  插入语句，?代表插入的值，要插入到test表内容

    let teacher = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })


    Promise.all([teacher]).then(result => {
         //last_insert_id是获取表中最后一条数据
        connection.query('select last_insert_id()', (err, results) => {
            res.json({
                code: 200,
                data: {
                    id: results[0]['last_insert_id()'],
                    idcard: req.body.idcard,
                    schoolid:req.body.schoolid,
                    teacher_name: req.body.teacher_name,
                    password: req.body.password,
                    money: parseInt(req.body.money),
                    course:req.body.course,
                    study_time: req.body.study_time
                }
            });
        })
    }).catch(err => {
        res.json({
            code: 100,
            data: `插入数据有误`
        })
    })
});

//  插入student
app.post('/insertdata_student', (req, res) => {
    let params = [req.body.idcard, req.body.schoolid, req.body.child_name, req.body.parent_name, req.body.phone, req.body.course, req.body.study_time] //  传来的参数
    let addsql = `insert into students_table(idcard, schoolid, child_name, parent_name, phone, course, study_time) value (?,?,?,?,?,?,?)` //  插入语句，?代表插入的值，要插入到test表内容

    let student = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })


    Promise.all([student]).then(result => {
         //last_insert_id是获取表中最后一条数据
        connection.query('select last_insert_id()', (err, results) => {
            res.json({
                code: 200,
                data: {
                    id: results[0]['last_insert_id()'],
                    idcard: req.body.idcard,
                    schoolid: req.body.schoolid,
                    child_name: req.body.child_name,
                    parent_name: req.body.parent_name,
                    phone: req.body.phone,
                    course: req.body.course,
                    study_time: req.body.study_time
                }
            });
        })
    }).catch(err => {
        res.json({
            code: 100,
            data: `插入数据有误`
        })
    })
});

//  删除parent
app.post('/deletedata_parent', (req, res) => {
    let [params, addsql] = [
        [req.body.parent_name],
        'delete parents_table from parents_table where parent_name = ? '
    ]

    let parent = new Promise((resolve, reject) => {
        connection.query(addsql, params, function (err, result) {
            err ? reject(`删除失败`) : resolve(result)
        })
    })

    Promise.all([parent]).then(result => {
        res.json({
            code: 200,
            data: `删除成功`
        });
    }).catch(err => {
        res.json({
            code: 100,
            data: '删除失败'
        });
    })
});

//  通过家长的删除，删除student
app.post('/deletedata_parent_student', (req, res) => {
    let [params, addsql] = [
        [req.body.parent_name],
        'delete students_table from students_table where parent_name = ? '
    ]

    let student = new Promise((resolve, reject) => {
        connection.query(addsql, params, function (err, result) {
            err ? reject(`删除失败`) : resolve(result)
        })
    })

    Promise.all([student]).then(result => {
        res.json({
            code: 200,
            data: `删除成功`
        });
    }).catch(err => {
        res.json({
            code: 100,
            data: '删除失败'
        });
    })
});

//  删除teacher
app.post('/deletedata_teacher', (req, res) => {
    let [params, addsql] = [
        [req.body.idcard],
        'delete teachers_table from teachers_table where idcard = ? '
    ]

    let teacher = new Promise((resolve, reject) => {
        connection.query(addsql, params, function (err, result) {
            err ? reject(`删除失败`) : resolve(result)
        })
    })

    Promise.all([teacher]).then(result => {
        res.json({
            code: 200,
            data: `删除成功`
        });
    }).catch(err => {
        res.json({
            code: 100,
            data: '删除失败'
        });
    })
});

//  删除student
app.post('/deletedata_student', (req, res) => {
    let [params, addsql] = [
        [req.body.id],
        'delete students_table from students_table where id = ?'
    ]

    let student2 = new Promise((resolve, reject) => {
        connection.query(addsql, params, function (err, result) {
            err ? reject(`删除失败`) : resolve(result)
        })
    })

    Promise.all([student2]).then(result => {
        res.json({
            code: 200,
            data: `删除成功`
        });
    }).catch(err => {
        res.json({
            code: 100,
            data: '删除失败'
        });
    })
});

//  修改parent密码
app.post('/updatedata_parent', (req, res) => {
    let [params, addsql] = [
        [req.body.password, req.body.parent_name],
        'update parents_table set password = ? where parent_name = ? '
    ]

    let selectSql = `select *
    from parents_table
    where parent_name = ?
    `

    let parent = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })

    Promise.all([parent]).then(result => {
        connection.query(selectSql, [req.body.parent_name], (err, results) => {
            if (err) res.json({
                code: 200,
                data: []
            });
            res.json({
                code: 200,
                data: results
            });
        })
    }).catch(err => {   
        res.json({
            code: 100,
            data: '更新失败'
        });
    })
});

//  修改teacher
app.post('/updatedata_teacher', (req, res) => {
    let [params, addsql] = [
        [req.body.money, req.body.password, req.body.study_time, req.body.idcard],
        'update teachers_table set money = ? , password = ? , study_time = ? where idcard = ? '
    ]

    let selectSql = `select *
    from teachers_table as t
    where idcard = ?
    `

    let teacher = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })

    Promise.all([teacher]).then(result => {
        connection.query(selectSql, [req.body.idcard], (err, results) => {
            if (err) res.json({
                code: 200,
                data: []
            });
            res.json({
                code: 200,
                data: results
            });
        })
    }).catch(err => {
        res.json({
            code: 100,
            data: '更新失败'
        });
    })
});

//  修改student作业
app.post('/updatedata_studenthomeword', (req, res) => {
    let [params, addsql] = [
        [req.body.homeword, req.body.course],
        'update students_table set homeword = ? where course = ? '
    ]

    let selectSql = `select *
    from students_table as s
    where course = ?
    `

    let student = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })

    Promise.all([student]).then(result => {
        connection.query(selectSql, [req.body.course], (err, results) => {
            if (err) res.json({
                code: 200,
                data: []
            });
            res.json({
                code: 200,
                data: results
            });
        })
    }).catch(err => {
        res.json({
            code: 100,
            data: '更新失败'
        });
    })
});

//  修改student评价
app.post('/updatedata_studentcomment', (req, res) => {
    let [params, addsql] = [
        [req.body.comment, req.body.schoolid, req.body.course],
        'update students_table set comment = ? where schoolid = ? and course = ?'
    ]

    let selectSql = `select *
    from students_table as s
    where schoolid = ?
    `

    let student = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })

    Promise.all([student]).then(result => {
        connection.query(selectSql, [req.body.schoolid], (err, results) => {
            if (err) res.json({
                code: 200,
                data: []
            });
            res.json({
                code: 200,
                data: results
            });
        })
    }).catch(err => {
        res.json({
            code: 100,
            data: '更新失败'
        });
    })
});

//  修改student上课时间
app.post('/updatedata_studentstudytime', (req, res) => {
    let [params, addsql] = [
        [req.body.study_time, req.body.id],
        'update students_table set study_time = ? where id = ?'
    ]

    let selectSql = `select *
    from students_table as s
    where id = ?
    `

    let student = new Promise((resolve, reject) => {
        connection.query(addsql, params, (err, result) => {
            err ? reject(`插入失败`) : resolve(result)
        })
    })

    Promise.all([student]).then(result => {
        connection.query(selectSql, [req.body.id], (err, results) => {
            if (err) res.json({
                code: 200,
                data: []
            });
            res.json({
                code: 200,
                data: results
            });
        })
    }).catch(err => {
        res.json({
            code: 100,
            data: '更新失败'
        });
    })
});

//配置服务端口 
var server = app.listen(3000, function () {
    const hostname = 'localhost';
    const port = 3000;
    console.log(`Server running at http://${hostname}:${port}/`);
})