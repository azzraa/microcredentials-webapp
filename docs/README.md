# Microcredentials Webapp

## Description
This project is focused on developing a mini web application to digitize microcredentials, aligning with the European Qualifications Framework (EQF) and ESCO (European Skills, Competences, Qualifications, and Occupations). The app simplifies the process of issuing, applying for, and evaluating microcredentials through a structured, web-based system.

### Roles Supported:
- **Creators**: Design and define credentials.
- **Users**: Apply for credentials by submitting work, skills, and supporting documents.
- **Evaluators**: Review applications to approve or provide feedback.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
Make sure you have the following installed:
- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **npm**: npm comes with Node.js, so installing Node.js will also install npm.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/microcredentials-webapp.git
    ```

2. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```
    
5. Open a new terminal:
    ```bash
    cd backend
    ```
    
6. Start backend server:
    ```bash
    node server.js
    ```

This will start the app on `http://localhost:3000` (or another port if `3000` is taken).

## Features
- **Create and manage microcredentials**: Creators can define new credentials.
- **Apply for microcredentials**: Users can apply for credentials by submitting work, skills, and documents.
- **Evaluate applications**: Evaluators can review applications and provide feedback.

## Usage

Once the app is running, you will be able to:

- **Create Microcredentials**: As a creator, you can design microcredentials with titles, descriptions, and categories.
- **Apply for Credentials**: As a user, you can apply for microcredentials by submitting your work and supporting documents.
- **Review Applications**: As an evaluator, you can review the submitted applications and approve or leave feedback.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime for backend services.
- **npm**: Package manager for JavaScript.
