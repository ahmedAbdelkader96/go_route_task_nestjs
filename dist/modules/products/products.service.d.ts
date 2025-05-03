import { Model } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDto, UpdateProductDto } from './products.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<Product>);
    findAll(page: number, limit: number, query: string): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
