// src/context/AppContext.jsx
import { createContext, useContext, useState } from "react";
import generateMockProducts from "../data/generateMockProduct";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Search
  const { productsArray: initialProducts } = generateMockProducts(1000);
  const [searchQuery, setSearchQuery] = useState("");
  // Cart
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(initialProducts);

  //table list update product function
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  //table list delete product function
  const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      try {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
  //Add to Cart function
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Increase Quantity function
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity function
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        products,
        setProducts,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
