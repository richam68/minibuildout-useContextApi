import { ShoppingCart, User } from "react-feather";
import hackLogo from "../assets/H2S_Gradient_Logo.png";
import { useEffect, useState } from "react";

import { useAppContext } from "../context/AppContext";
import useDebounce from "../hooks/useDebounce";
import CartSidebar from "./CartSideBar";

function Header() {
  const { setSearchQuery, cartItems } = useAppContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  // Debounce the global search input
  const debouncedGlobalSearch = useDebounce(globalSearch, 200);

  useEffect(() => {
    setSearchQuery(debouncedGlobalSearch);
  }, [debouncedGlobalSearch, setSearchQuery]);

  return (
    <>
      <header className="bg-slate-100 shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <img src={hackLogo} width="40px" height="40px" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>

        {/* Cart and Avatar */}
        <div className="flex items-center gap-6">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="text-gray-700" size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <User className="text-gray-700" size={28} />
        </div>
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;
