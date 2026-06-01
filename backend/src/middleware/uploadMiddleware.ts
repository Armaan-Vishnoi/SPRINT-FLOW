import multer from "multer";
import path from "path";


const storage =
multer.diskStorage({

destination:(
req,
file,
cb
)=>{

cb(
null,
"uploads/profiles"
);

},


filename:(
req,
file,
cb
)=>{


const unique =
Date.now()
+
"-"
+
Math.round(
Math.random()*1e9
);


cb(
null,
unique+
path.extname(
file.originalname
)
);


}


});



const fileFilter =
(
req:any,
file:any,
cb:any
)=>{


const allowed = [

"image/png",

"image/jpg",

"image/jpeg"

];


if(
allowed.includes(
file.mimetype
)
){

cb(null,true);

}

else{

cb(
new Error(
"Unsupported image format"
)
);

}


};



export const uploadProfile =
multer({

storage,

limits:{

fileSize:
2 * 1024 * 1024

},

fileFilter

});