

export interface Blog {
  user: User;
  title: string;
  description: string;
  image: string;
}

export interface User {
  email: string;
  name: string;
  id: number;
}

export interface UserProfile {
  avatar: string;
  statusText: string;
  createdOn: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  jobProfile: string;
  [key: string]: string | Blob;
}

export interface Question {
  title: string;
  description: string;
  user: User;
  createdOn: string;
  tags: string;
}
