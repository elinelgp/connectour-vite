import { BaseEntity } from "../base";
import { GenreMusic } from "./GenreMusic.enum";

export type IArtist = {
  id: string;
  userId: string;
  stageName: string;
  bio: string;
  genres: GenreMusic[];
  rating: number;
  reviewCount: number;
  followerCount: number;
  website?: string;
  instagram?: string;
  youtube?: string;
  isVerified: boolean;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Artist extends BaseEntity {
  readonly userId: string;
  private _stageName: string;
  private _bio: string;
  private _genres: GenreMusic[];
  private _rating: number;
  private _reviewCount: number;
  private _followerCount: number;
  private _website?: string;
  private _instagram?: string;
  private _youtube?: string;
  private _isVerified: boolean;
  private _profileImageUrl?: string;

  constructor(data: IArtist) {
    super(data.id, data.createdAt);
    this.userId = data.userId;
    this._stageName = data.stageName;
    this._bio = data.bio;
    this._genres = [...data.genres];
    this._rating = Math.max(0, Math.min(5, data.rating));
    this._reviewCount = data.reviewCount;
    this._followerCount = data.followerCount;
    this._website = data.website;
    this._instagram = data.instagram;
    this._youtube = data.youtube;
    this._isVerified = data.isVerified;
    this._profileImageUrl = data.profileImageUrl;
    this.updatedAt = data.updatedAt;
  }

  get stageName(): string {
    return this._stageName;
  }

  get bio(): string {
    return this._bio;
  }

  get genres(): readonly GenreMusic[] {
    return this._genres;
  }

  get rating(): number {
    return this._rating;
  }

  get reviewCount(): number {
    return this._reviewCount;
  }

  get followerCount(): number {
    return this._followerCount;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }

  get profileImageUrl(): string | undefined {
    return this._profileImageUrl;
  }

  get socialLinks() {
    return {
      website: this._website,
      instagram: this._instagram,
      youtube: this._youtube,
    };
  }

  addGenre(genre: GenreMusic): boolean {
    if (this._genres.includes(genre)) return false;
    this._genres.push(genre);
    this.touch();
    return true;
  }

  removeGenre(genre: GenreMusic): boolean {
    const initialLength = this._genres.length;
    this._genres = this._genres.filter((g) => g !== genre);
    const removed = this._genres.length < initialLength;
    if (removed) this.touch();
    return removed;
  }

  follow(): void {
    this._followerCount++;
    this.touch();
  }

  unfollow(): void {
    if (this._followerCount > 0) {
      this._followerCount--;
      this.touch();
    }
  }

  updateRating(newRating: number, reviewCount: number): void {
    this._rating = Math.max(0, Math.min(5, newRating));
    this._reviewCount = reviewCount;
    this.touch();
  }

  verify(): void {
    this._isVerified = true;
    this.touch();
  }

  unverify(): void {
    this._isVerified = false;
    this.touch();
  }

  updateProfile(updates: Partial<Pick<IArtist, 'stageName' | 'bio' | 'website' | 'instagram' | 'youtube' | 'profileImageUrl'>>): void {
    if (updates.stageName) this._stageName = updates.stageName;
    if (updates.bio) this._bio = updates.bio;
    if (updates.website !== undefined) this._website = updates.website;
    if (updates.instagram !== undefined) this._instagram = updates.instagram;
    if (updates.youtube !== undefined) this._youtube = updates.youtube;
    if (updates.profileImageUrl !== undefined) this._profileImageUrl = updates.profileImageUrl;
    this.touch();
  }

  toJSON(): IArtist {
    return {
      id: this.id,
      userId: this.userId,
      stageName: this._stageName,
      bio: this._bio,
      genres: [...this._genres],
      rating: this._rating,
      reviewCount: this._reviewCount,
      followerCount: this._followerCount,
      website: this._website,
      instagram: this._instagram,
      youtube: this._youtube,
      isVerified: this._isVerified,
      profileImageUrl: this._profileImageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getPublicInfo(): Omit<IArtist, 'userId'> {
    const { ...publicData } = this.toJSON();
    return publicData;
  }

  static create(userId: string, stageName: string, bio: string, genres: GenreMusic[]): Artist {
    return new Artist({
      id: crypto.randomUUID(),
      userId,
      stageName,
      bio,
      genres,
      rating: 0,
      reviewCount: 0,
      followerCount: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}