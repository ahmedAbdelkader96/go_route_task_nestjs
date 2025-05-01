import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product title cannot be empty' })
  title: string;

  @IsNotEmpty({ message: 'Product description cannot be empty' })
  description: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Product price must be a number' })
  @IsNotEmpty({ message: 'You must provide price param' })
  price: number;

  @IsNotEmpty({ message: 'Product image cannot be empty' })
  image: string;

  @IsNotEmpty({ message: 'Product category cannot be empty' })
  category: string;
}

function AtLeastOneField(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'AtLeastOneField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as Record<string, any>;
          // Check if at least one field is provided
          return Object.values(object).some(
            (field) => field !== undefined && field !== null,
          );
        },
        defaultMessage(): string {
          return `You must provide at least one field to update (title, description, price, image, category)`;
        },
      },
    });
  };
}

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Product title cannot be empty' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Product description cannot be empty' })
  description?: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Product price must be a number' })
  price?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Product image cannot be empty' })
  image?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Product category cannot be empty' })
  category?: string;

  @AtLeastOneField()
  validateAtLeastOneField: boolean; // This triggers the custom validation
}

export class DeleteProductDto {
  @IsNotEmpty({ message: 'Product ID cannot be empty' })
  id: string;
}
