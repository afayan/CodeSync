# CodeSync

CodeSync is an online platform designed to help users practice data structure problems in the C programming language. The platform provides a seamless coding environment with real-time feedback, AI-powered assistance, and a leaderboard for users to track their progress and compete with others.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)

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
   ```bash
   git clone https://github.com/afayan/CodeSync.git
   ```

2. Setup the backend

    Navigate to the backend 
    ```bash
    cd backend
    ```

    Install npm packages
    ```bash
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

Landding Page
![IMG-20241028-WA0008](https://github.com/user-attachments/assets/777e6624-0e6c-4cfa-b61f-9430a6e0a126)

Dashboard
![Screenshot 2024-10-16 234258](https://github.com/user-attachments/assets/4e91cbed-2df1-497f-ae07-ce6febfa9a1f)

Select Problem
![IMG-20241028-WA0002](https://github.com/user-attachments/assets/faf5f482-756e-40c2-b21c-1aafd2a1b08c)

Solve Problem
![IMG-20241028-WA0001](https://github.com/user-attachments/assets/65e9faf7-444b-464e-972f-a5d2f7e218d7)

Wrong Code submitted
![IMG-20241028-WA0003](https://github.com/user-attachments/assets/e2e92d3c-32cb-43a5-94d0-f79c50df4496)

Ask AI for help
![IMG-20241028-WA0004](https://github.com/user-attachments/assets/049a2af1-7a13-41bf-9887-089c8c8ee0d1)

Admin Panel
![IMG-20241028-WA0005](https://github.com/user-attachments/assets/09995e32-5716-467e-9447-c381d710ff51)

Leaderboard
![IMG-20241028-WA0006](https://github.com/user-attachments/assets/0378109e-501b-4ceb-8a22-54fea3438e5b)

Login/Signup page
![IMG-20241028-WA0007](https://github.com/user-attachments/assets/361fe857-1a88-446e-8347-b8a234290486)
