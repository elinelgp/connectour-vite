export abstract class BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  protected updatedAt: Date;

  constructor(id: string, createdAt: Date = new Date()) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

  protected touch(): void {
    this.updatedAt = new Date();
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  abstract toJSON(): Record<string, unknown> | object;
}
