interface UserDetail {
  id: number;
  dob: string;
  fullName: string;
  email: string;
  userImg?: string;
  contact: string;
  endTime: string;
  startTime: string;
  address: string;
  gender: string;
  city: string;
  zipcode: string;
  allergies?: string;
  status: string;
  isICUSpecialist: boolean;
}

export default UserDetail;
