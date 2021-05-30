const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
// const {Schema}=mongoose
app.use(cors())
const superagent = require('superagent');
const { model } = require('mongoose')

const BookSchema = new mongoose.Schema({
    name: String,
    description:String,
    status:String,
    image:String
  });

  const UserShema= new mongoose.Schema({
      email:String,
      books:[BookSchema]
  })
  const User = mongoose.model('userbook', UserShema);

module.exports=User