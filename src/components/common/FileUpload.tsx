import * as React from 'react';
import AvatarEditor from 'react-avatar-editor';

import imgPlaceholder from '../../assets/images/userPlaceholder.jpg';
import PractitionerPayload from '../../domain/requests/PractitionerPayload';

interface FileUploadProps {
  practitionerData: PractitionerPayload;
  setPractitionerData: React.Dispatch<React.SetStateAction<PractitionerPayload>>;
}

const FileUpload = (props: FileUploadProps) => {
  const [image, setImage] = React.useState('');
  const [error, setError] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [editor, setEditor] = React.useState<any>(null);
  const [croppedImage, setCroppedImage] = React.useState('');
  const [showCropper, setShowCropper] = React.useState(false);

  const onFileChange = (event: any) => {
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
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const onCrop = () => {
    if (!editor) {
      setError('Editor not initialized');
      return;
    }
    setShowCropper(false);
    const canvas = editor.getImageScaledToCanvas().toDataURL();

    setCroppedImage(canvas);
    const file = base64StringToFile(canvas, fileName);
    props.setPractitionerData({ ...props.practitionerData, userImg: file });
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

          <input type="file" onChange={onFileChange} />
        </div>

        {image && showCropper && (
          <div className="image__container">
            <AvatarEditor
              ref={(ref) => setEditor(ref)}
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
