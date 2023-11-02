import { IsUUID } from 'class-validator';

export class FindAllTaskListsDto {
  @IsUUID()
  userId: string;
}
