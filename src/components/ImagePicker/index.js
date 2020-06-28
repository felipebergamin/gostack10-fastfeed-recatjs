import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';

import { Container } from './styles';

function ImagePicker() {
  const [file, setFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();

  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const [imageFile] = e.target.files;

    reader.onloadend = () => {
      setFile(imageFile);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <Container>
      {imagePreviewUrl ? (
        <img src={imagePreviewUrl} alt="Avatar" />
      ) : (
        <>
          <FaImage size="2rem" />
          <label htmlFor="avatar">
            Adicionar Foto
            <input
              onChange={handleImageChange}
              className="fileinput"
              name="avatar"
              id="avatar"
              type="file"
            />
          </label>
        </>
      )}
    </Container>
  );
}

export default ImagePicker;
