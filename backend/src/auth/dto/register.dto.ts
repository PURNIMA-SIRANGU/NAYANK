import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  villageId?: string;

  @IsOptional()
  @IsString()
  governmentIdType?:
    | 'AADHAAR'
    | 'VOTER_ID'
    | 'DRIVING_LICENSE'
    | 'RATION_CARD'
    | 'OTHER';

  @IsOptional()
  @IsString()
  governmentIdNumber?: string;
}