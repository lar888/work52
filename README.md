# Research Group Website

This project is a **React + Redux application** for a research group website.  
It showcases team members, research updates, and provides an admin panel for content management.  

The site supports:
- **Team members page** with profile cards and photos.  
- **Post management** (create, edit, delete).  
- **Authentication system** with login/logout and protected admin panel.  
- **Modern responsive design** styled to match academic research websites.  

---

## 🚀 Installation & Setup

### 1. github repository:
https://github.com/lar888/work52

2. Install dependencies
yarn

3. Run the development server
yarn dev


Then open http://localhost:5173
 in your browser.

4. Build for production
yarn build

5. Preview production build
yarn preview

⚙️ Technologies

React 18 with TypeScript
Redux Toolkit for state management
React Router for navigation
Vite for fast bundling and development
MockAPI.io for simulating backend API

🌐 Demo

A live demo is available here:
👉 https://work52.vercel.app

📂 Project Structure
src/
├── components/
│   ├── common/      # Shared, reusable components (Navbar, Layout)
│   ├── form/        # Form-related inputs (InputField, SelectField, PostForm, etc.)
│   ├── modals/      # Modal window
│   ├── pages/       # Page-level components (Home, Admin, Posts, etc.)
│   └── posts/       # Post-specific components (Post, PostsList, EditPost, etc.)
│
├── data/            # Mock/fake data or static datasets
│
├── hooks/           # Custom React hooks (useFetch, useDelete, etc.)
│
├── redux/
│   ├── slices/      # Redux Toolkit slices (authSlice, postsSlice, etc.)
│   └── store.ts     # Redux store configuration
│
├── router/          # App routes, route guards, and navigation config
│
├── types/           # TypeScript types/interfaces (Post.interface.ts, User.interface.ts, etc.)
│
├── ui/              # UI primitive (loader)
│
└── utils/           # Utility functions (debounce, mockapiPosts)


👩‍🔬 About

This project was developed as a scientific research group website template, allowing labs to showcase their work, team, and publications while offering an easy-to-use admin interface.
