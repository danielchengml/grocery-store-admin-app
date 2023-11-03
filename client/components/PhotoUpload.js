import { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

const PhotoUpload = ({ onFileUploaded }) => {
  const fileInputRef = useRef(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]; // Assuming you only want to upload a single photo

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('photo', file);

    // Make a POST request to your API endpoint here
    fetch('/api/image/upload', {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        onFileUploaded(data); // Pass any response data to your parent component
      })
      .catch(error => {
        console.error('Error uploading photo:', error);
      });
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Allow only image files
  });

  const handleManualUpload = () => {
    fileInputRef.current.click(); // Trigger the file input
  };

  const handleFileInputChange = event => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      // Make a POST request to your API endpoint here
      fetch('/api/upload', {
        method: 'PUT',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          onFileUploaded(data); // Pass any response data to your parent component
        })
        .catch(error => {
          console.error('Error uploading photo:', error);
        });
    }
  };

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop a photo here, or click to select one</p>
      </div>
      <button onClick={handleManualUpload}>Upload Photo</button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default PhotoUpload;