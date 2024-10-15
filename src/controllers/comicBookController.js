import ComicBook from "../models/ComicBook.js";
import { seedComicBooks } from "../utils/seedData.js";

// Seed the database with comic books
export const seedData = async (req, res, next) => {
  try {
    const count = parseInt(req.query.count) || 50;
    await ComicBook.deleteMany({});
    await seedComicBooks(count);
    res.json({ message: `${count} comic books have been seeded.` });
  } catch (error) {
    next(error);
  }
};

// Create a new comic book
export const createComicBook = async (req, res, next) => {
  try {
    const comicBook = new ComicBook(req.body);
    await comicBook.save();
    res.status(201).json(comicBook);
  } catch (error) {
    next(error);
  }
};

// Get all comic books with pagination, filtering, and sorting
export const getComicBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, ...filters } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: sort ? JSON.parse(sort) : { createdAt: -1 },
    };

    const query = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "price" || key === "discount" || key === "numberOfPages") {
          const [min, max] = filters[key].split(",");
          query[key] = {};
          if (min !== "") query[key].$gte = parseFloat(min);
          if (max !== "" && max !== undefined)
            query[key].$lte = parseFloat(max);

          if (Object.keys(query[key]).length === 0) delete query[key];
        } else if (key === "yearOfPublication") {
          query[key] = { $eq: parseInt(filters[key]) };
        } else {
          query[key] = { $regex: filters[key], $options: "i" };
        }
      }
    });

    const comicBooks = await ComicBook.find(query)
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const total = await ComicBook.countDocuments(query);

    res.json({
      comicBooks,
      totalPages: Math.ceil(total / options.limit),
      currentPage: comicBooks.length > 0 ? options.page : 0,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single comic book by ID
export const getComicBook = async (req, res, next) => {
  try {
    const comicBook = await ComicBook.findById(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ message: "Comic book not found" });
    }
    res.json(comicBook);
  } catch (error) {
    next(error);
  }
};

// Update a comic book
export const updateComicBook = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (updateData._id) {
      delete updateData._id;
    }

    const comicBook = await ComicBook.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!comicBook) {
      return res.status(404).json({ message: "Comic book not found" });
    }
    res.json(comicBook);
  } catch (error) {
    next(error);
  }
};

// Delete a comic book
export const deleteComicBook = async (req, res, next) => {
  try {
    const comicBook = await ComicBook.findByIdAndDelete(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ message: "Comic book not found" });
    }
    res.json({ message: "Comic book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
