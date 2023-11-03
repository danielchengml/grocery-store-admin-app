import React, { useState } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // not working
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    // const res = await fetch('/api/image/upload', {
    //   method: 'PUT',
    //   formData: formData
    // });
    // const data = await res.json()
    // console.log("data$$$", data)
  }

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
          <button onClick={() => uploadImage(selectedImage)}>Upload</button>
        </div>
      )}

      <br />
      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;