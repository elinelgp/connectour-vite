import { BaseEntity } from "../base";
import { UserRole } from "./UserRole.enum";

export type IUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends BaseEntity {
  private _email: string;
  private _name: string;
  readonly role: UserRole;

  constructor(data: IUser) {
    super(data.id, data.createdAt);
    this._email = data.email;
    this._name = data.name;
    this.role = data.role;
    this.updatedAt = data.updatedAt;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  isArtist(): boolean {
    return this.role === UserRole.ARTIST;
  }

  isVenueManager(): boolean {
    return this.role === UserRole.VENUE_MANAGER;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  hasRole(...roles: UserRole[]): boolean {
    return roles.includes(this.role);
  }

  updateProfile(name: string, email: string): User {
    return new User({
      ...this.toJSON(),
      name,
      email,
      updatedAt: new Date(),
    });
  }

  toJSON(): IUser {
    return {
      id: this.id,
      email: this._email,
      name: this._name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getPublicData(): Omit<IUser, "email"> {
    const { ...publicData } = this.toJSON();
    return publicData;
  }

  static create(email: string, name: string, role: UserRole): User {
    return new User({
      id: crypto.randomUUID(),
      email,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
