export interface User {
  id: number;
  mobilenumber: string;
  name: string;
  email: string;
  username: string;
  isActive: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
  contactDateCreated: string;
}