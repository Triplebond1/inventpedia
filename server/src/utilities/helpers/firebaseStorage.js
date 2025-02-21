import bucket from "../firebase/firebaseConfig"; // Import configured Firebase bucket

// Function upload the image to Firebase
const uploadImageToFirebase = async (fileName, mainImageBuffer) => {
  // Upload full-size image to Firebase
  const imageFile = bucket.file(`images/${fileName}`);
  await imageFile.save(mainImageBuffer, {
    metadata: { contentType: "image/webp" },
    public: true,
  });

  const imageUrl = imageFile.publicUrl();


  return imageUrl; // Returns Firebase public URL for the image
};

const deleteImageFromFirebase = async (filename) => {
  // Delete from Firebase Storage
  const removeImage = await bucket.file(`images/${filename}`).delete();

  if (removeImage) {
    return true;
  } else {
    return false;
  }
};
module.exports = { uploadImageToFirebase, deleteImageFromFirebase };
