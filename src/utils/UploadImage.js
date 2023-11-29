const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dp6uypw0c/upload";
const CLOUDINARY_UPLOAD_PRESET = "gc6yg60l";

export const uploadImage = (imageOrUrl) => {
  const formData = new FormData();

  if (typeof imageOrUrl === 'string') {
      return fetch(imageOrUrl)
          .then((response) => response.blob())
          .then((blob) => {
              formData.append('file', blob);
              formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

              return uploadToCloudinary(formData);
          })
          .catch((err) => console.error(err));
  } else if (imageOrUrl instanceof File) {
      formData.append('file', imageOrUrl);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      return uploadToCloudinary(formData);
  } else {
      return Promise.reject('Invalid input: Please provide a URL or a file object');
  }
};

const uploadToCloudinary = (formData) => {
  return fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
  })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.error(err));
};

