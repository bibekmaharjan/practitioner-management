import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { fetchPractitioners } from '../../services/practitioner';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';

import Loading from './Loading';
import PractitionerListItem from './PractitionerListItem';

interface PractitionerListTableProps {
  isActionMenu: boolean;
  userData: PractitionerPayload[];
  setIsActionMenu: (e: any) => void;
  setUserData: (data: any) => void;
}

const PractitionerListTable = (props: PractitionerListTableProps) => {
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const token = React.useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUserData = () => {
    setIsFetching(true);
    fetchPractitioners(config).then(
      (d) => {
        props.setUserData(d.data);
        setIsFetching(false);
      },
      (e) => {
        toast.error(e);
      }
    );
  };

  const handleActionMenuClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    props.setIsActionMenu(true);
  };

React.useEffect(() => {
  fetchUserData();
}, []);

const sortedData: PractitionerPayload[] = props.userData.sort((a, b) => {
  if (a.isICUSpecialist === b.isICUSpecialist) {
    return a.fullName.localeCompare(b.fullName); // if isICUSpecialist is the same, sort by name
  } else {
    return b.isICUSpecialist === true ? 1 : -1; // sort isICUSpecialist=true items first
  }
});

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
            {sortedData.map((data: any) => (
              <PractitionerListItem
                data={data}
                key={data.id}
                handleActionMenuClick={handleActionMenuClick}
              />
            ))}
          </table>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default PractitionerListTable;
