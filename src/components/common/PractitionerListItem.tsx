import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { formatDate } from '../../utils/datetime';
import dotsIcon from '../../assets/images/dots-icon.png';
import { DATETIME_FORMAT, DATE_FORMAT } from '../../constants/date';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';

interface PractitionerListItemProps {
  data: PractitionerPayload;
  handleActionMenuClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const PractitionerListItem = ({ data, handleActionMenuClick } : PractitionerListItemProps) => {

  const [isMenu, setIsMenu] = React.useState(false);

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
   
    handleActionMenuClick(e);
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();

   
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
          <img src={dotsIcon} onClick={handleMenuClick} className="practitionerListTable__userInfo-dotsIcon" alt="menu-icon" />
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
