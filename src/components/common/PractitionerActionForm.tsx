import { toast } from 'react-toastify';
import React, { SetStateAction, useEffect } from 'react';

import FileUpload from './FileUpload';
import closeIcon from '../../assets/images/close-icon.png';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';

interface PractitionerActionFormProps {
  setIsVisible: (value: boolean) => void;
  editData: PractitionerPayload | undefined;
  addUserData: (data: PractitionerPayload) => void;
  setEditData: (data: PractitionerPayload | undefined) => void;
  handleUserEdit: (practitionerData: PractitionerPayload, id: number | undefined) => void;
}

const PractitionerActionForm = (props: PractitionerActionFormProps) => {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isFormEdited, setIsFormEdited] = React.useState(false);

  const editedData: PractitionerPayload | undefined = props.editData;

  const handleMenuClose = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    props.setIsVisible(false);
    props.setEditData(undefined);
  };

  const initialData: PractitionerPayload = React.useMemo(() => {
    return editedData
      ? editedData
      : {
          dob: '',
          city: '',
          email: '',
          gender: '',
          status: '',
          address: '',
          contact: '',
          zipcode: '',
          endTime: '',
          fullName: '',
          userImg: null,
          startTime: '',
          allergies: [],
          workingDays: [],
          isICUSpecialist: false,
        };
  }, [editedData]);

  const [practitionerData, setPractitionerData] = React.useState(initialData);
  const [selectedAllergies, setSelectedAllergies] = React.useState<string[]>([]);
  const [selectedWorkingDays, setSelectedWorkingDays] = React.useState<string[]>([]);

  useEffect(() => {
    setPractitionerData({ ...practitionerData, allergies: selectedAllergies });
  }, [selectedAllergies]);

  useEffect(() => {
    setPractitionerData({ ...practitionerData, workingDays: selectedWorkingDays });
  }, [selectedWorkingDays]);

  const handleCheckBoxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<SetStateAction<string[]>>
  ) => {
    const itemName = event.target.name;
    setState((prevCheckedItems: string[]) =>
      prevCheckedItems.includes(itemName)
        ? prevCheckedItems.filter((itemtype: string) => itemtype !== itemName)
        : [...prevCheckedItems, itemName]
    );
  };

  useEffect(() => {
    setIsDisabled(practitionerData === initialData);
  }, [practitionerData, initialData]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value: boolean | string = e.target.value;

    if (name === 'isICUSpecialist') {
      value = e.target.checked;
    }
    setPractitionerData({ ...practitionerData, [name]: value });
    setIsFormEdited(true);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Validate inputs before submitting
    if (!validateInputs()) {
      return;
    }

    if (!isFormEdited) {
      handleMenuClose(e);
      props.setEditData(undefined);

      return;
    }

    setIsSubmitting(true);

    editedData ? props.handleUserEdit(practitionerData, editedData.id) : props.addUserData(practitionerData);
    setIsSubmitting(false);
    props.setEditData(undefined);
    setIsFormEdited(false);
    handleMenuClose(e);
  };

  const validateInputs = (): boolean => {
    const requiredFields: Array<keyof PractitionerPayload> = [
      'fullName',
      'email',
      'contact',
      'city',
      'gender',
      'zipcode',
      'dob',
      'workingDays',
      'startTime',
      'endTime',
    ];

    for (const field of requiredFields) {
      if (!practitionerData[field]) {
        toast.error('Please fill in all required fields.');
        return false;
      }
    }

    return true;
  };

  return (
    <div className="modal__container">
      <div className="practitionerActionForm__modal modal">
        <div className="practitionerActionForm__header mb-md">
          <span className="text__title-med">{editedData ? 'Edit Practitioner' : 'Add Practitioner'}</span>
          <img src={closeIcon} alt="" onClick={handleMenuClose} />
        </div>
        <div className="practitionerActionForm__content">
          <FileUpload setPractitionerData={setPractitionerData} practitionerData={practitionerData} />
          <div className="disp-flex flex-col flex-space-between">
            {/* need to refactor and create enums for non repeative code */}
            <input
              required
              type="text"
              name="fullName"
              onChange={handleOnChange}
              className="input__text mb-tn"
              placeholder="YOUR FULL NAME"
              value={practitionerData.fullName}
            />
            <input
              required
              name="email"
              type="email"
              placeholder="YOUR MAIL"
              onChange={handleOnChange}
              className="input__text mb-tn"
              value={practitionerData.email}
            />
            <input
              required
              type="number"
              name="contact"
              onChange={handleOnChange}
              className="input__text mb-tn"
              value={practitionerData.contact}
              placeholder="YOUR CONTACT NUMBER"
            />
            <input
              type="text"
              name="address"
              onChange={handleOnChange}
              placeholder="YOUR ADDRESS"
              className="input__text mb-tn"
              value={practitionerData.address}
            />
            <input
              name="city"
              type="text"
              placeholder="YOUR CITY"
              onChange={handleOnChange}
              value={practitionerData.city}
              className="input__text mb-tn"
            />
          </div>
          <div className="practitionerActionForm__gender-wrapper">
            <span className="text__label mr-sm">Gender: </span>
            <input
              type="radio"
              name="gender"
              onChange={handleOnChange}
              placeholder="YOUR GENDER"
              className="mr-tn"
              value="Male"
              id="Male"
            />
            <label className="mr-tn" htmlFor="Male">
              Male
            </label>
            <input
              type="radio"
              name="gender"
              onChange={handleOnChange}
              placeholder="YOUR GENDER"
              className="mr-tn"
              value="Female"
              id="Female"
            />
            <label className="mr-tn" htmlFor="Female">
              Female
            </label>
            <input
              type="radio"
              name="gender"
              onChange={handleOnChange}
              placeholder="YOUR GENDER"
              className="mr-tn"
              value="Others"
              id="Others"
            />
            <label className="mr-tn" htmlFor="Others">
              Others
            </label>
          </div>
          <input
            type="number"
            name="zipcode"
            onChange={handleOnChange}
            placeholder="YOUR ZIP CODE"
            className="input__text mb-tn"
            value={practitionerData.zipcode}
          />
          <input
            required
            name="dob"
            type="date"
            onChange={handleOnChange}
            value={practitionerData.dob}
            className="input__text mb-tn"
            placeholder="YOUR DATE OF BIRTH"
          />
          <div className="practitionerActionForm__allergies-wrapper">
            <span className="text__label">Working Days: </span>
            <div className="practitionerActionForm__allergies">
              <label>
                <input
                  type="checkbox"
                  name="Sunday"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedWorkingDays)}
                  checked={selectedWorkingDays.includes('Sunday')}
                />
                Sunday
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Monday"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedWorkingDays)}
                  checked={selectedWorkingDays.includes('Monday')}
                />
                Monday
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Tuesday"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedWorkingDays)}
                  checked={selectedWorkingDays.includes('Tuesday')}
                />
                Tuesday
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Wednesday"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedWorkingDays)}
                  checked={selectedWorkingDays.includes('Wednesday')}
                />
                Wednesday
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Thursday"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedWorkingDays)}
                  checked={selectedWorkingDays.includes('Thursday')}
                />
                Thursday
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Friday"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedWorkingDays)}
                  checked={selectedWorkingDays.includes('Friday')}
                />
                Friday
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Saturday"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedWorkingDays)}
                  checked={selectedWorkingDays.includes('Saturday')}
                />
                Saturday
              </label>
            </div>
          </div>
          <input
            required
            type="date"
            name="startTime"
            placeholder="START TIME"
            onChange={handleOnChange}
            className="input__text mb-tn"
            value={practitionerData.startTime}
          />
          <input
            required
            type="date"
            name="endTime"
            placeholder="END TIME"
            onChange={handleOnChange}
            className="input__text mb-tn"
            value={practitionerData.endTime}
          />
          <input
            type="text"
            name="status"
            onChange={handleOnChange}
            placeholder="YOUR STATUS"
            className="input__text mb-tn"
            value={practitionerData.status}
          />
          <div className="disp-flex flex-start">
            <input
              type="checkbox"
              className="mr-sm"
              id="isICUSpecialist"
              name="isICUSpecialist"
              onChange={handleOnChange}
            />
            <label className="text__label no-wrap cursor-pointer" htmlFor="isICUSpecialist">
              ICU Specialist
            </label>
          </div>
          <div className="practitionerActionForm__allergies-wrapper">
            <span className="text__label">Allergies: </span>
            <div className="practitionerActionForm__allergies">
              <label>
                <input
                  type="checkbox"
                  name="pollen"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedAllergies)}
                  checked={selectedAllergies.includes('pollen')}
                />
                Pollen
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Mould"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedAllergies)}
                  checked={selectedAllergies.includes('Mould')}
                />
                Mould
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Food Allergies"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedAllergies)}
                  checked={selectedAllergies.includes('Food Allergies')}
                />
                Food Allergies
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Cockroaches"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedAllergies)}
                  checked={selectedAllergies.includes('Cockroaches')}
                />
                Cockroaches
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Insect stings"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedAllergies)}
                  checked={selectedAllergies.includes('Insect stings')}
                />
                Insect stings
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Dust mites"
                  className="mr-sm"
                  onChange={(event) => handleCheckBoxChange(event, setSelectedAllergies)}
                  checked={selectedAllergies.includes('Dust mites')}
                />
                Dust mites
              </label>
            </div>
          </div>
        </div>
        <div className="disp-flex flex-justify-end ">
          <button className="btn btn__primary" disabled={isSubmitting || isDisabled} onClick={handleSubmit}>
            {editedData ? 'Edit Practitioner' : 'Add practitioner'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PractitionerActionForm;
