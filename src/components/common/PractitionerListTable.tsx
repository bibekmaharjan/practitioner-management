import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Loading from './Loading';
import NotFound from './NotFound';
import PractitionerListItem from './PractitionerListItem';
import PractitionerActionForm from './PractitionerActionForm';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';
import PractitionerResponse from '../../domain/responses/PractitionerResponse';
import { addPractitioner, editPractitioner, fetchPractitioners } from '../../services/practitioner';

interface PractitionerListTableProps {
  isActionMenu: boolean;
  userData: PractitionerPayload[];
  setIsActionMenu: (isMenuVisible: boolean) => void;
  setUserData: (data: PractitionerPayload[]) => void;
}

const PractitionerListTable = (props: PractitionerListTableProps) => {
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [editData, setEditData] = React.useState<PractitionerPayload | undefined>(undefined);

  const fetchUserData = () => {
    setIsFetching(true);
    fetchPractitioners().then(
      (d: PractitionerResponse) => {
        props.setUserData(d.data);
        setIsFetching(false);
        setHasError(false);
      },
      (e) => {
        toast.error(e);
        setHasError(true);
        setIsFetching(false);
      }
    );
  };

  const addUserData = (practitionerData: PractitionerPayload) => {
    addPractitioner(practitionerData).then(
      () => {
        fetchUserData();
        toast.success('Practitioner added successfully');
      },
      (e) => {
        console.log(e);
        toast.error('Practitioner could not be added');
      }
    );
  };

  const editUserData = (id: number) => {
    if (props.userData) {
      const selectedEdit: PractitionerPayload | undefined = props.userData.find(
        (el: PractitionerPayload) => el.id === id
      );
      setEditData(selectedEdit);
    }
  };

  const handleUserEdit = (userData: PractitionerPayload, id: number | undefined) => {
    if (id) {
      editPractitioner(userData, id).then(
        () => {
          fetchUserData();
          toast.success('Practitioner edited successfully');
        },
        (e) => {
          console.log(e);
          toast.error('Practitioner could not be edited');
        }
      );
    }
  };

  const handleActionMenuClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();
    props.setIsActionMenu(true);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const sortedData: PractitionerPayload[] = props.userData.sort((a, b) => {
    if (a.isICUSpecialist === b.isICUSpecialist) {
      return a.fullName.localeCompare(b.fullName); // if isICUSpecialist is the same, sort by name
    } else {
      return b.isICUSpecialist ? 1 : -1; // sort isICUSpecialist=true items first
    }
  });

  return (
    <>
      {isFetching && <Loading />}
      {hasError && <NotFound />}
      {!isFetching && !hasError && (
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
            {sortedData.map((data: PractitionerPayload) => (
              <PractitionerListItem
                data={data}
                key={data.id}
                editUserData={editUserData}
                fetchUserData={fetchUserData}
                handleActionMenuClick={handleActionMenuClick}
              />
            ))}
          </table>
          {props.isActionMenu && (
            <PractitionerActionForm
              editData={editData}
              setEditData={setEditData}
              handleUserEdit={handleUserEdit}
              addUserData={addUserData}
              setIsVisible={props.setIsActionMenu}
            />
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default PractitionerListTable;
