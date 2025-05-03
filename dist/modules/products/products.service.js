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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll(page, limit, query) {
        const skip = (page - 1) * limit;
        const q = query
            ? { title: { $regex: query, $options: 'i' } }
            : {};
        return this.productModel.find(q).skip(skip).limit(limit).exec();
    }
    async findById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.HttpException('Invalid product ID format', common_1.HttpStatus.BAD_REQUEST);
        }
        const product = await this.productModel.findOne({ _id: id }).exec();
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async create(createProductDto) {
        const { title, price, description, image, category } = createProductDto;
        const newProduct = new this.productModel({
            title,
            price,
            description,
            image,
            category,
        });
        const savedProduct = await newProduct.save();
        if (!savedProduct) {
            console.error('Failed to create product');
            throw new common_1.HttpException('Failed to create product', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return savedProduct;
    }
    async updateProduct(id, updateProductDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.HttpException('Invalid user ID format', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.productModel.findById(id).exec();
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Product not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.productModel
            .findByIdAndUpdate(id, updateProductDto, { new: true })
            .exec();
    }
    async deleteProduct(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.HttpException('Invalid product ID format', common_1.HttpStatus.BAD_REQUEST);
        }
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'Product not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.productModel.findByIdAndDelete(id).exec();
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map