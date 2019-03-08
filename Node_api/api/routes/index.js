var express = require('express');
var router = express.Router();
var cors = require('cors');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'angular_demo'
});

/* GET home page. */
router.get('/dashboard/viewdata', cors(), function(req, res, next) {
 // res.render('index', { title: 'Express' });
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  
 //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log("request");

      console.log('You are now connected...');
      var response;
      connection.query('SELECT * FROM list', function(err, data1) {
          response = {
            //data: [{idl:data1[0].list_id, name:data1[0].list_name}]
          data: data1
          //   ,
          // {id:2, name:'learn Node'},
          // {id:3, name:'learn grunt'},
          // {id:4, name:'learn gulp'},
          // {id:5, name:'make cooking'},
          // {id:6, name:'learn Jenkis'},
          // {id:7, name:'do rfresh'}
          //]
          };
        if (err) throw err
          console.log("Error");
        res.send(response);      
      });
});

router.post('/dashboard/test', cors(),function(req, res, next) {

  console.log("test called");
  // res.render('index', { title: 'Express' });
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log("req.body.name="+JSON.stringify(req.body));
  console.log("request");
  
    console.log('You are now connected...');
    if(req.body.name != ''){
      connection.query('INSERT INTO list (list_name) VALUES (?)', [req.body.name], function(err,result) {
        if (err) throw err
        console.log("result=" + JSON.stringify(result));
        if(result){
          res.send({
            message: "data stored"
         });
        }else{
          res.send({
            message: "error to store data"
         });
        }
      })
    }
});

// function checkAuth(req, res, next) {
//   if (!req.session.user_email_id) {
//     res.send('You are not authorized to view this page');
//   } else {
//     next();
//   }
// }

router.post('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  var post = req.body;
  console.log("post="+post.email);
  if(post.email != "" && post.password != "")
  {
    console.log("success");
    connection.query('SELECT * FROM user_login where user_email_id=? and user_pass=?',[post.email,post.password], function(err, result) {
      console.log("query success="+JSON.stringify(result))
      if(result.length > 0){
        res.send({
          message: "Login Successfuly"
        });
      }else{
        res.send({
          message: "Login Failed"
        });
      }
    })
  }else{
    res.send({
      message: "Login Failed"
    });
    console.log("failed");
  }
});

router.post('/dashboard/viewdata', cors(), function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  console.log("edit");
  console.log("req.body.name="+(JSON.stringify(req.body.name)));
  console.log("request");
  
    console.log('You are now connected...');
      connection.query('UPDATE list SET list_name=? WHERE list_id=?',[req.body.name,req.body.ID], function(err,result) {
        if (err) throw err
        console.log("result=" + JSON.stringify(result));
        console.log("affectedRows="+result.affectedRows);
        if(result.affectedRows == 1){
          res.send({
            message: "data Update"
         });
        }else{
          res.send({
            message: "error to Update data"
         });
      }
    })
});

router.delete('/dashboard/deletedata', cors(),function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("delete");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log("req.body.id="+JSON.stringify(req.body.id));
  console.log("okkk");

    console.log('You are now connected...');
      connection.query('DELETE FROM list  WHERE list_id = ? ', [req.body.id], function(error, result) {
        if (error) throw error
        console.log("result=" + JSON.stringify(result));
        console.log("affectedRows="+result.affectedRows);
        if(result.affectedRows == 1){
          res.send({
            message: "data Delete"
         });
        }else{
          res.send({
            message: "error to delete"
         });
        }
      })
});
// router.delete('/',cors(), function (req, res) {
//    console.log(req.id);
//     connection.connect(function(err) {
//      if (err) throw err
//       console.log('You are now connected...');
//       connection.query('DELETE FROM list WHERE id =?', [req.body.id], function (error, results, fields) {
//       if (error) throw error
//       })
//     });
//    res.send({message:'Record has been deleted!'});
//  });


module.exports = router;
