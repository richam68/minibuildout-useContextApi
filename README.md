# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Hack2Skill Product Dashboard

A React + Vite application for managing and viewing products, with advanced cart, search, and dashboard features.

---

## Setup Steps

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd hack2Skill
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the development server**
   ```sh
   npm run dev
   ```
4. **Open the app**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Feature Overview

- **Product Dashboard:**  
  View a summary of products, revenue, categories, and stock status ([src/pages/dashboard.jsx](src/pages/dashboard.jsx)).

- **Product Table:**  
  Sort, filter, search, and paginate through products. Drag columns to reorder.  
  ([src/components/ProductTable.jsx](src/components/ProductTable.jsx))

- **Cart Functionality:**  
  Add, remove, and update product quantities in a sidebar cart.  
  ([src/components/CartSidebar.jsx](src/components/CartSidebar.jsx))

- **Product Details & Edit:**  
  View and edit product details with image upload.  
  ([src/components/ProductDetails.jsx](src/components/ProductDetails.jsx)), ([src/components/EditProduct.jsx](src/components/EditProduct.jsx))

- **Search & Filter:**  
  Fast, debounced search and category/stock filtering using custom hooks.  
  ([src/hooks/useSearch.jsx](src/hooks/useSearch.jsx)), ([src/hooks/useDebounce.js](src/hooks/useDebounce.js))

- **Responsive Design:**  
  Fully responsive layout using Tailwind CSS.

---

## Optimizations

- **Debounced Search:**  
  Reduces unnecessary renders and improves performance ([src/hooks/useDebounce.js](src/hooks/useDebounce.js)).

- **Memoized Filtering & Sorting:**  
  Uses `useMemo` for efficient data processing in tables.

- **Virtualized Data Generation:**  
  Generates 1000+ mock products efficiently ([src/data/generateMockProduct.js](src/data/generateMockProduct.js)).

- **Context API:**  
  Centralized state management for cart and products ([src/context/AppContext.jsx](src/context/AppContext.jsx)).

---

## Time Tracking (per feature)

| Feature            | Time Spent |
| ------------------ | ---------- |
| Cart Functionality | 2 hours    |
| Product Dashboard  | 5 hours    |
| Search & Filter    | 1.5 hours  |
| Responsive Design  | 1 hours    |
| Optimizations      | 2 hours    |

---

## Challenges & Solutions

- **State Management Across Components:**  
  _Challenge:_ Keeping cart and product state in sync.  
  _Solution:_ Used React Context API for global state ([src/context/AppContext.jsx](src/context/AppContext.jsx)).

- **Efficient Search on Large Data:**  
  _Challenge:_ Searching 1000+ products without lag.  
  _Solution:_ Implemented debounced and memoized search with substring indexing ([src/hooks/useSearch.jsx](src/hooks/useSearch.jsx)).

- **User Feedback for Cart Actions:**  
  _Challenge:_ Providing instant feedback for cart updates.  
  _Solution:_ Toast notifications via a custom provider ([src/components/ToastProvider.jsx](src/components/ToastProvider.jsx)).

- **Image Upload Preview:**  
  _Challenge:_ Previewing images before saving edits.  
  _Solution:_ Used FileReader API and local state in edit form ([src/components/EditProduct.jsx](src/components/EditProduct.jsx)).

---

## License

MIT
