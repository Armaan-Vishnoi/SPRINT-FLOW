import WorkLog from "../models/WorkLog";
import Task from "../models/Task";
import AuditLog from "../models/AuditLog";
import Project from "../models/Project";


const updateTaskHours =
async(taskId:any)=>{


const total =
await WorkLog.aggregate([

{
$match:{
taskId
}
},


{
$group:{
_id:null,
hours:{
$sum:"$duration"
}
}

}

]);



await Task.findByIdAndUpdate(
taskId,
{
totalHours:
total[0]?.hours || 0
}
);


};




// CREATE


export const createWorkLog =
async(data:any)=>{


if(data.duration<=0){

throw new Error(
"Duration must be positive"
);

}



if(
new Date(data.date)>
new Date()
){

throw new Error(
"Future dates are not allowed"
);

}



const log =
await WorkLog.create(data);



await updateTaskHours(
log.taskId
);



return log;


};




// UPDATE


export const updateWorkLog =
async(
id:string,
data:any,
userId:string
)=>{


const oldLog =
await WorkLog.findById(id);

await checkWorkLogPermission(
oldLog,
userId
);

if(!oldLog){

throw new Error(
"WorkLog not found"
);

}



const updated =
await WorkLog.findByIdAndUpdate(

id,

data,

{
new:true
}

);



await AuditLog.create({

userId,

action:"UPDATE",

entity:"WORKLOG",

entityId:id,


oldValue:
oldLog.toObject(),


newValue:
updated?.toObject()


});



await updateTaskHours(
oldLog.taskId
);



return updated;


};




// DELETE


export const deleteWorkLog =
async(
id:string,
userId:string
)=>{


const log =
await WorkLog.findById(id);

await checkWorkLogPermission(
log,
userId
);

if(!log){

throw new Error(
"WorkLog not found"
);

}



await WorkLog.findByIdAndDelete(id);



await AuditLog.create({

userId,

action:"DELETE",

entity:"WORKLOG",

entityId:id,

oldValue:
log.toObject()

});



await updateTaskHours(
log.taskId
);



return true;


};

const checkWorkLogPermission =
async(
workLog:any,
userId:string
)=>{


const task =
await Task.findById(
workLog.taskId
);


if(!task){

throw new Error(
"Task not found"
);

}



const project =
await Project.findById(
task.projectId
);



if(!project){

throw new Error(
"Project not found"
);

}




const isAssignee =
task.assignee.toString()
===
userId.toString();



const isManager =
project.manager.toString()
===
userId.toString();




if(
!isAssignee &&
!isManager
){

throw new Error(
"Not allowed to modify this work log"
);

}


};