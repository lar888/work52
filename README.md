# Research Group Website

This project is a **React + Redux application** for a research group website.  
It showcases team members, research updates, and provides an admin panel for content management.

The site supports:

- **Team members page** with profile cards and photos
- **Post management** (create, edit, delete)
- **Authentication system** with login/logout and protected admin panel
- **Modern responsive design** styled to match academic research websites
- **React Icons** library for clean iconography

---

## 📄 Main Pages

- **Home Page:** Displays an overview of the research group’s work and highlights featured posts.
- **Publications Page:** Lists published research papers with titles, years, and categories.
- **Research Page:** Describes ongoing scientific projects and research directions.
- **News Page:** Displays updates in the form of news cards with dates, images, and hover effects.
- **Funding Page:** Outlines funding sources, grants, and collaborations.
- **Contact Page:** Includes a contact form and team information.
- **Admin Page:** Secure modal login (`Username: admin`, `Password: 12345`) for authorized users to manage posts.

---

## 🚀 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lar888/work52
   cd work52

   ```

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

⚙️ Technologies Used
⚛️ React 18 + TypeScript — Component-based UI framework
🧭 React Router — Client-side navigation and route management
🧰 Redux Toolkit — Global state management
⚡ Vite — Fast bundler and development server
🧪 MockAPI.io — Simulated backend REST API for CRUD operations
💅 CSS Modules + Global Variables — Consistent responsive styling
🖼️ React Icons — Icon library used for visual accents (edit, delete, date, etc.)

🌐 Demo
A live demo is available here:
👉 https://work52.vercel.app

📂 Project Structure
src/
├── components/
│ ├── common/ # Shared components (Navbar, Layout, Sidebar)
│ ├── form/ # Form elements (InputField, SelectField, PostForm)
│ ├── layouts/ # PageLayout component
│ ├── modals/ # Modal window components
│ ├── pages/ # Page-level components (Home, Admin, Posts, etc.)
│ └── posts/ # Post-related components (Post, PostsList, EditPost)
│
├── data/ # Mock/static data (mockDataPosts.ts)
├── hooks/ # Custom hooks (useFetch, useDelete, etc.)
├── redux/
│ ├── slices/ # Redux Toolkit slices (authSlice, postsSlice, etc.)
│ └── store.ts # Redux store configuration
│
├── router/ # App routes and navigation
├── types/ # TypeScript interfaces
├── ui/ # UI elements (Loader)
└── utils/ # Utility functions (debounce, mockapiPosts)

🔒 Authentication System & Admin Panel

The app includes an authorization modal (“Admin Login”) that protects the admin area.
To access:
Username: admin
Password: 12345
Once logged in, the Admin Panel allows:
Creating new posts
Editing and deleting existing posts
Managing filtering, sorting, and pagination directly from the dashboard

🔍 Filtering, Sorting & Pagination

Sidebar Filtering:
Users can filter posts by:
Name
Category
Year
Tags
Filtering dynamically updates the displayed posts using React state and Redux selectors.

Admin Panel Filtering:
Posts can be filtered by name using an input field.
Sorting
Admin users can sort posts by:
Name
Category
Year
Tags
Sorting supports ascending and descending order.

Pagination
Pagination is handled client-side with controls for navigating through posts efficiently.

🧠 State Management
The application’s state is managed by Redux Toolkit (store.ts), containing:

🔑 state.auth:
state.auth.isLoggedIn: Tracks whether the user is authorized.

👥 state.users:
state.users.data: Stores user data.
state.users.isLoading: Tracks loading status.
state.users.error: Handles error messages.
state.users.totalCount: Total number of users.

📰 state.posts:
state.posts.data: Contains all post objects.
state.posts.isLoading: Indicates data loading state.
state.posts.error: Error state for post fetching.
state.posts.totalCount: Total number of posts in the API.

State is automatically updated and preserved through Redux slices and dispatched actions.

🧠 Future Improvements

🔗 Real backend integration with Node.js or Express (replacing MockAPI.io).
🌓 Dark mode and improved accessibility (WCAG compliance).
🖼️ File uploads for research publications.
🔎 Full-text search across posts.
🌐 Internationalization (i18n) for multilingual support.

👩‍🔬 About

This project was developed as a scientific research group website template,
allowing labs to showcase their work, publications, and team members
while offering an easy-to-use admin interface.
