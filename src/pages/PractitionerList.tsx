import * as React from 'react';

import Header from '../components/layout/Header';
import PractitionerPayload from '../domain/requests/PractitionerPayload';
import PractitionerListTable from '../components/common/PractitionerListTable';

const PractitionerList = () => {
  const [isActionMenu, setIsActionMenu] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<PractitionerPayload[]>([]);

  return (
    <>
      <Header />
      <section className="practitionerList">
        <div className="practitionerList__menu">
          <div className="practitionerList__menu-wrapper">
            <div className="practitionerList__menu-item mr-md pr-md">
              <span className="text__title-lg--color mr-sm">{userData?.length}</span>
              <span className="text__label-muted">practitioners</span>
            </div>
          </div>
          <div className="btn__wrapper">
            <button className="btn btn__primary" onClick={() => setIsActionMenu(true)}>
              Add Practitioner
            </button>
          </div>
        </div>
        <PractitionerListTable
          setUserData={setUserData}
          userData={userData}
          setIsActionMenu={setIsActionMenu}
          isActionMenu={isActionMenu}
        />
      </section>
    </>
  );
};

export default PractitionerList;
