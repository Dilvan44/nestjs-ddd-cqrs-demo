import { IsUUID } from 'class-validator';

export class CompleteTaskDto {
  @IsUUID()
  public readonly taskId: string;
}
