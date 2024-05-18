import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJwtToken = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers?.["Authorization"]?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "unauthorized request");

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) throw new ApiError(401, "invalid token");

  req.user = user;
  next();
});

export { verifyJwtToken };
