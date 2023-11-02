import { IsString, IsUUID } from 'class-validator';

export class AddTaskDto {
  @IsString()
  readonly name: string;
  @IsUUID()
  readonly tasklistId: string;
}
