var express = require('express');

var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended:true} ));

app.use(express.static("public"));

app.set('view engine','ejs');
// app.get('/', function(req, res){
//     res.render('index');
//  });

app.listen(process.env.PORT || 3000,function (){
    console.log("app listening on port 3000")
});


// app.post('/add',function (req,res){
//     res.render('index');
// });


var task = ["first task"];
var complete = ["finished task"];

app.post('/add',function(req,res){
    var newTask=req.body.newtask;
    task.push(newTask);
    res.redirect('/');   
});



app.post('/remove',function(req,res){
    var completedTask=req.body.check;
    if(typeof completedTask==="string"){
        complete.push(completedTask);
        task.splice(task.indexOf(completedTask),1);

    }
    else if (typeof completedTask==="object"){
        for(var i=0;i<completedTask.length; i++){
            complete.push(completedTask[i]);
            task.splice(task.indexOf(completedTask[i]),1);

        }
    }
    res.redirect('/');

});

app.post('/clear',function(req,res){
    task.splice(0,task.length);
    complete.splice(0,complete.length);
    res.redirect('/')
});

app.get('/',function(req,res){
    res.render ('index',{ task: task, complete:complete});   
}); 
