import * as React from 'react';

import Loading from './Loading';
import PractitionerListItem from './PractitionerListItem';

interface PractitionerListTableProps {
  isActionMenu: boolean;
  userData: any[];
  setIsActionMenu: (e: any) => void;
  setUserData: (data: any) => void;
}

const PractitionerListTable = (props: PractitionerListTableProps) => {
  const isFetching = false;

  const handleActionMenuClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    props.setIsActionMenu(true);
  };

const dummyData = [{

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
            {dummyData.map((data: any) => (
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
