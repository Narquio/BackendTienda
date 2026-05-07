import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "MatchPassword", async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments): boolean {
        const [relatedPropertyName] = args.constraints;
        const password = (args.object as any)[relatedPropertyName] as string;
        return password === confirmPassword;
    }

    defaultMessage(args: ValidationArguments): string {
        return "Las contraseñas no coinciden";
    }
}

export function MatchPassword(property: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchPasswordConstraint,
        });
    };
}