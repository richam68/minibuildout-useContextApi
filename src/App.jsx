import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

import { lazy, Suspense } from "react";
import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";
import Dashboard from "./pages/dashboard";
import { useToast } from "./hooks/useToast";

function App() {
  const toast = useToast();

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
