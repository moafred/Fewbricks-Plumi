export type AvatarColor = 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn';
export const AVATAR_COLORS: AvatarColor[] = ['sky', 'meadow', 'gold', 'coral', 'moss', 'dawn'];
export const MAX_CHILDREN = 6;

export interface ChildProfile {
  id: string;
  name: string;
  avatarColor: AvatarColor;
  createdAt: number;
}
