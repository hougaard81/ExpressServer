# Educational Express Server with SQLite
A lightweight and educational REST API implementation using Express.js and SQLite.

## Project Structure
```
.
├── config/
│   └── database.js
├── controllers/
│   └── userController.js
├── middleware/
│   └── errorHandler.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoutes.js
├── server.js
├── database.sqlite
├── .env
├── .gitignore
└── README.md
```

## Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
```

### 4. Start the Server
```bash
npm start
```

The server will run at `http://localhost:3000` by default.

## API Endpoints

### Users API

#### Get All Users
```http
GET /api/users
```

#### Get User by ID
```http
GET /api/users/:id
```

#### Create New User
```http
POST /api/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com"
}
```

### Health Check
```http
GET /health
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Error Responses

```json
{
    "success": false,
    "error": "Error message here"
}
```

Common HTTP Status Codes:
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Development Setup

### Required Dependencies
```bash
npm install express sqlite3 morgan helmet
```

### Development Dependencies
```bash
npm install --save-dev nodemon
```

### Add to package.json
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### For Development Mode
```bash
npm run dev
```

## Testing API Endpoints

### Using cURL

1. Create a User
```bash
curl -X POST \
  http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

2. Get All Users
```bash
curl http://localhost:3000/api/users
```

3. Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

### Using Postman
Import the following endpoints:
- GET `http://localhost:3000/api/users`
- GET `http://localhost:3000/api/users/:id`
- POST `http://localhost:3000/api/users`

## Common Issues

1. **Port Already in Use**
   ```bash
   lsof -i :3000  # Find process using port 3000
   kill -9 <PID>  # Kill the process
   ```

2. **Database File Permissions**
   ```bash
   chmod 666 database.sqlite  # Grant read/write permissions
   ```

3. **Missing Dependencies**
   ```bash
   rm -rf node_modules
   npm install
   ```

## Git Setup

### .gitignore
Create a `.gitignore` file:
```
node_modules/
.env
database.sqlite
*.log
```

## Security Notes
- Never commit `.env` files
- Keep database file out of version control
- Use environment variables for sensitive data
- Always validate input data

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.