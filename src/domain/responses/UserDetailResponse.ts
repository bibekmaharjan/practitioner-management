interface UserDetailResponse {
  data: {
    id: number;
    dob: string;
    city: string;
    email: string;
    gender: string;
    status: string;
    contact: string;
    endTime: string;
    address: string;
    fullName: string;
    zipcode: string;
    userImg?: string;
    startTime: string;
    allergies: string;
    isICUSpecialist: boolean;
  };
}

export default UserDetailResponse;
