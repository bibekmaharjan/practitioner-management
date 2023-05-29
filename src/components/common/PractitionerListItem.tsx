import * as React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '../../utils/datetime';
import DeleteConfirmModal from './DeleteConfirmModal';
import dotsIcon from '../../assets/images/dots-icon.png';
import { deletePractitioner } from '../../services/practitioner';
import { DATETIME_FORMAT, DATE_FORMAT } from '../../constants/date';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';

interface PractitionerListItemProps {
  data: PractitionerPayload;
  fetchUserData: () => void;
  editUserData: (id: number) => void;
  handleActionMenuClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const PractitionerListItem: React.FC<PractitionerListItemProps> = ({
  data,
  editUserData,
  fetchUserData,
  handleActionMenuClick,
}) => {
  const [isMenu, setIsMenu] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const navigate = useNavigate();

  const onRowClick = () => {
    navigate(`/profile/${data.id}`);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenu(!isMenu);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsMenu(!isMenu);

    if (data.id) {
      editUserData(data.id);
    }

    handleActionMenuClick(e);
  };

  const deleteUserData = async (id: number | undefined) => {
    if (id) {
      try {
        setIsDeleting(true);
        await deletePractitioner(id);
        await fetchUserData();
        toast.success('Practitioner deleted successfully');
      } catch (error) {
        toast.error('Sorry, the action cannot be completed');
      } finally {
        setIsDeleting(false);
        setIsModalVisible(false);
      }
    } else {
      toast.error('Practitioner id not found.');
      setIsDeleting(false);
      setIsModalVisible(false);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsMenu(false);
    setIsModalVisible(true);
  };

  return (
    <>
      <tr className="practitionerListTable__row" onClick={onRowClick}>
        <td className="practitionerListTable__userInfo">
          <img src={data.userImg as string} alt="user-profile" className="practitionerListTable__userInfo-img" />
          <div className="practitionerListTable__userInfo-wrapper">
            <span className="text__title-med">{data.fullName}</span>
            <span className="text__sm--mute">{data.email}</span>
          </div>
        </td>
        <td>
          <span className="text__label">{data.contact}</span>
        </td>
        <td>
          <span className="text__label">{formatDate(data.dob, DATE_FORMAT)}</span>
        </td>
        <td>
          <span className="text__label">{formatDate(data.startTime, DATETIME_FORMAT)}</span>
        </td>
        <td>
          <span className="text__label">{formatDate(data.endTime, DATETIME_FORMAT)}</span>
        </td>
        <td>
          <span className="text__label disp-flex flex-center">
            {data.isICUSpecialist ? (
              <div className="status status__true"></div>
            ) : (
              <div className="status status__false"></div>
            )}
          </span>
        </td>
        <td className="practitionerListTable__userInfo-dotsMenu--container">
          <img
            src={dotsIcon}
            onClick={handleMenuClick}
            className="practitionerListTable__userInfo-dotsIcon"
            alt="menu-icon"
          />
          {isMenu && (
            <div className="practitionerListTable__userInfo-dotsMenu">
              <span className="text__label-muted" onClick={(e) => handleEditClick(e)}>
                Edit Practitioner
              </span>
              <span className="text__label-muted" onClick={handleDelete}>
                Delete Practitioner
              </span>
            </div>
          )}
        </td>
      </tr>
      {isModalVisible && (
        <DeleteConfirmModal
          id={data.id}
          deleteUserData={deleteUserData}
          setIsModalVisible={setIsModalVisible}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};

export default PractitionerListItem;
