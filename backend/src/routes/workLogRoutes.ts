import {Router} from "express";


import {
authMiddleware
} from "../middleware/authMiddleware";


import {
createWorkLogController,
updateWorkLogController,
deleteWorkLogController
} from "../controllers/workLogController";



const router=Router();



router.post(
"/",
authMiddleware,
createWorkLogController
);

router.patch(
"/:id",
authMiddleware,
updateWorkLogController
);


router.delete(
"/:id",
authMiddleware,
deleteWorkLogController
);

export default router;