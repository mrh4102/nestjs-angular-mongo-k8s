import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDiaryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  mood: string;
}
