import {
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsOptional,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

// Custom decorator to ensure at least one field is provided
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
          return `You must provide at least one field to update (name or jobTitle)`;
        },
      },
    });
  };
}

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3, { message: 'Name must be at least 3 characters long' }) // Minimum length validation
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name?: string;

  @IsOptional()
  @MinLength(3, { message: 'Job title must be at least 3 characters long' })
  @IsNotEmpty({ message: 'Job title cannot be empty' })
  jobTitle?: string;

  @AtLeastOneField()
  validateAtLeastOneField: boolean; // This triggers the custom validation
}
