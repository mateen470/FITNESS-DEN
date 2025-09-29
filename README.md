# Fitness-Den Frontend 🏋️‍♂️🥗

This repository contains the **frontend** of a full-featured **MERN stack fitness application**. The app is designed to provide users with an all-in-one platform for fitness, nutrition, e-commerce, and community engagement.

## 🚀 Features

* **Workout Plan Maker** – Create and customize personalized workout routines.
* **Diet Plan Maker** – Generate nutrition plans tailored to user goals.
* **Fitness Blogs** – Browse and post articles about fitness and lifestyle.
* **Nutrition Facts Finder** – Search food items and view nutrition breakdowns.
* **E-commerce Store** – Shop for supplements, fitness gear, and more.
* **Multi-role Panels**

  * 👤 **User Panel** – Access personal plans, orders, and progress.
  * 🧑‍🏫 **Trainer Panel** – Manage clients and provide fitness guidance.
  * 🛠️ **Admin Panel** – Control users, products, and site-wide content.
* **Advanced Authentication & Authorization** – Secure login with role-based access.
* **State Management with Redux** – Efficient and scalable app-wide state handling.

## 🛠️ Tech Stack

* **React.js** – Frontend framework
* **Redux** – State management
* **Axios** – API communication
* **React Router** – Client-side routing
* **Emotion / CSS Modules (if used)** – Styling
* **Other Libraries** – (list any specific ones like Material UI, Ant Design, etc.)

## 📂 Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # App pages (Dashboard, Plans, Blog, etc.)
│   ├── redux/        # State management (slices, store)
│   ├── utils/        # Helpers & utilities
│   ├── App.js        # Root component
│   └── index.js      # Entry point
```

## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mateen470/FITNESS-DEN
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add environment variables (example):

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Run the development server:

   ```bash
   npm start
   ```

5. Build for production:

   ```bash
   npm run build
   ```

## 🔗 Backend Repository

The backend for this project can be found here:
👉https://github.com/mateen470/FITNESS-DEN-BACKEND

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to fork this repo and submit a pull request.
