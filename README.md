# 🥬 FreshEats (MERN Stack)

![FreshEats Banner](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200&h=400)

Introducing **FreshEats**, your go-to web application for the freshest fruits and vegetables! FreshEats is a comprehensive e-commerce platform dedicated to bringing farm-fresh produce directly from sellers to customers' doorsteps. 

The application features three distinct user roles:
1. **Customers**: Can browse items, manage their cart, save addresses, and place orders.
2. **Sellers**: Can manage their store profile, add/edit/delete items in their inventory, and track orders containing their products.
3. **Admins**: Have full control over the platform, allowing management of users, sellers, inventory, and global order tracking through a dedicated glassmorphism dashboard.

---

## 💻 Tech Stack & Technical Details

FreshEats is built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) with a focus on modern UI/UX design and scalable backend architecture.

### Frontend
* **React + Vite:** Provides a lightning-fast development environment and optimized production builds.
* **Tailwind CSS:** Used for utility-first styling, enabling responsive, modern, and beautiful UI components without leaving the HTML.
* **React Router DOM:** Handles client-side routing with protected routes for sellers and admins.
* **Framer Motion:** Adds smooth micro-animations and page transitions for a premium feel.
* **Axios:** For making secure HTTP requests to the backend API.
* **React Hot Toast:** For beautiful and responsive UI notifications.

### Backend
* **Node.js & Express.js:** Powers the robust and scalable REST API.
* **MongoDB & Mongoose:** NoSQL database for flexible data modeling (Users, Sellers, Items, Orders, Cart).
* **JWT (JSON Web Tokens):** Manages secure, stateless authentication using HTTP-only cookies. Distinct tokens are used for Users, Sellers, and Admins (`loggedin`, `sellerLoggedin`, `adminLoggedin`).
* **Bcrypt:** Ensures password security through secure hashing before database storage.
* **Multer:** Handles multipart/form-data for image uploads (stored locally in `/uploads`).
* **Winston:** Provides detailed backend logging for monitoring and debugging.

---

## 🛠️ Setup & Installation Instructions

Follow these steps to run FreshEats locally on your machine.

### Prerequisites
* Node.js installed (v16 or higher recommended)
* MongoDB installed and running locally (or a MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd FreshEats
```

### 2. Install Dependencies
You need to install packages for both the frontend (root directory) and the backend.
```bash
# Install frontend dependencies (Vite + React)
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the **`backend/`** directory with the following variables:
```env
# Server Port
PORT=3000

# MongoDB Connection String
# Example: mongodb://127.0.0.1:27017/fresheats
MONGODB_URI=<your-mongodb-uri>

# JWT Secrets for Authentication
JWT_KEY=your_user_secret_key
SELLER_JWT_KEY=your_seller_secret_key
ADMIN_JWT_KEY=your_admin_secret_key
```

### 4. Run the Application
You can run both the frontend and backend concurrently from the root directory using the custom npm script:

```bash
# Runs both Vite dev server and Express backend
npm run both
```

* **Frontend:** `http://localhost:5173`
* **Backend API:** `http://localhost:3000`

---

## ⚠️ Important Points & Features

### Authentication & Roles
* The application strictly separates authentication for the three roles using different JWT secrets and cookies to prevent privilege escalation.
* **Admin Login Details:** 
  * URL: `/admin`
  * Username: `ADMIN`
  * Password: `ADMIN1234`
* **Seller Dashboard:** Sellers can only edit/delete items they have created and can only view orders containing their specific items.

### API Documentation
* Comprehensive API documentation is available in the `backend/docs/` directory, separated by route prefix (e.g., `user`, `seller`, `item`, `admin`, `cart`).
* These docs contain API URLs, HTTP methods, descriptions, authentication requirements, and sample request/response bodies.

### Image Handling
* Shop items can use images uploaded from the computer (stored in `backend/uploads`) OR direct HTTP URLs (e.g., Unsplash links). 
* The frontend automatically detects URL formats and renders the correct image source.

### Database Syncing
* The `My Orders` page fetches real-time data from the database.
* Cart quantities are synced with the database, ensuring that users do not lose their cart status when logging out. Delete operations on users cascade to clear their cart data appropriately.
