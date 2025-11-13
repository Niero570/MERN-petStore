# MERN Pet Store

A full-stack CRUD application for managing pet dTCG, built with MERN (MongoDB, Express, React, Node.js).

## Features

- Add, edit, and delete pets
- List all pets
- View pet details
- RESTful API using Express/Node
- MongoDB for storage
- Frontend built with React

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB & Mongoose ODM
- **Environment**: `dotenv`

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or an Atlas URI

### Installation

1. Clone the repo:
    ```
    git clone https://github.com/Niero570/MERN-petStore.git
    ```
2. Install server dependencies:
    ```
    cd MERN-petStore
    npm install
    ```
3. Create a `.env` file and add your MongoDB connection string:
    ```
    MONGODB_URI=your_mongo_db_uri_here
    ```
4. Start the backend API server:
    ```
    npm start
    ```
5. (If you have a separate frontend, follow its start instructions too)

### API Endpoints

- `GET /pets` - List all pets
- `POST /pets` - Create new pet
- `GET /pets/:id` - Get pet details
- `PUT /pets/:id` - Update pet info
- `DELETE /pets/:id` - Remove pet

## Usage

To test the API:
- Use Postman or similar tools
- Optional: Run the frontend client for a user interface

## Screenshots

_Add UI screenshots here if available_

## To-Do / Improvements

- Add authentication (JWT)
- Add search/filter for pets
- Deploy to Heroku or Vercel

## License

MIT
