# README.md

## Setup Steps
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Start the development server with `npm start`.
5. Open your browser and go to `http://localhost:3000` to view the application.

## Feature Overview
- **Cart Functionality**: Users can add, remove, and adjust the quantity of products in their cart.
- **Product Dashboard**: Displays a list of products with relevant details such as price, stock status, and category.
- **Search and Filter**: Users can search for products and filter them based on categories and stock status.
- **Responsive Design**: The application is designed to be responsive and works well on various screen sizes.

## Optimizations
- Implemented debouncing for search input to reduce the number of API calls.
- Used memoization for filtering and sorting products to enhance performance.
- Lazy loading of images to improve initial load time.

## Time Tracking (per feature)
- Cart Functionality: 8 hours
- Product Dashboard: 6 hours
- Search and Filter: 4 hours
- Responsive Design: 3 hours
- Optimizations: 5 hours

## Challenges & Solutions
- **Challenge**: Managing state across multiple components.
  - **Solution**: Utilized React Context API to provide a global state for cart items and user preferences.
  
- **Challenge**: Ensuring smooth user experience during data fetching.
  - **Solution**: Implemented loading indicators and error handling to inform users of the application state.