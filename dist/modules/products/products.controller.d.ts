import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(page?: number, limit?: number): Promise<import("./products.schema").Product[]>;
    findById(id: string): Promise<import("./products.schema").Product>;
    create(createProductDto: CreateProductDto): Promise<import("./products.schema").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./products.schema").Product>;
    delete(id: string): Promise<import("./products.schema").Product>;
}
