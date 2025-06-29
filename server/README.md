# OnlyFans Clone Backend

This is the backend server for the OnlyFans clone application, built with Express.js, MongoDB, and AWS S3.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/onlyfans-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_S3_BUCKET=your-s3-bucket-name
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/verify-profile` - Verify creator profile (requires authentication)

### Content Management
- POST `/api/content/posts` - Create a new post (requires creator role)
- PUT `/api/content/posts/:postId` - Update a post (requires creator role)
- DELETE `/api/content/posts/:postId` - Delete a post (requires creator role)
- GET `/api/content/posts/:postId` - Get a specific post
- GET `/api/content/creator/posts` - Get creator's posts (requires creator role)

## Features

- User authentication with JWT
- Role-based access control (Creator/Subscriber)
- Profile verification for creators
- Content management with media uploads
- Private content with purchase system
- AWS S3 integration for media storage

## Dependencies

- express
- mongoose
- jsonwebtoken
- bcryptjs
- multer
- aws-sdk
- cors
- dotenv 