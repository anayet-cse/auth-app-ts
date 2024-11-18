"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_photo_1 = __importDefault(require("../middlewares/upload-photo"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const router = (0, express_1.Router)();
router.post('/', upload_photo_1.default.single('profilePhoto'), usersController_1.default.createUser);
router.post('/login', usersController_1.default.loginUser);
router.put('/:auth_token', usersController_1.default.updateUser);
router.delete('/:auth_token', usersController_1.default.deleteUser);
router.get('/:auth_token', usersController_1.default.getUser);
exports.default = router;
