import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './products.schema';
import { ProductsMiddleware } from './products.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(ProductsMiddleware) // Apply the middleware
  //     .forRoutes(
  //       { path: 'products', method: RequestMethod.GET },
  //       { path: 'products', method: RequestMethod.POST },
  //     ); // Apply it to all routes in ProductsController
  // }
}
