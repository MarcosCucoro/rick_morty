export interface UserProfile {
  username: string;
  email: string;
  memberSince: Date;
  favoriteCharacter: string;
  favoriteCharacterImage: string | null;
  totalVisits: number;
}
