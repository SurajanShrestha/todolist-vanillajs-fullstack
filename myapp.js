const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});

const Schema=mongoose.Schema;

const taskSchema=new Schema({
   name:  {type: String, required: true}
});

const Task=mongoose.model('Task',taskSchema);

const createAndSaveTask=(done,taskName)=>{
    var taskDoc=new Task({name: taskName});
    taskDoc.save((err,savedTask)=>{
        if(err){
            done(err);
        }
        done(null,savedTask);
    });
};

const findMultipleTasks=(done)=>{
    Task.find({},(err,foundTasks)=>{
        if(err){
            done(err);
        }
        done(null,foundTasks);
    });
};

mongoose.set('useFindAndModify', false);

const deleteTask=(done,taskId)=>{
    Task.findByIdAndRemove(taskId,(err,deletedTask)=>{
        if(err){
            done(err);
        }
        done(null,deletedTask);
    });
};

exports.createAndSaveTask=createAndSaveTask;
exports.findMultipleTasks=findMultipleTasks;
exports.deleteTask=deleteTask;