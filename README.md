# Form Submission and Google Sheets Sync Application

This is a full-stack web application built with React and Node.js. The app allows users to submit dynamic forms and sync the data with a Google Sheet. The form data is also stored in a MySQL database and in local storage to avoid re-entering information.

## Prerequisites
- Node.js installed on your machine.
- MySQL database installed and set up.
- Google Sheets API setup for syncing data..

## Getting Started

### Installation

1. **Clone the repository**  
   Open your terminal and run the following command to clone the repository:
   ```bash
   git clone https://github.com/me-harshil/Form-Submission-with-Google-Sheet-Sync.git

2. **Install Dependencies: Install the required dependencies for the Frontend and Backend**
- Navigate to the project directory and run following command:
   ```bash
   npm install
   cd Backend
   npm install

3. **Set Up MySQL Database**
- Create a MySQL database and a table named forms using the following SQL query:
   ```bash
   CREATE TABLE forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_type VARCHAR(1) NOT NULL,
    name VARCHAR(255) NOT NULL,
    country_code VARCHAR(5) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

4. **Set Up Environment Variables**
- Create a .env file in the root of your backend directory with the database credentials and spreadsheet  ID.
    ```bash
   SPREADSHEET_ID=
   DB_PASSWORD=
   DB_HOST=
   DB_USER=

5. **Google Sheets Setup**
- Go to Google Cloud Console.
- Enable the Google Sheets API.
- Create credentials (service account) and download the credentials.json file.
- Place the credentials.json file in a backend directory.
- Share the Google Sheet with your service account email.
- Replace the SPREADSHEET_ID in your .env file with the actual ID of the Google Sheet.
- Replace googleSheetUrl variable from src/App.jsx. I give my google sheet [link](https://docs.google.com/spreadsheets/d/1rBSf6_vJgDWrB9_t6bJbrqbFAzdlDTN-L8RPfIJ_H7w/edit?usp=sharing)

6. **Start Backend: Start the backend server**
   ```bash
   node server.js

7. **Navigate to Root Directory and run start react server**
   ```bash
   npm run dev
