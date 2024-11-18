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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const users_1 = __importDefault(require("../models/users"));
const auth_1 = __importDefault(require("../models/auth"));
const utils_1 = __importDefault(require("../utils/utils"));
const SALT = 8;
class UserService {
    createUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { email, password, firstName, lastName, nid, age, maritalStatus } = req.body;
            const profilePhoto = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || '';
            const existingUser = yield auth_1.default.findOne({ where: { email } });
            if (existingUser) {
                return { status: 400, message: {
                        message: "Already registered with this email account."
                    } };
            }
            const hashedPassword = bcryptjs_1.default.hashSync(password, SALT);
            const authUser = yield auth_1.default.create({
                email, password: hashedPassword
            });
            yield users_1.default.create({
                auth_id: authUser.id, firstName,
                lastName, nid, profilePhoto, age, maritalStatus
            });
            return { status: 201, message: {
                    message: utils_1.default.USER_CREATE
                } };
        });
    }
    loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield auth_1.default.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                return { status: 400, data: {
                        message: 'There is no account with this email.'
                    } };
            }
            const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
            if (!passwordIsValid) {
                return { status: 400, data: {
                        message: 'Invalid email or password.'
                    } };
            }
            const authToken = crypto_1.default.randomBytes(16).toString("hex");
            yield auth_1.default.update({
                auth_token: authToken
            }, {
                where: { email }
            });
            return { status: 200, data: authToken };
        });
    }
    updateUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_1.default.findOne({
                where: {
                    auth_token: req.params.auth_token
                }
            });
            if (!user) {
                return { status: 400, message: {
                        message: "Login First."
                    } };
            }
            yield users_1.default.update(req.body, {
                where: {
                    auth_id: user.id
                }
            });
            return { status: 200, message: {
                    message: utils_1.default.USER_UPDATE
                } };
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_1.default.findOne({
                where: {
                    auth_token: req.params.auth_token
                }
            });
            if (!user) {
                return { status: 400, message: {
                        message: "Login First."
                    } };
            }
            yield auth_1.default.destroy({ where: { email: user.email } });
            yield users_1.default.destroy({ where: { auth_id: user.id } });
            return { status: 200, message: {
                    message: "Successfully deleted your account."
                } };
        });
    }
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield auth_1.default.findOne({
                where: {
                    auth_token: req.params.auth_token
                }
            });
            if (!user) {
                return { status: 400, message: {
                        message: "Login First."
                    } };
            }
            const userData = yield users_1.default.findOne({
                where: {
                    auth_id: user.id
                }
            });
            return { status: 200, data: userData };
        });
    }
}
exports.default = new UserService();
