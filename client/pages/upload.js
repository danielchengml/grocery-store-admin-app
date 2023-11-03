import { useState } from 'react';
import Head from 'next/head';
import PhotoUpload from '../components/PhotoUpload';

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUploaded = file => {
    setUploadedFile(file);
  };

  return (
    <div>
      <Head>
        <title>Photo Upload</title>
      </Head>
      <h1>Upload a Photo</h1>
      <PhotoUpload onFileUploaded={handleFileUploaded} />
      {uploadedFile && (
        <div>
          <h2>Uploaded Photo Preview</h2>
          <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default Upload;