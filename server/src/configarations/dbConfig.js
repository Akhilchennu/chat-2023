const config = require('../../config.js');
const { env } = process;
const mongoose = require('mongoose');

const dburl = config.dbUrl
const database=config.database
mongoose.connect(`${dburl}/${database}`)
  .then(() => console.log('Connected!'));

  module.exports=mongoose