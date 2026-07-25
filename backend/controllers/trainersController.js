const { getTrainers, insertTrainer } = require("../db/queries");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await getTrainers();
    return res
      .status(200)
      .json({ message: "trainers fetched successfully", trainers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addTrainer = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }

    const {
      firstName,
      lastName,
      phone,
      email,
      specialization,
      salary,
      joiningDate,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Select a photo" });
    }
    const localPath = req.file.path;

    const uploadedPhoto = await uploadOnCloudinary(localPath);
    if (!uploadedPhoto) {
      return res
        .status(400)
        .json({ message: "photo not uploaded! please try again!" });
    }
    const profileImageURL = uploadedPhoto.secure_url;
    const profileImagePublicId = uploadedPhoto.public_id;

    const trainer = await insertTrainer(
      firstName,
      lastName,
      phone,
      email,
      specialization,
      salary,
      joiningDate,
      profileImageURL,
      profileImagePublicId,
    );
    return res
      .status(201)
      .json({ message: "trainer added successfully", trainer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllTrainers, addTrainer };
