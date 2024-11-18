import { Router } from 'express';
import upload from '../middlewares/upload-photo';
import userController from '../controllers/usersController';


const router = Router();


router.post('/', upload.single('profilePhoto'), userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:auth_token', userController.updateUser);
router.delete('/:auth_token', userController.deleteUser);
router.get('/:auth_token', userController.getUser);



export default router;