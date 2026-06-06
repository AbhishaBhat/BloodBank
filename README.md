# Blood Bank Using MERN

Blood Bank is a web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to manage blood donation activities with three roles: admin, donor, and hospital.

## Features

- **User Roles:**
  - Admin: Manages donor and hospital accounts and monitors inventory.
  - Donor: Registers as a blood donor, adds blood donation records, and views donation logs.
  - Hospital: Consumes available blood inventory and tracks usage records.

- **Authentication:**
  - JWT (JSON Web Tokens) are used for secure authentication.
  - Passwords are encrypted using a bycrypt library.

- **Frontend:**
  - Developed using React.js for a dynamic and responsive user interface.
  - State management is handled using Redux Toolkit.
  - Bootstrap for styling.

- **Backend:**
  - Built with Node.js and Express.js, following the MVC (Model-View-Controller) architecture.
  - MongoDB is used as the database with Mongoose for data modeling.
  - Axios and Cors for handling cross origin request and responses.
  - Morgan and colors for error log handling.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database.

### Installation

1. **Backend:**
   ```bash
   npm install
   ```
   Configure the MongoDB connection in config/db.js.
2. **FrontEnd:**
   ```bash
   cd client
   npm install
   ```
### Running the Application
In root directory
```bash
npm start
```
The React app will be accessible at http://localhost:3000.

### Note:
#### Set your .env
- Frontend:
  REACT_APP_BASEURL = http://localhost:8080/api/v1
- Backend:
  JWT_SECRET, MONGO_URL, DEV_MODE = development, PORT = 8080

### Deployment
- Backend: Deployed on Render.
- Frontend: Deployed on Netlify.

## Screenshots
![Alt text](screenshots/blood.png "1")
![Alt text](screenshots/blood1.png "2")
![Alt text](screenshots/blood2.png "3")
