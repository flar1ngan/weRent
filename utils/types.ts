export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

export type ItemCardType = {
  id: string;
  name: string;
  price: number;
  city: string;
  image: string;
};