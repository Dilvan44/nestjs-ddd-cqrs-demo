import { IsString, IsUUID } from 'class-validator';

export class OpenTaskListDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsUUID()
  readonly userId: string;
}
