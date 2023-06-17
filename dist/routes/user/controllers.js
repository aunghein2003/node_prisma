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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const models_1 = require("./models");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, models_1.fetchUsersFromDB)();
            res.status(200).json({ success: true, data: data });
        }
        catch (error) {
            res.status(500).json({ success: false, msg: error });
        }
    });
}
exports.getUsers = getUsers;
function createUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const name = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) || "";
        if (!name)
            return res.status(400).json({ success: false, msg: "Invalid Request" });
        try {
            yield (0, models_1.addUserToDB)(name);
            res.status(201).json({ success: true, msg: "New user created" });
        }
        catch (error) {
            res.status(500).json({ success: false, msg: error });
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const name = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) || "";
        if (!name)
            return res
                .status(400)
                .json({ success: false, msg: "Please provide update name" });
        try {
            yield (0, models_1.updateUserDB)(Number(id), name);
            res.status(200).json({ success: true, msg: "Successfully updated user" });
        }
        catch (error) {
            res.status(500).json({ success: false, msg: error });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield (0, models_1.deleteUserDB)(Number(id));
            res.status(200).json({ success: true, msg: "Successfully deleted user" });
        }
        catch (error) {
            res.status(500).json({ success: false, msg: error });
        }
    });
}
exports.deleteUser = deleteUser;
