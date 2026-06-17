export const uploadToCloudinary = async (file: File) => {
  console.log(
    "CLOUD_NAME:",
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );

  console.log(
    "UPLOAD_PRESET:",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log("CLOUDINARY RESPONSE:", data);

  if (!data.secure_url) {
    throw new Error(JSON.stringify(data));
  }

  return data.secure_url;
};