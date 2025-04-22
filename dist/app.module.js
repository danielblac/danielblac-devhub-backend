"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const projects_module_1 = require("./projects/projects.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const contact_module_1 = require("./contact/contact.module");
const mailer_service_1 = require("./mailer/mailer.service");
const mailer_module_1 = require("./mailer/mailer.module");
const gamzcontact_module_1 = require("./gamzcontact/gamzcontact.module");
const gamzmailer_module_1 = require("./gamzmailer/gamzmailer.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('DATABASE_URL'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            projects_module_1.ProjectsModule,
            user_module_1.UserModule,
            contact_module_1.ContactModule,
            mailer_module_1.MailerModule,
            gamzcontact_module_1.GamzcontactModule,
            gamzmailer_module_1.GamzmailerModule,
        ],
        controllers: [],
        providers: [mailer_service_1.MailerService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map