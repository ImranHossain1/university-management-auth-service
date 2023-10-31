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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists');
    }
    //match password
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatch(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Incorrect Password');
    }
    const { id: userId, role, needsPasswordChange } = isUserExist;
    //create access token & refresh token
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // //checking isUserExists
    // const isUserExist = await User.isUserExist(user?.userId);
    const isUserExist = yield user_model_1.User.findOne({ id: user === null || user === void 0 ? void 0 : user.userId }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists');
    }
    // checking old password
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatch(oldPassword, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Old Password is Incorrect');
    }
    // data update
    isUserExist.needsPasswordChange = false;
    isUserExist.password = newPassword;
    //updateing using save()
    isUserExist.save();
    //Hash Password before saving
    /*   const newHashPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds)
    );
    const query = { id: user?.userId };
    const updatedData = {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    };
    //update password
    await User.findOneAndUpdate(query, updatedData); */
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({
        userId: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const newRefreshToken = jwtHelper_1.jwtHelpers.createToken({
        userId: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};
