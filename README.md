# CodeSync

CodeSync is an online platform designed to help users practice data structure problems in the C programming language. The platform provides a seamless coding environment with real-time feedback, AI-powered assistance, and a leaderboard for users to track their progress and compete with others.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributors](#contributors)
- [License](#license)

## Features
- **Coding Environment**: Integrated code editor with real-time feedback.
- **AI Assistance**: Hints and guidance without directly providing solutions.
- **Admin Dashboard**: Manage coding problems and user progress.
- **User Progress Tracking**: Monitor problem-solving stats.
- **Leaderboard**: Competitions based on user rankings.
- **Multiple Data Structure Challenges**: Problems on stack, queue, linked list, tree, and graphs.
- **Secure User Authentication**: Role-based access control for admins and users.

## Technologies Used
- **Frontend**: React.js for building interactive user interfaces.
- **Backend**: Node.js for server-side operations and APIs.
- **Database**: MySQL for user data, problem sets, and progress tracking.
- **AI Integration**: Google Gemini for AI hints and assistance.
- **Real-Time Feedback**: Instant feedback on code submissions using test cases.
- **Microservices Architecture**: Scalable and modular design.

## Architecture
The system architecture includes:
- **Frontend**: Built using React.js to ensure a smooth and immersive user experience.
- **Backend**: Node.js handles API requests and manages the server-side logic.
- **Database**: MySQL stores all user data, problems, and progress information securely.
- **AI Component**: Provides hints and suggestions based on problem-solving queries.

## Installation

### Prerequisites
- Node.js (v14 or above)
- MySQL
- Gemini API key (free)

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/afayan/CodeSync.git
   ```

2. Setup to the the backend
    ```
    cd backend
    ```

    Install npm packages
    ```
    npm install
    ```

    Create .env file with your mysql passord and Gemini API key beside the index.js file

    your env file must look like this:
    ```
    GEMINI_API_KEY='your-api-key'
    SQL_PASSWORD='your-sql-password'
    ```

    Create the neccessary SQL tables. (queries and schema given in info.txt)

    Run the server
    ```
    npm run dev
    ```

3. Setup the frontend
     Open another terminal

     Navigate to frontend and install the packages
     ```bash
     cd frontend
     npm install
     ```

     Run the server
     ```
     npm run dev
     ```

4. Start coding!

## Usage 
Users can sign up and solve coding challenges from the problem sets.
Admins can log in to upload or manage new problems.
AI hints are available by clicking the "Ask AI" button for help when stuck on a problem.

## Screenshots




