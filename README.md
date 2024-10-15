# Comic Book Store API

This is a backend for a Comic Book Store

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/Rishabh-Kumar01/Mango-Jelly-Assignment.git
   cd Mango-Jelly-Assignment
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/comic-book-store
   ```

4. Start the server:

   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/comic-books/seed`: Seed the database with dummy data
- `POST /api/comic-books`: Create a new comic book
- `GET /api/comic-books`: Get all comic books (with pagination, filtering, and
  sorting)
- `GET /api/comic-books/:id`: Get a specific comic book by ID
- `PUT /api/comic-books/:id`: Update a comic book
- `DELETE /api/comic-books/:id`: Delete a comic book

### Seeding Data

To seed the database with dummy data, send a POST request to
`/api/comic-books/seed`. You can specify the number of comic books to create by
adding a `count` query parameter, e.g., `/api/comic-books/seed?count=100`. If no
count is specified, it will create 50 comic books by default.

## Testing

Import the provided Postman Collection to test the API endpoints.
