# Plan.it

A comprehensive task management application designed specifically for students with ADHD, featuring intuitive daily, weekly, and monthly views with specialized organization features to enhance focus and productivity.

## Features

- **Multi-view Task Management**: Navigate between daily, weekly, and monthly views
- **Smart Task Synchronization**: Tasks added to the current week automatically appear in Weekly Tasks
- **Color Coding**: Categorize tasks with custom colors for visual organization
- **Drag-and-Drop Interface**: Easily reorganize tasks between time periods
- **Interactive Calendar**: Click on weeks or days to drill down into detailed views
- **Future Planning**: Special area for tasks scheduled for future months
- **Edit Mode**: Toggle to enable task deletion and advanced editing

## Installation

### Prerequisites

- Node.js (v14.0 or higher)
- npm (v7.0 or higher)

### Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/agc6/plan.it.git
   cd plan.it
   ```

2. Install dependencies for both client and server:
   ```
   cd client
   npm install
   ```

## Running the Application

You'll need to run both the client and server concurrently:

1. In one terminal, start the server:
   ```
   cd server
   node server.js
   ```
   The server will start running on http://localhost:3001

2. In another terminal, start the client:
   ```
   cd client
   npm run dev
   ```
   The client will start running on http://localhost:3000

3. Open your browser and navigate to http://localhost:3000

4. Sign up and create an account to start using the application

## Usage Guide

1. **Initial Setup**: Create an account and log in
2. **Adding Tasks**: 
   - Click the "+" button in any list to add a new task
   - Enter your task
3. **Organizing Tasks**:
   - Select a color from the color picker before adding a task to categorize it
   - Drag and drop tasks between lists to reorganize
4. **Navigating Views**:
   - Click on a week name to switch to weekly view
   - Click on a day name to switch to daily view
   - Use the navigation menu to return to monthly view
5. **Edit Mode**:
   - Toggle edit mode to enable task deletion and advanced editing features

## Technology Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
