# LinkedIn Clone

## Project Overview
### Description
A frontend-only LinkedIn clone built with **React (Vite)**, **HTML**, **CSS**, **Bootstrap**, and **JavaScript**. This project simulates LinkedIn’s core functionalities without a backend, utilizing **LocalStorage** for data persistence and **static JSON files** for user data, posts, and job listings.

---

## Key Features

1. **User Authentication (UI Only, No Actual Authentication)**  
   Provides a login and signup UI without actual authentication or backend verification.

2. **Home Feed with Posts, Likes, and Comments**  
   Displays a feed where users can view, like, and comment on posts to engage with content.

3. **User Profiles with Editable Information**  
   Allows users to view and edit their profile details, including name, bio, and profile picture.

4. **Job Listings with Search and Save Functionality**  
   Enables users to search for jobs using filters and save listings for future reference.

5. **Networking with Connection Requests and Management**  
   Supports sending, receiving, and managing connection requests to build a professional network.

6. **Fully Responsive Design for All Device Sizes**  
   Ensures an optimal viewing experience across desktops, tablets, and mobile devices.

---

## Project Goals
- Develop a LinkedIn-like UI with a modern, professional design.
- Implement React state management for user interactions.
- Use LocalStorage for data persistence (likes, comments, connections, etc.).
- Utilize React Router for seamless navigation.
- Display dynamic post feeds and job listings from JSON files.
- Ensure full responsiveness using Bootstrap.

---

## Installation & Setup

### Installation Steps
1. **Clone the repository:**  
   ```sh
   git clone https://github.com/yourusername/linkedin-clone.git
   cd linkedin-clone
   ```
2. **Install dependencies:**  
   ```sh
   npm install
   ```
3. **Start the development server:**  
   ```sh
   npm run dev
   ```  
   The application will be accessible at **http://localhost:5173**.

### Build for Production
```sh
npm run build
```
This creates a `dist` folder with the production-ready build.

### Preview Production Build
```sh
npm run preview
```

---

## Code Structure & Best Practices

### Project Structure
```
linkedin-clone/
│── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Different pages of the application
│   ├── assets/       # Static assets like images, icons
│   ├── data/         # Static JSON files for posts, users, jobs
│   ├── App.jsx       # Main application file
│   ├── main.jsx      # React entry point
│── public/           # Public assets
│── package.json      # Project dependencies and scripts
```

### Naming Conventions
- **Components:** PascalCase (e.g., `Navbar.jsx`, `Profile.jsx`)
- **Functions & Variables:** camelCase (e.g., `handleLike`, `userPosts`)
- **CSS Classes:** kebab-case (e.g., `profile-card`, `post-action`)

### Best Practices
- Use **functional components** with React hooks.
- Implement **React Router** for navigation.
- Store persistent data using **LocalStorage**.
- Keep code modular and reusable for better maintainability.

---

## JSON Files

### Example JSON Data Structure
#### jobs.json
```json
[
  {
    "id": "1",
    "title": "Frontend Developer",
    "company": "Tech Innovations Inc.",
    "companyLogo": "/images/image1.png",
    "location": "San Francisco, CA",
    "employmentType": "Full-time",
    "experienceLevel": "Mid-level",
    "description": "------data--------",
    "requirements": ["--------data--------"],
    "responsibilities": ["--------data--------"],
    "image": "/images/image2.png"
  }
]
```

#### posts.json
```json
[
  {
    "id": "1",
    "userId": "johndoe",
    "userName": "John Doe",
    "userImage": "/images/image3.png",
    "content": "--------data-------",
    "image": "/images/image4.jpg",
    "likes": 24,
    "comments": 5,
    "timestamp": "2 hours ago"
  }
]
```

#### users.json
```json
[
  {
    "id": "johndoe",
    "name": "John Doe",
    "headline": "Software Developer at Tech Company",
    "profileImage": "/images/image5.png",
    "connections": 143,
    "location": "San Francisco, CA",
    "bio": "--------data--------"
  }
]
```

---

## Error Handling & Debugging

### Error Handling Strategies
- **Form Validation:** Prevents empty post submissions.
- **Error Messages:** Displays alerts for invalid user actions.

### Debugging Tips
- **Console Logging:** Track state changes and interactions.
- **React DevTools:** Inspect component hierarchy and state.

---

## Deployment

### GitHub Deployment
1. **Push Your Code to GitHub**
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/linkedin-clone.git
   git push -u origin main
   ```

### Netlify Deployment
1. **Create a Netlify Account**  
2. **Deploy from GitHub**  
   - Select your GitHub repository.
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click **Deploy**.
3. **Custom Domain (Optional)**  
   - Add a custom domain in **Site settings > Domain management**.

---

### ⭐ If you like this project, please consider giving it a star on GitHub! ⭐
