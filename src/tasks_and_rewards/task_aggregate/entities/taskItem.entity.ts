export class TaskItem {
  // Couldve used private fields here but for the sake of simplicity I dont want to introduce getters
  constructor(
    public readonly id: string | null,
    public readonly name: string,
    public completed: boolean,
    public completedAt: Date | null,
  ) {}

  public static add(name: string): TaskItem {
    return new TaskItem(null, name, false, null);
  }

  public complete(): void {
    this.completed = true;
    this.completedAt = new Date();
  }
}
