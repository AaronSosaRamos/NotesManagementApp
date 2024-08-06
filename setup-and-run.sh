#!/bin/bash

# Create the .env.local file for the frontend
cat <<EOL > ./frontend/.env.local
NODE_ENV=development
PORT=3000
EOL

echo "Created ./frontend/.env.local with the following contents:"
cat ./frontend/.env.local

# Create the .env file for the backend
cat <<EOL > ./backend/.env
NODE_ENV=development
PORT=3001

ALLOWED_UI_DOMAINS=http://localhost:3000

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=notes-management-db

EMAIL=email@gmail.com
PASSWORD=passw123ORD*

JWT_SECRET=secret
EOL

echo "Created ./backend/.env with the following contents:"
cat ./backend/.env

# Run docker-compose up --build
docker-compose up --build
