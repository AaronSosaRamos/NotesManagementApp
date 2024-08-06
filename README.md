
# Notes Management Application

## 1. Description of Functionalities

The Notes Management Application is designed to help users efficiently manage their notes. It includes the following key features:

- **Create Notes**: Users can create new notes with a title, description, and categories.
- **View Notes**: A list of all active notes is displayed, allowing users to view the details of each note.
- **Edit Notes**: Users can update the content and categories of existing notes.
- **Archive Notes**: Notes that are no longer needed can be archived, helping to declutter the active notes list.
- **Unarchive Notes**: Archived notes can be restored to the active notes list.
- **Delete Notes**: Unwanted notes can be permanently deleted.
- **Category Management**: Users can create, view, edit, and delete categories. Each category can be assigned a unique color.
- **Search and Filter**: Notes can be searched by title and filtered by category for easy retrieval.
- **Authentication**: Secure login functionality with JWT tokens to ensure that only authorized users can access and manage the notes.

## 2. Technologies

The application uses the following technologies:

### Frontend (SPA)

- **Next.js**: Version 14.2.5 - A React framework for server-side rendering and generating static websites.
- **React**: Version 18 - A JavaScript library for building user interfaces.
- **React DOM**: Version 18 - Provides DOM-specific methods that can be used at the top level of a web app.
- **Tailwind CSS**: Version 2.2.19 - A utility-first CSS framework for rapidly building custom user interfaces.
- **React Hook Form**: Version 7.52.2 - A library for validating forms in React.
- **Axios**: Version 1.7.3 - A promise-based HTTP client for making API requests.
- **React Toastify**: Version 10.0.5 - A library for adding notifications to React applications.
- **Zod**: Version 3.23.8 - A TypeScript-first schema declaration and validation library.

### Backend (REST API)

- **NestJS**: Version 10.0.0 - A framework for building scalable and efficient server-side applications with Node.js.
- **TypeScript**: Version 4.4.4 - A strongly typed programming language that builds on JavaScript.
- **Knex.js**: Version 3.1.0 - A SQL query builder (Basic ORM) for Node.js.
- **PostgreSQL**: Version 16 - A powerful, open source object-relational database system.
- **bcrypt**: Version 5.1.1 - A library for hashing passwords.
- **jsonwebtoken**: Version 9.0.2 - A library for generating and verifying JSON Web Tokens (JWT).
- **class-validator**: Version 0.14.1 - A library for validating object properties in TypeScript.
- **dotenv**: Version 16.4.5 - A module that loads environment variables from a `.env` file into `process.env`.
- **Passport**: Version 0.7.0 - An authentication middleware for Node.js.
- **Passport-JWT**: Version 4.0.1 - A Passport strategy for authenticating with a JSON Web Token.
- **@nestjs/jwt**: Version 10.2.0 - A NestJS module for working with JSON Web Tokens.
- **@nestjs/passport**: Version 10.0.3 - A NestJS module for integrating Passport.
- **@nestjs/swagger**: Version 7.4.0 - A NestJS module for integrating Swagger for API documentation.
- **reflect-metadata**: Version 0.2.0 - A library that adds metadata reflection capabilities to TypeScript.
- **rxjs**: Version 7.8.1 - A library for reactive programming using observables.
- **@t3-oss/env-core**: Version 0.8.0 - A library for environment variable validation and type-safe access.
- **swagger-ui-express**: Version 5.0.1 - A library for serving auto-generated Swagger API documentation.

### Database

- **PostgreSQL**: Version 16 - Used for storing all application data, including users, notes, and categories.

### Containerization

- **Docker**: Version 26.0.0 - Used for containerizing the application and its services.
- **Docker Compose**: Version 2.29.1 - Used for defining and running multi-container Docker applications.

## 3. How to Implement

To set up and run the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Ensure that the `setup-and-run.sh` script is present in the root directory.
4. Run the following command to make the script executable and execute it:

```sh
chmod +x setup-and-run.sh && ./setup-and-run.sh
```

### Default Credentials

- **Email**: email@gmail.com
- **Password**: passw123ORD*

## 4. Internal Software Architecture

### Frontend Structure

The frontend is built using Next.js and follows a component-based architecture. The key components are:

- **Pages**: Each page corresponds to a route in the application.
  - **index.js**: The main page for viewing and managing notes.
  - **archived.js**: A page for viewing archived notes.
  - **categories.js**: A page for managing categories.
- **Components**: Reusable UI components.
  - **CreateNotesModal**: A modal for creating new notes.
  - **ListNotesComponent**: A component for listing notes.
  - **NoteDetailsModal**: A modal for viewing and editing note details.
  - **CreateCategoryModal**: A modal for creating new categories.
  - **CategoryListComponent**: A component for listing categories.

### Backend Structure

The backend is built using NestJS and follows a modular architecture with separation of concerns. The key modules and layers are:

#### Modules

- **Auth Module**: Manages authentication and JWT token generation.
- **Notes Module**: Manages CRUD operations for notes.
- **Categories Module**: Manages CRUD operations for categories.
- **Users Module**: Manages user-related operations.

#### Layers

- **Controllers**: Handle HTTP requests and responses.
  - **NotesController**: Manages routes for notes.
  - **CategoriesController**: Manages routes for categories.
  - **UsersController**: Manages routes for user authentication and management.
- **Services**: Contain business logic and interact with DAOs/repositories.
  - **NotesService**: Contains logic for handling notes-related operations.
  - **CategoriesService**: Contains logic for handling categories-related operations.
  - **UsersService**: Contains logic for handling user-related operations.
- **DAOs/Repositories**: Handle database interactions.
  - **NotesDao**: Manages database operations for notes.
  - **CategoriesDao**: Manages database operations for categories.
  - **UsersDao**: Manages database operations for users.

### Database Schema

The database schema consists of three main tables: `users`, `notes`, and `categories`.

- **users**
  - `id`: Auto-incrementing primary key
  - `email`: User's email address
  - `password`: User's hashed password

- **notes**
  - `id`: Auto-incrementing primary key
  - `userId`: Foreign key referencing `users.id`
  - `title`: Title of the note
  - `description`: Description of the note
  - `isArchived`: Boolean indicating if the note is archived
  - `created_at`: Timestamp of when the note was created
  - `updated_at`: Timestamp of when the note was last updated

- **categories**
  - `id`: Auto-incrementing primary key
  - `name`: Name of the category
  - `color`: Color associated with the category

- **notes_categories** (Join table)
  - `id`: Auto-incrementing primary key
  - `noteId`: Foreign key referencing `notes.id`
  - `categoryId`: Foreign key referencing `categories.id`