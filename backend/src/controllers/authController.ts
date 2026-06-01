import {
  Request,
  Response,
} from "express";


import {
  registerSchema,
} from "../validators/authValidator";


import {
  hashPassword,
} from "../utils/hashPassword";


import {
  comparePassword,
} from "../utils/comparePassword";


import {
  generateToken,
} from "../utils/generateToken";


import {

findUserByEmail,

createUser,

checkUserActive

} from "../services/authService";




// ================= REGISTER =================


export const register = async (

req:Request,

res:Response

)=>{


try{


const validatedData =
registerSchema.parse(
req.body
);



const existingUser =
await findUserByEmail(
validatedData.email
);



if(existingUser){


return res.status(400)
.json({

success:false,

message:
"Email already exists"

});


}



const hashedPassword =
await hashPassword(
validatedData.password
);



const user =
await createUser({

...validatedData,

password:
hashedPassword

});



return res.status(201)
.json({

success:true,

message:
"User registered",


user:{

id:user._id,

name:user.name,

email:user.email

}


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




// ================= LOGIN =================


export const login = async (

req:Request,

res:Response

)=>{


try{


const {
email,
password
}=req.body;



const user =
await findUserByEmail(
email
);



if(!user){


return res.status(400)
.json({

success:false,

message:
"Invalid credentials"

});

}



// deactivate check


checkUserActive(
user
);



const isMatch =
await comparePassword(

password,

user.password

);



if(!isMatch){


return res.status(400)
.json({

success:false,

message:
"Invalid credentials"

});


}



const token =
generateToken(
user._id.toString()
);



return res.status(200)
.json({

success:true,

token,


user:{

id:user._id,

name:user.name,

email:user.email,

role:user.role

}


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