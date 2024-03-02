const httpStatus = require("http-status");
const ErrorHandler = require("../../../ErrorHandler/errorHandler");
const {
  compositeKeyGenerator,
} = require("../../../Helper/compositeKeyGenerator");
const MusicModel = require("./music.model");
const { paginationHelpers } = require("../../../Helper/paginationHelper");
const { searchHelper } = require("../../../Helper/searchHelper");
const musicConstant = require("./music.constant");
const { filteringHelper } = require("../../../Helper/filteringHelper");
const { sortingHelper } = require("../../../Helper/sortingHelper");

const createMusicIntoDB = async (payload) => {
  const { title, artist } = payload;
  //   generate compositeKey for checking
  const compositeKey = compositeKeyGenerator.generateCompositKey({
    keyFor: "music",
    firstField: title.trim(),
    secondField: artist.trim(),
  });
  // checking already available or not
  const isExist = await MusicModel.findOne({
    compositeKey: compositeKey,
  });
  if (isExist) {
    throw new ErrorHandler(
      `${isExist.title} this Music already exist!`,
      httpStatus.CONFLICT
    );
  }

  const music = new MusicModel(payload);
  const newMusic = await music.save();

  return newMusic;
};

//  get all music
const getAllMusicFromDB = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const pipeline = [];
  const totalPipeline = [{ $count: "count" }];
  const matchAnd = [];

  //?Dynamic search added
  const dynamicSearchQuery = searchHelper.createSearchQuery(
    searchTerm,
    musicConstant.musicSearchableFields
  );

  if (dynamicSearchQuery) {
    matchAnd.push(dynamicSearchQuery);
  }
  // ? Dynamic filtering added
  const dynamicFilter = filteringHelper.createDynamicFilter(filtersData);

  if (dynamicFilter) {
    matchAnd.push(dynamicFilter);
  }
  if (skip) {
    pipeline.push({ $skip: skip });
  }

  if (limit) {
    pipeline.push({ $limit: limit });
  }

  // sorting
  const dynamicSorting = sortingHelper.createDynamicSorting(sortBy, sortOrder);

  if (dynamicSorting) {
    pipeline.push({
      $sort: dynamicSorting,
    });
  }

  if (matchAnd.length) {
    pipeline.unshift({
      $match: { $and: matchAnd },
    });
    totalPipeline.unshift({
      $match: { $and: matchAnd },
    });
  }
  console.log("matchAnd:", matchAnd);
  console.log("pipeline:", pipeline);
  const result = await MusicModel.aggregate(pipeline);
  const total = await MusicModel.aggregate(totalPipeline);

  return {
    meta: {
      page,
      limit,
      total: total[0]?.count,
    },
    data: result,
  };
};

const singleMusicFromDB = async (id) => {
  const result = await MusicModel.findById(id);
  return {
    data: result,
  };
};
const musicServices = {
  createMusicIntoDB,
  getAllMusicFromDB,
  singleMusicFromDB,
};

module.exports = musicServices;
