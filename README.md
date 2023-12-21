## Introduction

This project, `nodejs_mongodb_wc_showCase_auth_HS256`, is a Node.js application that showcases user authentication and data management using MongoDB. It utilizes the HS256 algorithm for secure authentication.

## Installation

Before running the project, ensure you have Node.js installed. Then, install the necessary dependencies:


``` 
npm install bcrypt --save 
npm install crypto --save    
npm install jsonwebtoken --save 
npm install lodash --save
````

## Usage

The project consists of several modules and services, each handling different aspects of the application.

### Access Service (`./services/access.service.js`)

The Access Service is responsible for user authentication, including signup processes. It uses bcrypt for password hashing and crypto for generating public and private keys.

### Models

- **Shop Model** (`./models/shop.model.js`): Manages the shop data within the MongoDB database.

### Utilities

- **Lodash Utility** (`./utils/index.js`): Provides utility functions such as `getInfoData` for handling data extraction.

### Controllers

- **Access Controller** (`./controllers/access.controller.js`): Manages the access routes and authentication logic.

### Routes

- **Access Routes** (`./routes/access.route.js`): Defines routes for user access and authentication.

### Authentication and Token Management

- **Auth Utils** (`./auth/authUtils.js`): Contains utilities for token generation and authentication.
- **KeyToken Service** (`./services/keyToken.service.js`): Manages token creation and validation.
- **KeyToken Model** (`./models/keyToken.model.js`): Schema for storing key tokens in MongoDB.

### Additional Notes

- The project uses destructuring assignment in JavaScript for cleaner and more efficient code.
- MongoDB is used as the database, storing shop data and public keys.
- The application follows a modular architecture for easy maintenance and scalability.](<# Node.js MongoDB Showcase with Authentication (HS256)

## Introduction

This project, `nodejs_mongodb_wc_showCase_auth_HS256`, is a Node.js application that showcases user authentication and data management using MongoDB. It utilizes the HS256 algorithm for secure authentication.

## Installation

Before running the project, ensure you have Node.js installed. Then, install the necessary dependencies:
To set up this project, please follow these steps:

1. Clone the repository: `git clone https://github.com/phamhung075/1-nodejs_mongodb_wc_showCase_SignUp-algorithm-HS256-JWT-keyToken-auth.git`
2. Change to the project directory: `cd 1-nodejs_mongodb_wc_showCase_SignUp-algorithm-HS256-JWT-keyToken-auth-master`
3. Install necessary dependencies: `npm install`


## Usage

The project consists of several modules and services, each handling different aspects of the application.

### Access Service (`./services/access.service.js`)

The Access Service is responsible for user authentication, including signup processes. It uses bcrypt for password hashing and crypto for generating public and private keys.

### Models

- **Shop Model** (`./models/shop.model.js`): Manages the shop data within the MongoDB database.

### Utilities

- **Lodash Utility** (`./utils/index.js`): Provides utility functions such as `getInfoData` for handling data extraction.

### Controllers

- **Access Controller** (`./controllers/access.controller.js`): Manages the access routes and authentication logic.

### Routes

- **Access Routes** (`./routes/access.route.js`): Defines routes for user access and authentication.

### Authentication and Token Management

- **Auth Utils** (`./auth/authUtils.js`): Contains utilities for token generation and authentication.
- **KeyToken Service** (`./services/keyToken.service.js`): Manages token creation and validation.
- **KeyToken Model** (`./models/keyToken.model.js`): Schema for storing key tokens in MongoDB.

### Additional Notes

- The project uses destructuring assignment in JavaScript for cleaner and more efficient code.
- MongoDB is used as the database, storing shop data and public keys.
- The application follows a modular architecture for easy maintenance and scalability.
### MongoDB Connection
Connect to the MongoDB server using: mongodb://localhost:27017

Postman exemple signUp
```
@url_dev=http://localhost:3052/v1/api/

### signup
POST {{url_dev}}/shop/signup
Content-Type: application/json

{
    "name": "cartepopup",
    "email": "cartepopup@gmail.com",
    "password": "abc123"
}
```

For more detailed examples, refer to see [README.png](./help01-hs256.png).
