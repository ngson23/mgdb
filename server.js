const express = require('express')

//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');

const app = express()

const mongoose = require('mongoose');
const password = 'MyIo2I4FdG2IkFtx';
const dbName = 'CP';
const uri = `mongodb+srv://sonnvph20319:<password>@ss.meuyerx.mongodb.net/${dbName}?retryWrites=true&w=majority`

const labModel = require('./labModel');

// app.get('/lab', async (req, res) => {
//   await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

//   try {
//     const labs = await labModel.find({tailieu: 2});

//     // labModel.updateMany();
//     // labModel.updateOne({ten: 'Lab 3'}, {ten: 'Lab 3 - 2023'})
//     // labModel.deleteMany({ten: 'Lab 4'});
//     // labModel.deleteOne({ten: 'Lab 4'});


//     console.log(labs.toString());
//     res.send(labs);
//   } catch (err) {
//     console.log(err);
//   }
// });
app.get('/lab',(req,res)=>{
  mongoose.connect(uri).then(console.log('Connect success'))
  res.send('Connect success')
})
app.get('/add_lab', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let lab = new labModel ({
    tieude : 'lab 7',
    url: 'linktailieu.com'
    //tailieu: 2
  });

  //lab.tailieu = 2;


  try {
    let kq = await lab.save();

    console.log(kq);

    let labs = await labModel.find();
    res.send(labs);

  } catch (err) {
    console.log(err);
  }
});

//app.engine('.hbs', ExpressHandlebars());
app.engine('.hbs', expressHbs.engine({ 
  extname: "hbs", 
  defaultLayout: 'main', 
  layoutsDir: "views/layouts/" }));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    //showContentMaytinh: false,

    helpers: {
      foo() { return 'foo. CP17305 - server Android'; }
    }
  });
});

app.get('/maytinh', (req, res) => {
  res.render('emptyView', {
    layout: 'main', 
    showContentMaytinh: true,
    soA: 15,
    soB: 7,
    phepTinh: 'cong',
    kq: 22,

  });
});


const port = 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// npm install express-handlebars
// npm install express
// npm install http 
// npm install -g nodemon
//npm install --save multer
// npm install mongoose
