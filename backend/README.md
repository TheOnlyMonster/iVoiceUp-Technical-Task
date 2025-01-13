# HR System Backend

## Instructions to Run the Server

### Steps

1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Set up environment variables:**
  - Create a `.env.dev` file in the root directory.
  - Add the following environment variables:
    ```env
    MONGODB_URI=<your-mongodb-uri>
    ACCESS_TOKEN_SECRET=<your-access-token-secret>
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    ACCESS_TOKEN_EXPIRATION=1h
    REFRESH_TOKEN_EXPIRATION=7d
    PAYLOAD_LIMIT=10kb
    PORT=5000
    ```

3. **Seed the database:**

  ```sh
  npm run seed
  ```

4. **Start the server:**
  ```sh
  npx nodemon
  ```

