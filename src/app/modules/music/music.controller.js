const httpStatus = require("http-status");
const catchAsyncError = require("../../../ErrorHandler/catchAsyncError");
const sendResponse = require("../../../shared/sendResponse");
const musicServices = require("./music.service");
const musicValidationSchema = require("./music.validation");
const ErrorHandler = require("../../../ErrorHandler/errorHandler");
const pick = require("../../../shared/pick");
const musicConstant = require("./music.constant");
const paginationFields = require("../../../constant/pagination");

const createMusic = catchAsyncError(async (req, res) => {
  const { music_file, cover_image } = req.files;

  if (music_file[0] || cover_image[0]) {
    req.body.coverImg = {
      secure_url: cover_image[0]?.path,
      public_id: cover_image[0]?.filename,
    };
    req.body.musicUrl = music_file[0]?.path;
  }

  const { error } = musicValidationSchema.validate(req.body);
  if (error) {
    throw new ErrorHandler(error, httpStatus.BAD_REQUEST);
  }
  const result = await musicServices.createMusicIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Music created successfully",
    data: {
      result,
    },
  });
});

// get music
const getAllMusic = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, musicConstant.musicFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await musicServices.getAllMusicFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get all music  successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleMusic = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const result = await musicServices.singleMusicFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get  music  successfully",

    data: result.data,
  });
});

const musicController = {
  createMusic,
  getAllMusic,
  getSingleMusic,
};
module.exports = musicController;
