# UniAdmit AI - AI-Enhanced Admission Management System

## Project Overview
UniAdmit AI is a comprehensive admission management system designed to streamline the student application process for educational institutions. The platform allows students to easily submit their details, upload academic documents, and track their application status in real-time. For administrators, it provides a powerful dashboard to review applications, analyze trends, and make informed decisions.

A standout feature of UniAdmit AI is its **AI-Driven Decision Support System**. It integrates a Machine Learning model to automatically predict a student's eligibility (approval probability) based on their academic background (10th and 12th-grade marks and attendance). Furthermore, it leverages the Google Gemini AI API to provide intelligent, contextual recommendations for the admission team to assist in the final review process.

## Technologies Used
- **Frontend:** HTML5, CSS3, Vanilla JavaScript, Chart.js (for analytics), Lucide Icons
- **Backend:** Node.js, Express.js, Multer (for document uploads)
- **Database:** MySQL
- **Machine Learning:** Python, Flask, Scikit-Learn, Joblib
- **Generative AI:** Google Gemini API

---

## Setup Instructions

### 1. Database Setup (MySQL)
1. Ensure you have MySQL installed and running on your system.
2. Create a new database named `admission_management` (or your preferred name).
3. The system requires tables for `applications`, `documents`,`academic_records` and `admin_users`. Make sure your MySQL instance is configured and note down the credentials (Host, User, Password, DB Name).

### 2. Machine Learning Model Setup
The ML model predicts student eligibility and runs as an independent microservice.
1. Navigate to the `ML` directory:
   ```bash
   cd ML
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python predict.py
   ```
   *The ML server will start running on `http://localhost:5000` or `http://0.0.0.0:10000` depending on your deployment config.*

### 3. Backend Setup (Node.js)
The backend serves the REST API, handles document uploads, and communicates with both the ML server and the Gemini API.
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and configure the following environment variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=admission_management

   # Server Port
   PORT=4003

   # Machine Learning API URL (Point this to your running Flask ML server)
   ML_API_URL=http://localhost:5000

   # Gemini GenAI Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the Node.js backend server:
   ```bash
   npm start
   ```
   *The backend server will start running on `http://localhost:4003`.*

### 4. Frontend Setup
The frontend is built with pure HTML/CSS/JS and communicates with the backend API.
1. Open the `Frontend` directory.
2. If you are running the backend locally, ensure the API URLs in the JavaScript files (`js/admin.js`, `js/student.js`, `track-status.html`, etc.) point to your local backend (`http://localhost:4003`). *Note: If deployed, they should point to your live backend URL.*
3. You can run the frontend locally using the **Live Server** extension in VS Code. Simply right-click on `index.html` and select "Open with Live Server".

---

## GenAI & API Key Instructions
This project uses the **Google Gemini API** to generate intelligent recommendations for student applications. 
- To get an API key, visit the [Google AI Studio](https://aistudio.google.com/).
- Generate a new API key.
- Add the key to your backend `.env` file as `GEMINI_API_KEY`.
- *Note: The system is designed to handle failures gracefully. If the ML server or Gemini API is unreachable, the application will still save successfully, allowing the admin to manually review the application later.*
