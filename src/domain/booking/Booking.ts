import { BaseEntity } from "../base";
import { BookingStatus } from "./BookingStatus.enum";

export type IBooking = {
  id: string;
  eventId: string;
  userId: string;
  numberOfSeats: number;
  totalPrice: number;
  status: BookingStatus;
  bookingReference: string;
  paymentId?: string;
  ticketIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export class Booking extends BaseEntity {
  readonly eventId: string;
  readonly userId: string;
  readonly numberOfSeats: number;
  readonly totalPrice: number;
  private _status: BookingStatus;
  readonly bookingReference: string;
  private _paymentId?: string;
  private _ticketIds: string[];

  constructor(data: IBooking) {
    super(data.id, data.createdAt);
    this.eventId = data.eventId;
    this.userId = data.userId;
    this.numberOfSeats = data.numberOfSeats;
    this.totalPrice = data.totalPrice;
    this._status = data.status;
    this.bookingReference = data.bookingReference;
    this._paymentId = data.paymentId;
    this._ticketIds = [...data.ticketIds];
    this.updatedAt = data.updatedAt;
  }

  get status(): BookingStatus {
    return this._status;
  }

  get paymentId(): string | undefined {
    return this._paymentId;
  }

  get ticketIds(): readonly string[] {
    return this._ticketIds;
  }

  get pricePerSeat(): number {
    return this.totalPrice / this.numberOfSeats;
  }

  get isActive(): boolean {
    return [BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(this._status);
  }

  get isCancellable(): boolean {
    return [BookingStatus.PENDING, BookingStatus.CONFIRMED].includes(this._status);
  }

  confirm(paymentId?: string): boolean {
    if (this._status !== BookingStatus.PENDING) return false;
    this._status = BookingStatus.CONFIRMED;
    if (paymentId) this._paymentId = paymentId;
    this.touch();
    return true;
  }

  complete(): boolean {
    if (this._status !== BookingStatus.CONFIRMED) return false;
    this._status = BookingStatus.COMPLETED;
    this.touch();
    return true;
  }

  cancel(): boolean {
    if (!this.isCancellable) return false;
    this._status = BookingStatus.CANCELLED;
    this.touch();
    return true;
  }

  markNoShow(): boolean {
    if (this._status !== BookingStatus.CONFIRMED) return false;
    this._status = BookingStatus.NO_SHOW;
    this.touch();
    return true;
  }

  generateTickets(): void {
    this._ticketIds = Array.from(
      { length: this.numberOfSeats },
      () => `TICKET-${crypto.randomUUID()}`
    );
    this.touch();
  }

  toJSON(): IBooking {
    return {
      id: this.id,
      eventId: this.eventId,
      userId: this.userId,
      numberOfSeats: this.numberOfSeats,
      totalPrice: this.totalPrice,
      status: this._status,
      bookingReference: this.bookingReference,
      paymentId: this._paymentId,
      ticketIds: [...this._ticketIds],
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static generateReference(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `BK-${timestamp}-${random}`;
  }

  static create(
    eventId: string,
    userId: string,
    numberOfSeats: number,
    totalPrice: number
  ): Booking {
    const booking = new Booking({
      id: crypto.randomUUID(),
      eventId,
      userId,
      numberOfSeats,
      totalPrice,
      status: BookingStatus.PENDING,
      bookingReference: Booking.generateReference(),
      ticketIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    booking.generateTickets();
    return booking;
  }
}
