import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Virtual field to expose `_id` as `id`
UserSchema.virtual('id').get(function () {
  return (this._id as Types.ObjectId).toHexString();
});

// Configure the schema to include virtuals and exclude `_id` and `__v`
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false, // Excludes `__v`
  transform: (doc, ret) => {
    delete ret._id; // Exclude `_id`
    delete ret.password; // Exclude `password`
  },
});

UserSchema.set('toObject', {
  virtuals: true,
  versionKey: false, // Excludes `__v`
  transform: (doc, ret) => {
    delete ret._id; // Exclude `_id`
    delete ret.password; // Exclude `password`
  },
});
