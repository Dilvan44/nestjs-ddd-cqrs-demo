import { UserDto } from '../../interfaces/user.dto';

export class UserHasSignedUpEvent {
  constructor(public readonly dto: UserDto) {}
}
