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
exports.deleteUserDB = exports.updateUserDB = exports.addUserToDB = exports.fetchUsersFromDB = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function fetchUsersFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findMany();
        return user;
    });
}
exports.fetchUsersFromDB = fetchUsersFromDB;
function addUserToDB(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.create({
            data: {
                name: name,
            },
        });
    });
}
exports.addUserToDB = addUserToDB;
function updateUserDB(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.update({
            where: { id: id },
            data: { name: name },
        });
    });
}
exports.updateUserDB = updateUserDB;
function deleteUserDB(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.delete({
            where: { id: id },
        });
    });
}
exports.deleteUserDB = deleteUserDB;
