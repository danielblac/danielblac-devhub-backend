"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamzcontactController = void 0;
const common_1 = require("@nestjs/common");
const gamzcontact_service_1 = require("./gamzcontact.service");
const create_gamzcontact_dto_1 = require("./dto/create-gamzcontact.dto");
let GamzcontactController = class GamzcontactController {
    constructor(gamzcontactService) {
        this.gamzcontactService = gamzcontactService;
    }
    async create(dto) {
        return this.gamzcontactService.create(dto);
    }
    async findAll() {
        return this.gamzcontactService.findAll();
    }
};
exports.GamzcontactController = GamzcontactController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gamzcontact_dto_1.CreateGamzContactDto]),
    __metadata("design:returntype", Promise)
], GamzcontactController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamzcontactController.prototype, "findAll", null);
exports.GamzcontactController = GamzcontactController = __decorate([
    (0, common_1.Controller)('gamzcontact'),
    __metadata("design:paramtypes", [gamzcontact_service_1.GamzcontactService])
], GamzcontactController);
//# sourceMappingURL=gamzcontact.controller.js.map