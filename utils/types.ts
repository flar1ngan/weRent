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

export type UserCardType = {
  id?: string,
  firstName?: string,
  lastName?:string,
  username?:string
  profileImg?:string,
  lastMessageTime?: Date | null;
}

export type DateRangeType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type RentType = {
  startDate: Date;
  endDate: Date;
}