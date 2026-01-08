import { BaseEntity } from "../base";
import { VenueType } from "./VenueType.enum";

export type IVenue = {
  id: string;
  name: string;
  description: string;
  type: VenueType;
  address: string;
  city: string;
  country: string;
  capacity: number;
  phone?: string;
  website?: string;
  managerId: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class Venue extends BaseEntity {
  private _name: string;
  private _description: string;
  readonly type: VenueType;
  private _address: string;
  private _city: string;
  private _country: string;
  readonly capacity: number;
  private _phone?: string;
  private _website?: string;
  readonly managerId: string;
  private _rating: number;
  private _reviewCount: number;
  private _isActive: boolean;

  constructor(data: IVenue) {
    super(data.id, data.createdAt);
    this._name = data.name;
    this._description = data.description;
    this.type = data.type;
    this._address = data.address;
    this._city = data.city;
    this._country = data.country;
    this.capacity = data.capacity;
    this._phone = data.phone;
    this._website = data.website;
    this.managerId = data.managerId;
    this._rating = Math.max(0, Math.min(5, data.rating));
    this._reviewCount = data.reviewCount;
    this._isActive = data.isActive;
    this.updatedAt = data.updatedAt;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get address(): string {
    return this._address;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get rating(): number {
    return this._rating;
  }

  get reviewCount(): number {
    return this._reviewCount;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get fullAddress(): string {
    return `${this._address}, ${this._city}, ${this._country}`;
  }

  get contactInfo() {
    return {
      phone: this._phone,
      website: this._website,
    };
  }

  updateRating(newRating: number, reviewCount: number): void {
    this._rating = Math.max(0, Math.min(5, newRating));
    this._reviewCount = reviewCount;
    this.touch();
  }

  activate(): void {
    this._isActive = true;
    this.touch();
  }

  deactivate(): void {
    this._isActive = false;
    this.touch();
  }

  updateInfo(
    updates: Partial<
      Pick<IVenue, "name" | "description" | "address" | "city" | "country" | "phone" | "website">
    >
  ): void {
    if (updates.name) this._name = updates.name;
    if (updates.description) this._description = updates.description;
    if (updates.address) this._address = updates.address;
    if (updates.city) this._city = updates.city;
    if (updates.country) this._country = updates.country;
    if (updates.phone !== undefined) this._phone = updates.phone;
    if (updates.website !== undefined) this._website = updates.website;
    this.touch();
  }

  toJSON(): IVenue {
    return {
      id: this.id,
      name: this._name,
      description: this._description,
      type: this.type,
      address: this._address,
      city: this._city,
      country: this._country,
      capacity: this.capacity,
      phone: this._phone,
      website: this._website,
      managerId: this.managerId,
      rating: this._rating,
      reviewCount: this._reviewCount,
      isActive: this._isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getPublicInfo(): Omit<IVenue, "managerId"> {
    const { ...publicData } = this.toJSON();
    return publicData;
  }

  static create(
    name: string,
    description: string,
    type: VenueType,
    address: string,
    city: string,
    country: string,
    capacity: number,
    managerId: string
  ): Venue {
    return new Venue({
      id: crypto.randomUUID(),
      name,
      description,
      type,
      address,
      city,
      country,
      capacity,
      managerId,
      rating: 0,
      reviewCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
