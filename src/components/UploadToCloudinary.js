const UploadToCloudinary = async (imageUri) => {
  try {
    const cloudName = 'dzdmlz9in'; // Reemplaza con tu nombre de Cloudinary
    const unsignedUploadPreset = 'AOF_CLOUD'; // Reemplaza con tu unsigned upload preset
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();

    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // Cambia el tipo según el tipo de archivo
      name: 'myImage',
    });
    formData.append('upload_preset', unsignedUploadPreset);

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.secure_url) {
        const imageUrl = responseData.secure_url;
        console.log('Imagen subida a Cloudinary:', imageUrl);
        return imageUrl;
      } else {
        console.log('Error al subir la imagen a Cloudinary');
        return null;
      }
    } else {
      console.log('Error al subir la imagen a Cloudinary:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    return null;
  }
};

export default UploadToCloudinary;