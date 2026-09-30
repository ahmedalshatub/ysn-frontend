export interface CustomerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  city: string;
  address: string;
  files: File[];
}

export interface CustomerNote {
  id: number;
  title: string;
  content: string;
}
