import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  // check validation errors
  if (!req.files?.avatar)
    throw new ApiError(400, "please upload profile picture");

  // check if username and email already exists
  const isUserNameExists = await User.findOne({ username });
  if (isUserNameExists) throw new ApiError(400, "username already exists");

  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) throw new ApiError(400, "email already exists");

  // upload avatar and cover image to cloudinary

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (avatarLocalPath) throw new ApiError(400, "avatar is required");

  const { secure_url: avatar } = await uploadOnCloudinary(avatarLocalPath);
  const { secure_url: coverImage } =
    await uploadOnCloudinary(coverImageLocalPath);

  const newUser = await User.create({
    name,
    username,
    email,
    password,
    avatar,
    coverImage,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "user registered successfully", newUser));
});

const getUser = asyncHandler(async (req, res, next) => {});

const updateUser = asyncHandler(async (req, res, next) => {});

const deleteUser = asyncHandler(async (req, res, next) => {});

export { registerUser, getUser, updateUser, deleteUser };
