interface PractitionerPayload {
  id?: number;
  dob: string;
  city: string;
  email: string;
  gender: string;
  status: string;
  contact: string;
  address: string;
  zipcode: string;
  endTime: string;
  fullName: string;
  startTime: string;
  workingDays: number;
  allergies: string[];
  isICUSpecialist: boolean;
  userImg: string | File | null;
}

export default PractitionerPayload;
