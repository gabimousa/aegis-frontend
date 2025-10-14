export type Customer = {
  id: string;
  code: string;
  name: string;
  website?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  iban?: string | null;
  bic?: string | null;
};
