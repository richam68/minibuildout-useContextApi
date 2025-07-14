import { Route, Routes } from "react-router-dom";
import "./App.css";

import EditProduct from "./components/EditProduct";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product_details/:id" element={<ProductDetails />} />
        <Route path="/edit_product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
