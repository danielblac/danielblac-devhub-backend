"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamzcontactModule = void 0;
const common_1 = require("@nestjs/common");
const gamzcontact_service_1 = require("./gamzcontact.service");
const gamzcontact_controller_1 = require("./gamzcontact.controller");
const gamzmailer_module_1 = require("../gamzmailer/gamzmailer.module");
const mongoose_1 = require("@nestjs/mongoose");
const gamzcontact_schema_1 = require("../schemas/gamzcontact.schema");
let GamzcontactModule = class GamzcontactModule {
};
exports.GamzcontactModule = GamzcontactModule;
exports.GamzcontactModule = GamzcontactModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'GamzContact', schema: gamzcontact_schema_1.GamzContactSchema },
            ]),
            gamzmailer_module_1.GamzmailerModule,
        ],
        controllers: [gamzcontact_controller_1.GamzcontactController],
        providers: [gamzcontact_service_1.GamzcontactService],
    })
], GamzcontactModule);
//# sourceMappingURL=gamzcontact.module.js.map