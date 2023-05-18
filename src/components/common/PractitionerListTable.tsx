import * as React from 'react';

import Loading from './Loading';
import PractitionerListItem from './PractitionerListItem';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';

interface PractitionerListTableProps {
  isActionMenu: boolean;
  userData: PractitionerPayload[];
  setUserData: (data: PractitionerPayload[]) => void;
  setIsActionMenu: (isMenuVisible: boolean) => void;
}

const PractitionerListTable = (props: PractitionerListTableProps) => {
  const isFetching = false;

  const handleActionMenuClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();
    props.setIsActionMenu(true);
  };

const dummyData: PractitionerPayload[] = [{
  dob: '',
  city: '',
  email: '',
  gender: '',
  status: '',
  contact: '',
  address: '',
  zipcode: '',
  endTime: '',
  userImg: '',
  fullName: '',
  startTime: '',
  workingDays: 0,
  allergies: [''],
  isICUSpecialist: false
}]

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className="practitionerListTable__wrapper">
          <table className="practitionerListTable" cellSpacing="0">
            <tr className="practitionerListTable__header">
              <th className="text__label-muted">Basic Info</th>
              <th className="text__label-muted">Phone Number</th>
              <th className="text__label-muted">DOB</th>
              <th className="text__label-muted">Start time</th>
              <th className="text__label-muted">End time</th>
              <th className="text__label-muted">ICU Specialist</th>
            </tr>
            {dummyData.map((data: PractitionerPayload) => (
              <PractitionerListItem
                data={data}
                key={data.id}
                handleActionMenuClick={handleActionMenuClick}
              />
            ))}
          </table>
          
        </div>
      )}
    </>
  );
};

export default PractitionerListTable;
