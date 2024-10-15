import mongoose from "mongoose";

const comicBookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    yearOfPublication: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    numberOfPages: {
      type: Number,
      required: true,
      min: 1,
    },
    condition: {
      type: String,
      required: true,
      enum: ["new", "used"],
      default: "new",
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const ComicBook = mongoose.model("ComicBook", comicBookSchema);

export default ComicBook;
