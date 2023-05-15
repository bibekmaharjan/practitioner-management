import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import dotsIcon from '../../assets/images/dots-icon.png';
import { DATETIME_FORMAT, DATE_FORMAT } from '../../constants/date';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';
import { formatDate } from '../../utils/datetime';

interface PractitionerListItemProps {
  data: PractitionerPayload;
  editUserData: (id: number) => void;
  deleteUserData: (id: number) => void;
  handleActionMenuClick: (e: any) => void;
}

const PractitionerListItem = (props: PractitionerListItemProps) => {
  const { data } = props;

  const navigate = useNavigate();
  const [isMenu, setIsMenu] = React.useState(false);

  const onRowClick = () => {
    navigate(`/profile/${data.id}`);
  };

  const handleMenuClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenu(!isMenu);
  };

  const handleEditClick = (e: any) => {
    setIsMenu(!isMenu);

    if (data.id) {
      props.editUserData(data.id);
    }

    props.handleActionMenuClick(e);
  };

  const handleDelete = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (data.id) {
      props.deleteUserData(data.id);
    }
  };

  return (
    <>
      <tr className="practitionerListTable__row" onClick={onRowClick}>
        <td className="practitionerListTable__userInfo">
          <img src={data.userImg as string} alt="" className="practitionerListTable__userInfo-img" />
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
          <img src={dotsIcon} onClick={handleMenuClick} className="practitionerListTable__userInfo-dotsIcon" alt="" />
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
    </>
  );
};

export default PractitionerListItem;
