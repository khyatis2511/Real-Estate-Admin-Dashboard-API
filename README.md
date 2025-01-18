
# Real Estate Admin Dashboard API

This README provides detailed information about 
the backend implementation of the Admin Dashboard for a real estate website.
The backend is built using **Node.js** and **Express** and handles core
functionality for user management, analytics, and activity tracking.

## **Features**

### **1. User Management**
- Approve or ban users:
  - Approve new users pending registration.
  - Ban or deactivate existing users.
- Endpoints for managing user status.

### **2. Website Analytics**
- Retrieve key metrics such as:
  - Daily and weekly active users.
  - Page views.
- (Optional) Integration with Google Analytics or other services for advanced metrics.

### **3. User Activity Tracking**
- Log user actions such as:
  - Login, logout.
  - Downloads.
  - Page views.
- Provide endpoints for fetching and filtering activity logs by date, user, or action type.

### **4. Security & Access Control**
- Implement role-based authentication:
  - Only admin users can access the dashboard.
- Middleware for securing routes.


## **Tech Stack**

### **Backend**
- Node.js
- Express.js
- TypeScript (for type safety)

### **Database**
- MongoDB (NoSQL)

### **Authentication**
- JSON Web Tokens (JWT) for secure authentication and authorization.


## **Installation**

### **Prerequisites**
- Node.js v22.13.0
- Yarn
- MongoDB database

### **Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/khyatis2511/Real-Estate-Admin-Dashboard-API.git
   ```
2. Navigate to the project directory:
   ```bash
   cd real-estate-admin-dashboard-api
   ```
3. Install dependencies:
   ```bash
   yarn or yarn install
   ```
4. Configure environment variables:
   - Create a `.env` file in the root directory with the following variables:

     ```plaintext
     PORT=3088
     DATABASE_URL=db-url
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```
5. Start the server in development mode:
   ```bash
   yarn run dev
   ```

6. Build and start for production:
   ```bash
   yarn run build
   yarn run start or yarn start
   ```


## **Folder Structure**

```plaintext
src/
├── modules/           # which includes controller, service and route file according to module
├── prisma/            # prisma setup and related files
├── models/            # Database schemas or models if required
├── middlewares/       # Authentication and other middlewares
├── services/          # Helper services, Configuration files
├── utils/             # Utility functions
├── server.ts          # Entry point
```


## **Scripts**

- `yarn run dev`: Starts the development server with live-reload.
- `yarn run build`: Compiles TypeScript into JavaScript.
- `yarn start`: Starts the production server.
- `yarn run lint`: Checks for linting issues using ESLint.
- `yarn run test`: Runs tests using Jest.


## **Contact**

For inquiries or support, contact: [khyatis2511@gmail.com]


