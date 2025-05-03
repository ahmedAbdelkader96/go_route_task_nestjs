import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) { }

  async findAll(page: number, limit: number, query: string): Promise<Product[]> {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const q = query
    ? { title: { $regex: query, $options: 'i' } } // Assuming you're using MongoDB
    : {};
    return this.productModel.find(q).skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        'Invalid product ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
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
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return savedProduct;
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid user ID format', HttpStatus.BAD_REQUEST);
    }

    const user = await this.productModel.findById(id).exec();
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }



    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async deleteProduct(id: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        'Invalid product ID format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.productModel.findByIdAndDelete(id).exec();
  }
}
