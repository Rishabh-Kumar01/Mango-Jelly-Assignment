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

Import the provided Postman Collection to test the API endpoints. Necessary
payloads for testing the APIs in Postman:

## 1. Create a Comic Book

- **Method:** POST
- **URL:** `http://localhost:3000/api/comic-books`
- **Headers:**
  - Content-Type: application/json
- **Body (raw JSON):**
  ```json
  {
    "bookName": "Spider-Man: No Way Home",
    "authorName": "Peter Parker",
    "yearOfPublication": 2023,
    "price": 500,
    "discount": 10,
    "numberOfPages": 100,
    "condition": "new",
    "description": "The latest adventure of Spider-Man"
  }
  ```

## 2. Get All Comic Books

- **Method:** GET
- **URL:** `http://localhost:3000/api/comic-books`
- **Query Parameters (optional):**
  - page: 1 (default)
  - limit: 10 (default)
  - sort: {"price": 1} (for ascending) or {"price": -1} (for descending)
  - authorName: "Peter Parker" (for filtering)
  - yearOfPublication: 2023 (for filtering)
  - condition: "new" (for filtering)
  - price, discount, numberOfPages: support range queries

Examples with query parameters:

- Basic sorting and filtering:
  `http://localhost:3000/api/comic-books?page=1&limit=10&sort={"price":-1}&authorName=Peter Parker`
- Range query for price: `http://localhost:3000/api/comic-books?price=10,50`
- Minimum price: `http://localhost:3000/api/comic-books?price=10,`
- Maximum price: `http://localhost:3000/api/comic-books?price=,50`
- Combining multiple filters:
  `http://localhost:3000/api/comic-books?yearOfPublication=1999&condition=new&price=1000,2000&numberOfPages=100,`

## 3. Get a Specific Comic Book

- **Method:** GET
- **URL:** `http://localhost:3000/api/comic-books/:id` Replace `:id` with the
  actual ID of the comic book.

Example: `http://localhost:3000/api/comic-books/60d5ecb54d84b5a4e8b9f7a1`

## 4. Update a Comic Book

- **Method:** PUT
- **URL:** `http://localhost:3000/api/comic-books/:id` Replace `:id` with the
  actual ID of the comic book you want to update.
- **Headers:**
  - Content-Type: application/json
- **Body (raw JSON):**
  ```json
  {
    "price": 1000,
    "discount": 15,
    "condition": "used"
  }
  ```
  Note: Include only the fields you want to update. The `_id` field will be
  automatically removed if included.

## 5. Delete a Comic Book

- **Method:** DELETE
- **URL:** `http://localhost:3000/api/comic-books/:id` Replace `:id` with the
  actual ID of the comic book you want to delete.

## 6. Seed Database with Dummy Data

- **Method:** POST
- **URL:** `http://localhost:3000/api/comic-books/seed`
- **Query Parameters (optional):**
  - count: 50 (default)

Example with query parameter:
`http://localhost:3000/api/comic-books/seed?count=100`

---

## Testing Notes

1. Set the appropriate HTTP method for each request in Postman.
2. Enter the full URL, including any necessary ID or query parameters.
3. For POST and PUT requests, go to the "Body" tab, select "raw", and choose
   "JSON" from the dropdown. Then enter the JSON payload as provided above.
4. For GET requests with query parameters:
   - You can add them directly to the URL, or
   - Use the "Params" tab in Postman to enter them more easily.
5. For testing range queries on `price`, `discount`, and `numberOfPages`:
   - Use comma-separated values for ranges (e.g., `price=10,50`)
   - Use a trailing comma for minimum values (e.g., `price=10,`)
   - Use a leading comma for maximum values (e.g., `price=,50`)
6. After setting up each request, you can save them to a Postman collection for
   easy access and repeated testing.

Remember to start your server before testing these routes in Postman.

## Response Format

All responses will exclude the Mongoose version key (`__v`) for cleaner output.

## Error Handling

If a request is made to a non-existent route, the API will respond with a 404
status code and a JSON object containing the message "Route doesn't exist".
