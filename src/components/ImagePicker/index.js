import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Container } from './styles';

function ImagePicker({ onChangeFile, inputRef }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState();

  useEffect(() => {
    if (inputRef)
      inputRef.current = {
        reset: () => setImagePreviewUrl(null),
      };
  }, [inputRef]);

  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const [imageFile] = e.target.files;

    reader.onloadend = () => {
      onChangeFile(imageFile);
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

ImagePicker.defaultProps = {
  inputRef: null,
};

ImagePicker.propTypes = {
  onChangeFile: PropTypes.func.isRequired,
  inputRef: PropTypes.shape({
    current: PropTypes.shape({}),
  }),
};

export default ImagePicker;
