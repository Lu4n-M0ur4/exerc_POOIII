export class Courses {
  constructor(
    private id: string,
    private name: string,
    private leasons: number
  ) {}

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string): void {
    this.name = value;
  }

  public getLeasons(): number {
    return this.leasons;
  }

  public setLeasons(value: number): void {
    this.leasons = value;
  }
}
