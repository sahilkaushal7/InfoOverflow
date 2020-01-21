export interface Blog {
  user: number;
  title: string;
  description: string;
  image: string;
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
