import {
Response
} from "express";


import {
createWorkLog,
updateWorkLog,
deleteWorkLog
} from "../services/workLogService";



export const createWorkLogController =
async(
req:any,
res:Response
)=>{


try{


const log =
await createWorkLog({

...req.body,

userId:
req.user._id

});



return res
.status(201)
.json({

success:true,

log

});



}

catch(error:any){


return res
.status(400)
.json({

success:false,

message:
error.message

});


}


};

export const updateWorkLogController =
async(req:any,res:Response)=>{


try{

const log =
await updateWorkLog(

req.params.id,

req.body,

req.user._id

);


return res.json({

success:true,

log

});


}

catch(error:any){

return res.status(400).json({

success:false,

message:error.message

});

}

};




export const deleteWorkLogController =
async(req:any,res:Response)=>{


try{


await deleteWorkLog(

req.params.id,

req.user._id

);



return res.json({

success:true,

message:
"WorkLog deleted"

});


}

catch(error:any){

return res.status(400).json({

success:false,

message:error.message

});

}


};