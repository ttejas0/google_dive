# Google Drive Clone

This is a Google Drive Clone built using Next.js, Clerk, and SingleStore.

## Features

- User Authentication using Clerk
- File Upload using UploadThing
- File Storage using SingleStore
- File Management using Drizzle ORM
- File Display using Shadcn UI

## Setup

- Clone the repository
- Install dependencies
- Set up environment variables in the .env file
- Run the development server

### Example .env file

```bash
DATABASE_URL="db_url"

SINGLESTORE_USER="user"
SINGLESTORE_PASS="password"
SINGLESTORE_HOST="example.svc.singlestore.com"
SINGLESTORE_PORT="3333"
SINGLESTORE_DB_NAME="DB_NAME"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="clerk_publishable_key"
CLERK_SECRET_KEY="clerk_secret_key"

UPLOADTHING_TOKEN="uploadthing_token"
```

```bash
npm install
npm run dev
```
