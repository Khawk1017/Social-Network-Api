# Social Network API

This is a backend API for a social network application. It provides various endpoints to manage thoughts, users, reactions, and friendships. The API is built using Express.js, Mongoose, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the required dependencies:

   ```bash
   npm install

## Usage 
1. Start the server by running the following command:
``` 
node index.js
```
2. The api will accessible at `http:localhost:3001`

## Endpoints 
The following endpoints are available:

### Thoughts
- GET /api/thoughts: Get all thoughts.
- GET /api/thoughts/:thoughtId: Get a single thought by ID.
- POST /api/thoughts: Create a new thought.
- PUT /api/thoughts/:thoughtId: Update a thought by ID.
- DELETE /api/thoughts/:thoughtId: Delete a thought by ID.
- POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought.
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought.

### Users
- GET /api/users: Get all users.
- GET /api/users/:userId: Get a single user by ID.
- POST /api/users: Create a new user.
- PUT /api/users/:userId: Update a user by ID.
- DELETE /api/users/:userId: Delete a user by ID.
- POST /api/users/:userId/friends/:friendId: Add a friend to a user.
- DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user.

### Reactions 
- POST /api/reactions: Create a new reaction.
- GET /api/reactions/:reactionId: Get a single reaction by ID.
- PUT /api/reactions/:reactionId: Update a reaction by ID.
- DELETE /api/reactions/:reactionId: Delete a reaction by ID.
 
 ## License
This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.
    ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)