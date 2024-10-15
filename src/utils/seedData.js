import { faker } from "@faker-js/faker";
import ComicBook from "../models/ComicBook.js";

export const seedComicBooks = async (count = 50) => {
  const comicBooks = [];

  for (let i = 0; i < count; i++) {
    const comicBook = {
      bookName: faker.commerce.productName(),
      authorName: faker.person.fullName(),
      yearOfPublication: faker.number.int({ min: 1999, max: 2024 }),
      price: parseFloat(faker.commerce.price({ min: 500, max: 2000 })),
      discount: Math.floor(Math.random() * 50),
      numberOfPages: faker.number.int({ min: 100, max: 500 }),
      condition: faker.helpers.arrayElement(["new", "used"]),
      description: faker.lorem.paragraph(),
    };

    comicBooks.push(comicBook);
  }

  try {
    await ComicBook.insertMany(comicBooks);
    console.log(`${count} comic books have been seeded.`);
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
