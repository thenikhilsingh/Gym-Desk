const {
  getTrainers,
  insertTrainer,
  getTrainerById,
  updateTrainer,
  toggleTrainerActiveStatus,
  trainersStatCardDetails,
} = require("../db/queries");
const { uploadOnCloudinary, cloudinary } = require("../utils/cloudinary");

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

const editTrainer = async (req, res) => {
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

    const { trainerId } = req.params;

    let profileImageURL = null;
    let profileImagePublicId = null;
    const existingTrainer = await getTrainerById(trainerId);
    if (!existingTrainer) {
      return res.status(404).json({ message: "trainer not found" });
    }
    if (req.file) {
      const localPath = req.file.path;
      const uploadedPhoto = await uploadOnCloudinary(localPath);
      // Delete previous image if it exists
      if (existingTrainer.profile_image_public_id) {
        await cloudinary.uploader.destroy(
          existingTrainer.profile_image_public_id,
        );
      }
      profileImageURL = uploadedPhoto.secure_url;
      profileImagePublicId = uploadedPhoto.public_id;
    }

    const trainer = await updateTrainer(
      trainerId,
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
    return res.status(200).json({
      message: "Trainer updated successfully",
      trainer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTrainerDetails = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const trainer = await getTrainerById(trainerId);
    return res.status(200).json({
      message: "Trainer fetched successfully",
      trainer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const toggleTrainerStatus = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }
    const { status } = req.body;
    const { trainerId } = req.params;
    const toggle = await toggleTrainerActiveStatus(trainerId, status);
    return res.status(200).json({
      message: "Trainer status updated successfully",
      toggle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTrainersStats = async (req, res) => {
  try {
    const stats = await trainersStatCardDetails();
    return res.status(200).json({
      message: "Trainer status fetched successfully",
      stats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllTrainers,
  addTrainer,
  editTrainer,
  getTrainerDetails,
  toggleTrainerStatus,
  getTrainersStats,
};
