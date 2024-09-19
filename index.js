const express = require('express');
const bodyParser = require("body-parser");
const path = require('path')
const app = express();
const db = require('./db');


app.use("/assets", express.static('assets'))
app.set("view engine","ejs")


app.use(bodyParser.urlencoded({ extended: true }));
  


app.get('/', (req, res) => {
  res.render('signup');
});



console.log("before")

app.post('/signup', (req, res) => {
   
  const data = {
    Name : req.body.Name ,
    Email : req.body.Email ,
    Password : req.body.Password,
   

  }
  console.log(data.input)

  db.query(`INSERT INTO sign_up (Name, Email ,Password) VALUES ("${data.Name}", "${data.Email}", "${data.Password}");`, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.render('login');
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });
   
  
});


app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', (req, res) => {
   
  const data = {
    Email : req.body.Email ,
    Password : req.body.Password,
   

  }
  console.log(data.input)

  db.query(`select * from sign_up where Email = "${data.Email}" and Password = "${data.Password}";` , (err, rows) =>{
    rows.forEach((row) => {
      console.log(`ID: ${row.Personid}, Name: ${row.Name}, Email: ${row.Email}, Password: ${row.Password}`)
      let name = row.Name
      if(name === null ){
        console.log("no user found")
        res.render('signup')
       }
       else{
        res.render('index')
       }
      

    });
  }
);
  
 
  

  
});







app.get('/index', (req, res) => {
  res.render('index');
});







app.listen(3020, () => {
  console.log('Server started on port 3020');
});