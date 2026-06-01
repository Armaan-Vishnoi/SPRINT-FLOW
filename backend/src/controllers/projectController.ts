import {
  Response
} from "express";


import {

createProject,

getProjects

} from "../services/projectService";



// CREATE PROJECT


export const createProjectController =
async(
req:any,
res:Response
)=>{


try{


const project =
await createProject({

...req.body,


manager:
req.user._id,


members:[
req.user._id
]


});



return res.status(201)
.json({

success:true,

project

});


}


catch(error:any){


return res.status(500)
.json({

success:false,

message:error.message

});


}


};





// GET PROJECTS


export const getProjectsController =
async(
req:any,
res:Response
)=>{


try{


const projects =
await getProjects(

req.user._id

);



return res.json({

success:true,

projects

});



}


catch(error:any){


return res.status(500)
.json({

success:false,

message:error.message

});


}


};