export class Contact {
  id!: string;
  mobilenumber!: string;
  name!: string;
  isActive!: boolean;
  isFavorite!: boolean;
  isDeleted?: boolean;
  contactDateCreated?: String;
  username!: String;
  email!: String;
}

export const contacts = [
  { "contactId": "c1", "mobilenumber": "1234567890", "name": "John Doe", "isActive": true, "isFavorite": false, "isDeleted": false, "contactDateCreated": "2023-07-12", "username": "john_doe_123", "email": "john.doe@example.com" },
  { "contactId": "c2", "mobilenumber": "9876543210", "name": "Jane Smith", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-05-24", "username": "jane_smith_987", "email": "jane.smith@example.com" },
  { "contactId": "c3", "mobilenumber": "5551112233", "name": "Alice Johnson", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-10-08", "username": "alice_johnson_555", "email": "alice.johnson@example.com" },
  { "contactId": "c4", "mobilenumber": "8887776666", "name": "Bob Williams", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-02-17", "username": "bob_williams_888", "email": "bob.williams@example.com" },
  { "contactId": "c5", "mobilenumber": "3332221111", "name": "Eve Davis", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-11-30", "username": "eve_davis_333", "email": "eve.davis@example.com" },
  { "contactId": "c6", "mobilenumber": "4445556666", "name": "Charlie Brown", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-08-21", "username": "charlie_brown_444", "email": "charlie.brown@example.com" },
  { "contactId": "c7", "mobilenumber": "9998887777", "name": "Grace Taylor", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-04-06", "username": "grace_taylor_999", "email": "grace.taylor@example.com" },
  { "contactId": "c8", "mobilenumber": "7776665555", "name": "Daniel White", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-09-14", "username": "daniel_white_777", "email": "daniel.white@example.com" },
  { "contactId": "c9", "mobilenumber": "6665554444", "name": "Sophia Miller", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-01-28", "username": "sophia_miller_666", "email": "sophia.miller@example.com" },
  { "contactId": "c10", "mobilenumber": "2223334444", "name": "Liam Anderson", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-06-10", "username": "liam_anderson_222", "email": "liam.anderson@example.com" },
  { "contactId": "c11", "mobilenumber": "1112223333", "name": "Olivia Parker", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-03-19", "username": "olivia_parker_111", "email": "olivia.parker@example.com" },
  { "contactId": "c12", "mobilenumber": "5554443333", "name": "Matthew Turner", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-12-02", "username": "matthew_turner_555", "email": "matthew.turner@example.com" },
  { "contactId": "c13", "mobilenumber": "9990001111", "name": "Emma Harris", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-07-28", "username": "emma_harris_999", "email": "emma.harris@example.com" },
  { "contactId": "c14", "mobilenumber": "4448887777", "name": "James Carter", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-02-05", "username": "james_carter_444", "email": "james.carter@example.com" },
  { "contactId": "c15", "mobilenumber": "7773336666", "name": "Ava Rodriguez", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-10-19", "username": "ava_rodriguez_777", "email": "ava.rodriguez@example.com" }
];