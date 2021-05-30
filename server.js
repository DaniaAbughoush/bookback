const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(express.json());
const PORT=8989
 
app.use(cors());
const User=require('./models/User')
//mongoose 
const superagent = require('superagent');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mybook',
 {useNewUrlParser: true, useUnifiedTopology: true});
 const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`mongo dbwe're connected!`)
});
function seedingUserShema(){
  const dania=new User({

    email:'ms1dodo@gmail.com',
    books:[
    {  name: `hello`,
      description:`nice book for reding`,
      status:`not read`,
      image:`https://images.pexels.com/photos/5407302/pexels-photo-5407302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    },
    {  name: `not now`,
      description:`nicetry whe `,
      status:`not read`,
      image:`https://images.pexels.com/photos/5407302/pexels-photo-5407302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    },
    ]
  })
dania.save();
}
seedingUserShema();
app.get('/', function (req, res) {
  res.send('Hello World')
})
// User.find(function (err,userbook ) {
//   if (err) return console.error(err);
//   console.log(userbook);
// })

// User.find({ email: /^ms1dodo@gmail.com/ },
//  function (err,userbook ) {
//       if (err) return console.error(err);
//       console.log('email',userbook);
//     }

  // );
  app.get('/book',bookMongo)
  function bookMongo(req,res){
    const {email}=req.query;
    User.find({ email:email },function (error,result){
      // console.log('result',result)
      res.send(result[0].books)
    }
      
      )

  }
  app.post('/book',addBook)
  function addBook(req,res){
    // console.log('req.body',req.body)
    // const {email}=req.query;
   const {description, name, image, email}=req.body
    User.find({email:email},function(error,data){
data[0].books.push({
  name:name,
  description:description,
  image:image
})
data[0].save();
res.send(data[0].books)
      // console.log(data)
    }
    )
  }
  app.delete('/book/:index',deleteBook);
  function deleteBook(req,res){
    // console.log(req.params)
    const index = Number(req.params.index);
    // console.log(index)
    const {email}=req.query;
    User.find({email:email},function(error,data){
    // const mydelet=data[0]
    //  console.log('data',data)
      const newdelete=data[0].books.filter((bok,idx)=>
      {
        return idx !==index
      })
     data[0].books=newdelete;
     data[0].save();
      res.send('the book deleted')
    }
    )
  }

  app.put('/book/:index',updateBook);

  function updateBook(req,res){
    const index=Number(req.params.index)

const{description, name, image, email}=req.body;
// const {email}=req.query;
User.find({email:email},function(error,data){
data[0].books.splice(index,1,{
  description:description,
  name:name,
  image:image
}

)
data[0].save();
res.send(data[0].books)
})

  }
app.listen(PORT,()=>console.log(`server at ${PORT}` ))

