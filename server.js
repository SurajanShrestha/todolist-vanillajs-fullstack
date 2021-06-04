const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const createAndSaveTask=require('./myapp.js').createAndSaveTask;
const findMultipleTasks=require('./myapp.js').findMultipleTasks;
const deleteTask=require('./myapp.js').deleteTask;

const app=express();
dotenv.config();

var homepageLocation=__dirname+'/views/index.html';
var cssLocation=__dirname+'/public';

app.use((req,res,next)=>{
    console.log(req.method+' '+req.path+' '+req.ip);
    next();
},bodyParser.urlencoded({extended: false}));

app.use("/public",express.static(cssLocation));

app.get("/",(req,res)=>{
    res.sendFile(homepageLocation);
});

app.post("/post",(req,res)=>{
    //res.send(req.body.taskName);
    var taskName=req.body.taskName;
    createAndSaveTask((err,data)=>{
        if(err){
            res.send(err);
        }
        res.json({taskName: data.name, id: data._id});
    },taskName);
});

app.get("/read",(req,res)=>{
    findMultipleTasks((err,data)=>{
        if(err){
            res.send(err);
        }
        res.json({taskArray: data});
    });
});

app.post("/delete",(req,res)=>{
    var taskId=req.body.taskId;
    deleteTask((err,data)=>{
        if(err){
            res.send(err);
        }
        res.json({taskName: data.name, id: data._id});
    },taskId);
});

app.listen(process.env.PORT||3000,()=>{
    console.log('Listening to PORT '+(process.env.PORT||3000));
});