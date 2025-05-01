import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  collection: 'products', // Explicitly sets the collection name
})
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Virtual field to expose `_id` as `id`
ProductSchema.virtual('id').get(function () {
  return (this._id as Types.ObjectId).toHexString();
});

// Configure the schema to include virtuals and exclude `_id` and `__v`
ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false, // Excludes `__v`
  transform: (doc, ret) => {
    delete ret._id; // Exclude `_id`
  },
});

ProductSchema.set('toObject', {
  virtuals: true,
  versionKey: false, // Excludes `__v`
  transform: (doc, ret) => {
    delete ret._id; // Exclude `_id`
  },
});
