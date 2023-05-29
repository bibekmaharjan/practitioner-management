import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { formatDate } from '../utils/datetime';
import { DATE_FORMAT } from '../constants/date';
import Header from '../components/layout/Header';
import Loading from '../components/common/Loading';
import NotFound from '../components/common/NotFound';
import UserDetail from '../domain/responses/UserDetail';
import Breadcrumb from '../components/common/Breadcrumb';
import { fetchPractitionerDetails } from '../services/practitioner';

const PractitionerProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = React.useState<UserDetail>();
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsFetching(true);

    fetchPractitionerDetails(id).then(
      (d) => {
        setUserData(d.data);
        setHasError(false);
        setIsFetching(false);
      },
      (e) => {
        toast.error(e);
        setHasError(true);
        setIsFetching(false);
      }
    );
  }, []);

  return (
    <React.Fragment>
      <Header />
      {isFetching && <Loading />}
      {hasError && <NotFound />}
      {!isFetching && !hasError && (
        <section className="practitionerProfile">
          <Breadcrumb name={userData?.fullName} />
          <div className="practitionerProfile__wrapper">
            <div className="practitionerProfile__userInfo">
              <img src={userData?.userImg} alt="" className="practitionerProfile__userInfo-img" />
              <span className="text__title-lg mb-sm">{userData?.fullName}</span>
              <span className="text__label-muted">{userData?.email}</span>
            </div>
            <div className="practitionerProfile__userInfo-details">
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Gender</span>
                <span className="text__label">{userData?.gender}</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Birthday</span>
                <span className="text__label">{formatDate(userData?.dob, DATE_FORMAT)}</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Phone Number</span>
                <span className="text__label">{userData?.contact}</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Address</span>
                <span className="text__label">{userData?.address}</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">City</span>
                <span className="text__label">{userData?.city}</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Zip Code</span>
                <span className="text__label">{userData?.zipcode}</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Member Status</span>
                <span className="text__label">{userData?.status}</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Registered Date</span>
                <span className="text__label">Feb 24th 1997</span>
              </div>
              <div className="practitionerProfile__userInfo-details--info">
                <span className="text__label-muted mb-sm">Allergies</span>
                <span className="text__label">{userData?.allergies ? userData?.allergies : '-'}</span>
              </div>
            </div>
          </div>
        </section>
      )}
      <ToastContainer />
    </React.Fragment>
  );
};

export default PractitionerProfile;
