const mongoose = require('mongoose')
const config=  require("config")
const dbgr = require("debug")("development: mongoose")
mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
   dbgr("connected");
})
.catch(function(err){
   dbgr(err);
})

//  $env:NODE_ENV="development"
//  $env:DEBUG="development:*"



module.exports = mongoose.connection