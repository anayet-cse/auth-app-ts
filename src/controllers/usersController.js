"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersService_1 = __importDefault(require("../services/usersService"));
const utils_1 = __importDefault(require("../utils/utils"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield usersService_1.default.createUser(req);
                res.status(response.status).send(response.message);
            }
            catch (error) {
                console.error(error);
                res.status(500).send({
                    message: utils_1.default.SYSTEM_ERROR
                });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield usersService_1.default.loginUser(req);
                res.status(response.status).json(response.data);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Internal Server Error."
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield usersService_1.default.updateUser(req);
                res.status(response.status).send(response.message);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    error: "Internal Server Error."
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield usersService_1.default.deleteUser(req);
                res.status(response.status).send(response.message);
            }
            catch (error) {
                console.error(error);
                res.status(500).send({
                    message: "Internal Server Error."
                });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield usersService_1.default.getUser(req);
                res.status(response.status).json(response.data);
            }
            catch (error) {
                console.error(error);
                res.status(500).send({
                    message: "Internal Server Error."
                });
            }
        });
    }
}
exports.default = new UserController();
