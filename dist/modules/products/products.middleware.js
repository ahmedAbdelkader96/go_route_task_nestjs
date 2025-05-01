"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsMiddleware = void 0;
const common_1 = require("@nestjs/common");
let ProductsMiddleware = class ProductsMiddleware {
    use(req, res, next) {
        throw new common_1.UnauthorizedException('Invalid token 000');
        next();
    }
};
exports.ProductsMiddleware = ProductsMiddleware;
exports.ProductsMiddleware = ProductsMiddleware = __decorate([
    (0, common_1.Injectable)()
], ProductsMiddleware);
//# sourceMappingURL=products.middleware.js.map