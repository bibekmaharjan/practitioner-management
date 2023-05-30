import * as React from 'react';

import classnames from 'classnames';

interface DeleteConfirmModalProps {
  isDeleting: boolean;
  id: number | undefined;
  setIsModalVisible: (state: boolean) => void;
  deleteUserData: (id: number | undefined) => void;
}

const DeleteConfirmModal = (props: DeleteConfirmModalProps) => {
  const { id, deleteUserData, setIsModalVisible, isDeleting } = props;

  const btnClassName = classnames('btn mr-md', {
    btn__danger: !isDeleting,
    btn__progress: isDeleting,
  });

  return (
    <>
      <div className="modal__container">
        <div className="modal">
          <div className="disp-flex flex-col flex-center">
            <span className="text__title-lg mb-sm">Are you sure?</span>
            <span className="text__sm mb-md">
              Do you really want to delete the practitioner? This process cannot be undone.
            </span>
            <div className="disp-flex">
              <button className={btnClassName} disabled={isDeleting} onClick={() => deleteUserData(id)}>
                Delete
              </button>
              <button className="btn btn__primary" disabled={isDeleting} onClick={() => setIsModalVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmModal;
