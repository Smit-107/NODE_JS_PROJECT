var express = require('express')
var app = express()

app.get('/',function(req,res){
  res.send("function call");
})

app.get('/s',function(req,res){
  res.send("Secound function call")
})

app.get('/s1/:id',function(req,res){
  var p = req.params.id
  res.send("Secound1 function call" + p)
})


app.get('/s2',function(req,res){
  var p = req.query.id
  res.send("Secound2 function call" + p)
})

app.listen(2003)