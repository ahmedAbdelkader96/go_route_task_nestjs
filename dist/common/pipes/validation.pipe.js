"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class ValidationPipe extends common_1.ValidationPipe {
    constructor() {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                const firstError = errors[0];
                const errorMessage = Object.values(firstError.constraints)[0];
                return new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    timestamp: new Date().toISOString(),
                    message: errorMessage,
                }, common_1.HttpStatus.BAD_REQUEST);
            },
        });
    }
}
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map