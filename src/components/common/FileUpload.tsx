import AvatarEditor from 'react-avatar-editor';
import React, { ChangeEvent, Dispatch, SetStateAction, useState, useRef } from 'react';

import imgPlaceholder from '../../assets/images/userPlaceholder.jpg';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';

interface FileUploadProps {
  practitionerData: PractitionerPayload;
  setPractitionerData: Dispatch<SetStateAction<PractitionerPayload>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ practitionerData, setPractitionerData }) => {
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const editorRef = useRef<AvatarEditor | null>(null);
  const [croppedImage, setCroppedImage] = useState('');
  const [showCropper, setShowCropper] = useState(false);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setShowCropper(true);
      const file = event.target.files[0];
      setFileName(file.name);
      const reader: any = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const base64StringToFile = (base64String: string, fileName: string) => {
    const arr: any = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const onCrop = () => {
    if (!editorRef.current) {
      setError('Editor not initialized');
      return;
    }
    setShowCropper(false);
    const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();

    setCroppedImage(canvas);
    const file = base64StringToFile(canvas, fileName);
    setPractitionerData({ ...practitionerData, userImg: file });
  };

  return (
    <>
      <div>
        <div className="practitionerActionForm__img-wrapper">
          <img
            src={croppedImage ? croppedImage : imgPlaceholder}
            alt="Cropped"
            className="practitionerActionForm__img"
          />

          <input type="file" onChange={onFileChange} accept="image/png, image/jpeg" />
        </div>

        {image && showCropper && (
          <div className="image__container">
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={250}
              height={250}
              border={50}
              borderRadius={0}
              color={[0, 0, 0, 0.6]}
              scale={1}
              rotate={0}
              className="image__cropper"
            />
            <button onClick={onCrop} className="btn__primary image__cropBtn">
              Crop Image
            </button>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default FileUpload;
