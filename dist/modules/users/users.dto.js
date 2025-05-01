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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
function AtLeastOneField(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'AtLeastOneField',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const object = args.object;
                    return Object.values(object).some((field) => field !== undefined && field !== null);
                },
                defaultMessage() {
                    return `You must provide at least one field to update (name or jobTitle)`;
                },
            },
        });
    };
}
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3, { message: 'Name must be at least 3 characters long' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name cannot be empty' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3, { message: 'Job title must be at least 3 characters long' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Job title cannot be empty' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "jobTitle", void 0);
__decorate([
    AtLeastOneField(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "validateAtLeastOneField", void 0);
//# sourceMappingURL=users.dto.js.map