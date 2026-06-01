import {Router} from "express";

import {
uploadProfile
} from "../middleware/uploadMiddleware";

import {

authMiddleware

} from "../middleware/authMiddleware";


import {

updateProfileController,

changePasswordController,

deactivateAccountController,

uploadProfileImageController,

requestEmailChangeController,

verifyEmailChangeController

} from "../controllers/profileController";



const router=Router();

router.patch(

"/deactivate",

authMiddleware,

deactivateAccountController

);

router.patch(

"/",

authMiddleware,

updateProfileController

);

router.patch(

"/email",

authMiddleware,

requestEmailChangeController

);



router.get(

"/verify-email/:token",

verifyEmailChangeController

);


router.patch(

"/image",

authMiddleware,

uploadProfile.single(
"profile"
),

uploadProfileImageController

);

router.patch(

"/password",

authMiddleware,

changePasswordController

);



export default router;