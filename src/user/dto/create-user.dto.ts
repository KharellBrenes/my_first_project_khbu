import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Role } from '../../generated/prisma/client';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    telephone?: string;

    @ApiPropertyOptional({ enum: Role })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @ApiProperty()
    @IsInt()
    tenantId: number;
}