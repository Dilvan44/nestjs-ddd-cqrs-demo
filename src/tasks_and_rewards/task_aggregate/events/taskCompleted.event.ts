export class TaskCompletedEvent {
  constructor(
    public readonly taskId: string,
    public readonly userId: string,
  ) {}
}
