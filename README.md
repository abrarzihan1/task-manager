# Task Manager Web App

A web application that allows users to manage tasks efficiently, stay on top of their deadlines, and collaborate effectively. This application provides functionalities such as task creation, viewing tasks, updating task details, and managing task statuses.

![image](https://github.com/user-attachments/assets/745719b7-a0db-447d-8516-16e9bcca723b)

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Setup](#project-setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
3. [Database Setup](#database-setup)
4. [Features](#features)
5. [Contributing](#contributing)
6. [License](#license)

---

## Technologies Used

- **Frontend:**
    - React.js
    - React Router
    - Axios for HTTP requests
    - CSS for styling
- **Backend:**
    - Spring Boot (Java)
    - Spring Security (JWT for authentication)
    - Spring Data JPA (for database interaction)
    - PostgreSQL (for database)
- **Database:**
    - PostgreSQL
- **Authentication:**
    - JWT (JSON Web Tokens) for user authentication

---

## Project Setup

### Backend Setup

1. **Clone the Repository:**
   First, clone the project repository to your local machine:
   ```bash
   git https://github.com/abrarzihan1/task-manager-app.git
   ```

2. **Install Java and Dependencies:**
   Make sure you have Java 11 or above installed. You'll also need to set up **Maven** to manage dependencies.

   Install the necessary dependencies by running:
   ```bash
   mvn install
   ```

3. **Database Configuration:**
   Set up a **PostgreSQL** database on your machine. You can do this using the following commands:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE task_manager_db;
   CREATE USER task_manager_user WITH PASSWORD 'yourpassword';
   ALTER ROLE task_manager_user SET client_encoding TO 'utf8';
   ALTER ROLE task_manager_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE task_manager_user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE task_manager_db TO task_manager_user;
   ```

4. **Configure `application.properties`:**
   In the `src/main/resources/application.properties` file, configure the database URL, username, and password:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager_db
   spring.datasource.username=task_manager_user
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

   # JWT Configuration
   jwt.secret=your-secret-key
   jwt.expiration=3600 # 1 hour
   ```

5. **JWT Authentication Setup:**
    - The backend uses **JWT** for user authentication. The token is generated upon successful login and included in the Authorization header for subsequent requests.
    - The JWT token has an expiration time and is stored in local storage on the client side.

6. **Running the Backend:**
   Once the database is set up and your configuration is complete, you can run the backend by executing:
   ```bash
   mvn spring-boot:run
   ```

   The Spring Boot server will run on `http://localhost:8082`.

---

### Frontend Setup

1. **Install Node.js and NPM:**
   Make sure you have **Node.js** and **npm** installed on your local machine. You can download Node.js from [here](https://nodejs.org/).

2. **Install Dependencies:**
   Navigate to the project folder and install all the necessary npm packages:
   ```bash
   cd frontend
   npm install
   ```

3. **Configure the Backend API URL:**
   In your `src/utils/api.js` (or wherever your axios requests are initialized), set the backend API URL:
   ```javascript
   const apiUrl = "http://localhost:8082/api";
   ```

4. **JWT Token Handling:**
    - When logging in, the backend will return a JWT token. This token should be stored in `localStorage` or `sessionStorage` on the client side.
    - The frontend includes the JWT token in the Authorization header of each request:
   ```javascript
   axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
   ```

5. **Running the Frontend:**
   Start the development server for the frontend:
   ```bash
   npm start
   ```

   The frontend will be accessible at `http://localhost:3000`.

---

## Database Setup

1. **PostgreSQL Database:**
    - Make sure your PostgreSQL server is running.
    - The project uses PostgreSQL as the database.


---

## Features

- **User Authentication**: Register and login using JWT tokens.
    - JWT tokens are used to authenticate users and authorize access to protected routes.
- **Task Management**:
    - Create, view, update, and delete tasks.
    - View tasks sorted by due date, with priority-based color coding.
    - Filter tasks by status (e.g., Pending, In Progress, Completed).
- **Task Details**: View and edit detailed task information including description, due date, priority, and status.
- **Task Filtering**: Filter tasks to show only upcoming tasks, with the option to hide past tasks.

## Contributing

We welcome contributions to this project!

## License

This project is licensed under the MIT License.
