export declare class CreateProductDto {
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
}
export declare class UpdateProductDto {
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    category?: string;
    validateAtLeastOneField: boolean;
}
export declare class DeleteProductDto {
    id: string;
}
