const mongoose = require("mongoose");
const {
  compositeKeyGenerator,
} = require("../../../Helper/compositeKeyGenerator");
const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    Album: {
      type: String,
    },
    releaseYear: {
      type: String,
    },
    coverImg: {
      secure_url: {
        type: String,
        // required: true,
      },
      public_id: {
        type: String,
      },
    },
    musicUrl: {
      type: String,
      required: true,
    },
    musicDetails: {
      type: String,
    },
    genre: {
      type: String,
    },
    compositeKey: {
      type: String,
    },
    duration: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// composite key created for uniqueness
musicSchema.pre("save", function (next) {
  this.compositeKey = compositeKeyGenerator.generateCompositKey({
    keyFor: "music",
    firstField: this.title,
    secondField: this.artist,
  });
  next();
});

const MusicModel = mongoose.model("music", musicSchema);

module.exports = MusicModel;
