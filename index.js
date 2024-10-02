const express = require('express');
const bodyParser = require("body-parser");
const path = require('path')
const app = express();
const db = require('./db');
const client = require('prom-client');

const PORT = process.env.PORT || 3020

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({register: client.registry})

console.log(collectDefaultMetrics)

app.use("/assets", express.static('assets'))
app.set("view engine","ejs")


app.use(bodyParser.urlencoded({ extended: true }));
  


app.get('/', (req, res) => {
  res.render('signup');
});

app.get('/metrics', async (req, res) => {
  res.setHeader("Content-Type",client.register.contentType)
  const metrics = await client.register.metrics();
  res.send(metrics);
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


// app.get("/slow", async (req, res) => {
//   try {
//   const timeTaken = await doSomeHeavyTask() ;
//   return res.json({
//    status: "Success",
//    message: `Heavy task completed in ${timeTaken}ms `,
//   })
//   } catch (error) {
//   return res
//   . status (500)
//   .json({ status:"Error" ,error:"Internat Server Error"})
//   }
// });


app.get("/slow", async (req, res) => {

  setTimeout(function() {
    console.log("This will print after 10 seconds");
  }, 10000);

  
  return res
    
    .json({ status:"hello" ,error:"Internat Server Error"})
}

 
);




app.get('/index', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});