import { BaseEntity } from "../base";
import { EventStatus } from "./EventStatus.enum";

export type IEvent = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  venueId: string;
  artistIds: string[];
  status: EventStatus;
  capacity: number;
  bookedSeats: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Event extends BaseEntity {
  readonly title: string;
  readonly description: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly venueId: string;
  private _artistIds: string[];
  private _status: EventStatus;
  private _bookedSeats: number;
  readonly capacity: number;
  readonly createdBy: string;

  constructor(data: IEvent) {
    super(data.id, data.createdAt);
    this.title = data.title;
    this.description = data.description;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.venueId = data.venueId;
    this._artistIds = [...data.artistIds];
    this._status = data.status;
    this.capacity = data.capacity;
    this._bookedSeats = data.bookedSeats;
    this.createdBy = data.createdBy;
    this.updatedAt = data.updatedAt;
  }

  get status(): EventStatus {
    return this._status;
  }

  get bookedSeats(): number {
    return this._bookedSeats;
  }

  get artistIds(): readonly string[] {
    return this._artistIds;
  }

  get availableSeats(): number {
    return this.capacity - this._bookedSeats;
  }

  get isFull(): boolean {
    return this.availableSeats === 0;
  }

  get occupancyRate(): number {
    return Math.round((this._bookedSeats / this.capacity) * 100);
  }

  get isUpcoming(): boolean {
    return this.startDate > new Date();
  }

  get isPast(): boolean {
    return this.endDate < new Date();
  }

  bookSeats(count: number): boolean {
    if (count <= 0) return false;
    if (this._status !== EventStatus.PUBLISHED) return false;
    if (this._bookedSeats + count > this.capacity) return false;

    this._bookedSeats += count;
    this.touch();
    return true;
  }

  cancelSeats(count: number): boolean {
    if (count <= 0 || count > this._bookedSeats) return false;
    this._bookedSeats -= count;
    this.touch();
    return true;
  }

  publish(): boolean {
    if (this._status !== EventStatus.DRAFT) return false;
    if (this._artistIds.length === 0) return false;
    this._status = EventStatus.PUBLISHED;
    this.touch();
    return true;
  }

  start(): boolean {
    if (this._status !== EventStatus.PUBLISHED) return false;
    this._status = EventStatus.ONGOING;
    this.touch();
    return true;
  }

  complete(): boolean {
    if (this._status !== EventStatus.ONGOING) return false;
    this._status = EventStatus.COMPLETED;
    this.touch();
    return true;
  }

  cancel(): boolean {
    if ([EventStatus.COMPLETED, EventStatus.CANCELLED].includes(this._status)) {
      return false;
    }
    this._status = EventStatus.CANCELLED;
    this.touch();
    return true;
  }

  addArtist(artistId: string): boolean {
    if (this._artistIds.includes(artistId)) return false;
    this._artistIds.push(artistId);
    this.touch();
    return true;
  }

  removeArtist(artistId: string): boolean {
    const initialLength = this._artistIds.length;
    this._artistIds = this._artistIds.filter((id) => id !== artistId);
    const removed = this._artistIds.length < initialLength;
    if (removed) this.touch();
    return removed;
  }

  toJSON(): IEvent {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      venueId: this.venueId,
      artistIds: [...this._artistIds],
      status: this._status,
      capacity: this.capacity,
      bookedSeats: this._bookedSeats,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    venueId: string,
    capacity: number,
    createdBy: string
  ): Event {
    if (endDate <= startDate) {
      throw new Error('End date must be after start date');
    }

    return new Event({
      id: crypto.randomUUID(),
      title,
      description,
      startDate,
      endDate,
      venueId,
      artistIds: [],
      status: EventStatus.DRAFT,
      capacity,
      bookedSeats: 0,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}