# Corpus Cleaning Tool for Machine Learning

## Description
This project was developed at the Instituto de Investigación de Informática de Alicante, specifically within the CENID branch. The main goal is to provide a tool that simplifies the cleaning of corpora used in machine learning, removing impurities introduced during the data collection process by Python-based web crawlers.

The application is built using React.js for the user interface, offering an efficient and user-friendly experience for those who need to clean data effectively.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js (using Python-based crawler scripts for data collection)

## Project Setup

### Prerequisites
Ensure you have Node.js and npm installed on your system to run the project. You can download and install them from the [Node.js official website](https://nodejs.org/).

### Installation
To set up the project, you’ll need to configure both the frontend and backend. Follow these steps for each:

#### Frontend
1. Navigate to the `/client` folder:
   ```bash
   cd client
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```
   This will compile the application and automatically open a browser tab at `localhost:3000`.

#### Backend
1. Navigate to the backend base folder `/crawler_CENID`:
   ```bash
   cd crawler_CENID
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

Once both servers are running, the application should be accessible at `localhost:3000`. If it doesn’t open automatically, you can enter this address in your browser to access the application’s user interface.

## Usage
The React-based user interface allows you to load corpus data and apply various cleaning tools and techniques to prepare the data for use in machine learning models. Follow the on-screen instructions to perform the necessary cleaning operations.
