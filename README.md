# ✈️ SkyBook: A Full-Stack Microservices Airline Booking Project

Welcome to SkyBook, a comprehensive airline booking application built from the ground up with a modern, scalable microservices architecture. This project features a complete backend with independent services for authentication, flight management, and bookings, all communicating through a central API Gateway. The frontend is a dynamic and responsive React application.

This repository also serves as a real-world **case study in full-stack troubleshooting**, detailing the journey from critical network errors to a stable, fully functional application.

![An illustration of a modern, clean airline website homepage]

<img width="1900" height="918" alt="Screenshot 2025-10-18 122946" src="https://github.com/user-attachments/assets/651ed549-3157-44fc-9a14-25d099b126c4" />

## ✨ Key Features

* **Full-Stack Authentication:** Secure user registration and login using JSON Web Tokens (JWT) and `bcrypt` for password hashing.
* **Microservice Architecture:** A decoupled backend where each service handles a single business capability:
    * **AuthService:** Manages all user accounts and authentication.
    * **FlightService:** Manages flight data, schedules, and search.
    * **BookingService:** Manages the booking process and user booking history.
* **Central API Gateway:** A single, unified entry point for the frontend that routes all incoming requests to the correct microservice, simplifying communication and enhancing security.
* **Dynamic Frontend:** A responsive React application built with functional components, hooks, and React Router for seamless navigation.
* **Complete Booking Flow:** Users can search for flights, select a flight, and confirm their booking, which is then tied to their user account.

---

## 📸 Screenshots

Here are some glimpses of the SkyBook application in action:

**Login / Registration Page**
![Login/Registration Page]
 
 <img width="749" height="411" alt="Screenshot 2025-10-18 124545" src="https://github.com/user-attachments/assets/f0ef6348-aed1-409f-8658-c6891abc554e" />

**Available Flights List**
![Available Flights List]

<img width="1550" height="781" alt="Screenshot 2025-10-18 124612" src="https://github.com/user-attachments/assets/fd8beeeb-ffad-41e4-a382-c78998a8bc19" />

**My Bookings Page**
![My Bookings Page]

<img width="1147" height="690" alt="Screenshot 2025-10-18 124623" src="https://github.com/user-attachments/assets/64f5e0ab-bf2c-46d9-812b-04db19a09158" />

## 🎥 Video Demonstration

Watch a quick tour of the SkyBook application, showcasing user registration, flight search, booking a flight, and viewing personal bookings.

[![Watch the video]

![SkyBook](https://github.com/user-attachments/assets/5a11027b-2c6d-418a-83ec-5547bd206ba1)


## 🏗️ Architecture & Tech Stack

This project uses a modern stack to create a scalable and maintainable system. The architecture is designed to be resilient, allowing individual services to be updated or scaled independently.

### System Architecture

```
+------------------------+
|   React Frontend       |
| (localhost:3006)       |
+-----------+------------+
            |
            | (All API Requests)
            |
+-----------v------------+
|   API Gateway          |
| (localhost:3004)       |
+--+----------+---------+-+
   |          |           | (Routes traffic based on path)
   |          |           |
+--v---------+--v--------+---v--------+
| AuthService  | FlightService | BookingService |
| (Port 3000)  | (Port 3001)   | (Port 3002)    |
+--------------+---------------+----------------+
       |               |               |
+------v---------------v---------------v--------+
|                Database Layer                 |
|            (e.g., PostgreSQL, MySQL)          |
+-----------------------------------------------+
```

### 💻 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **API Gateway** | `http-proxy-middleware` |
| **Database** | Sequelize ORM (PostgreSQL/MySQL) |
| **Authentication** | JWT (JSON Web Tokens), `bcrypt` |
| **Core Tools** | `cors`, `morgan`, `nodemon`, `dotenv` |

---

## 🚀 Getting Started

Follow these instructions to get the entire application running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/en/) (which includes `npm`)
* A running SQL database (e.g., PostgreSQL, MySQL)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/Airline-booking.git](https://github.com/your-username/Airline-booking.git)
cd Airline-booking
```

### 2. Install Dependencies

You must install dependencies for **every single service** individually.

```bash
# From the root folder:
cd API_Gateway
npm install

cd ../AuthService
npm install

cd ../BookingService
npm install

cd ../FlightAndSearchService
npm install

cd ../airline-booking-frontend
npm install
```

### 3. Configure Environment Variables (.env)

Each backend service needs its own `.env` file to store database credentials and security keys.

**Example `AuthService/.env`:**
```env
PORT=3000
DB_SYNC=true
JWT_KEY=your_secret_key_for_jwt
SALT=10

# Add your database credentials
DB_NAME=auth_db
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
```

**Example `airline-booking-frontend/.env`:**
This file must point to your API Gateway.
```env
REACT_APP_API_BASE_URL=http://localhost:3004
```

### 4. Running the Application (5 Terminals)

To run the full application, you must start each service in its own dedicated terminal.

1.  **Terminal 1: Start AuthService**
    ```bash
    cd AuthService
    npm start
    ```

2.  **Terminal 2: Start FlightService**
    ```bash
    cd FlightAndSearchService
    npm start
    ```

3.  **Terminal 3: Start BookingService**
    ```bash
    cd BookingService
    npm start
    ```

4.  **Terminal 4: Start API Gateway**
    ```bash
    cd API_Gateway
    npm start
    ```

5.  **Terminal 5: Start React Frontend**
    *We use port 3006 to avoid conflicts with the backend.*
    ```bash
    cd airline-booking-frontend
    npm start 
    ```

Your application is now running!
* **Frontend:** `http://localhost:3006`
* **API Gateway:** `http://localhost:3004`

---

## 🛠️ A Case Study in Troubleshooting

A significant part of this project was the journey of debugging a complex, distributed system. The initial setup was plagued by a cascade of errors that required methodical, layered debugging.

* **`ERR_CONNECTION_REFUSED`:** Solved by ensuring all services were running simultaneously.
* **`request aborted` (CORS):** Solved by adding `cors()` to all backend microservices, not just the gateway.
* **Hanging Requests (Circular Dependency):** Solved by moving business logic (password hashing) from the Sequelize model to the Service layer, breaking a critical dependency loop.
* **`request aborted` (Proxy Error):** The most difficult bug. Solved by removing `express.json()` from the API Gateway. A proxy should not parse a request body it is forwarding; it should stream it directly to the target service.
* **`404 Not Found` (Routing):** Solved by correcting the `pathRewrite` rules in the gateway to build the correct target path (e.g., `/api/v1/signup`) for the backend services.

This project is a testament to the importance of methodical debugging, understanding the flow of data through a distributed system, and correctly configuring each component for its specific role.
