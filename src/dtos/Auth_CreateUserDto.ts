import { ApiProperty } from '@nestjs/swagger'
import { Auth_LoginDto } from './Auth_LoginDto';
import { SystemRoleEnum } from '@app/enums/SystemRoleEnum';

export class Auth_CreateUserDto extends Auth_LoginDto {
    @ApiProperty({ type: String, enum: SystemRoleEnum, required: true })
    readonly role: SystemRoleEnum;

    @ApiProperty({ type: String, required: true })
    readonly name: string;

    @ApiProperty({ type: String, required: true })
    readonly email: string;

    @ApiProperty({ type: String, required: false })
    readonly description?: string;
}