// ProductTable.jsx
import { useEffect, useMemo, useState } from "react";
import usePagination from "../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ArrowDown, ArrowUp, Edit, Eye, Trash2, Loader } from "react-feather";
import useDebounce from "../hooks/useDebounce";
import useSearch from "../hooks/useSearch";
import { useToastUtils } from "../utils/toast";

const initialColumns = [
  { id: "id", label: "ID" },
  { id: "image", label: "Image" },
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "price", label: "Price" },
  { id: "stock", label: "Stock" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions" },
  { id: "addFeature", label: "Add Feature" },
];

const ProductTable = () => {
  const navigate = useNavigate();
  const {
    products,
    searchQuery,
    setSearchQuery,
    deleteProduct,
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useAppContext();
  const [columns, setColumns] = useState(initialColumns);
  const [draggedCol, setDraggedCol] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [localSearch, setLocalSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", stock: "" });
  const [deletingId, setDeletingId] = useState(null);
  const { showSuccessToast, showErrorToast } = useToastUtils();
  // Debounce the local search input
  const debouncedSearch = useDebounce(localSearch, 200);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  // Use HashMap-based search
  const searchedProducts = useSearch(products, searchQuery);

  const handleSort = (colId) => {
    setSortConfig((prev) => {
      if (prev.key === colId) {
        return {
          key: colId,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: colId, direction: "asc" };
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = searchedProducts;

    const statusMap = {
      in: "In Stock",
      out: "Out of Stock",
      limited: "Limited",
    };

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.stock) {
      filtered = filtered.filter((p) => p.status === statusMap[filters.stock]);
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Case-insensitive sort for strings
        if (typeof aVal === "string" && typeof bVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchedProducts, filters, sortConfig]);

  const {
    currentPage,
    maxPage,
    next,
    prev,
    paginatedData: paginatedProducts,
  } = usePagination(filteredProducts, 10);

  const handleDrop = (index) => {
    if (draggedCol === null) return;
    const updated = [...columns];
    const [moved] = updated.splice(draggedCol, 1);
    updated.splice(index, 0, moved);
    setColumns(updated);
    setDraggedCol(null);
  };

  const handleEdit = (id, product) => {
    navigate(`/edit_product/${id}`, { state: { product } });
  };

  const renderCell = (colId, product) => {
    switch (colId) {
      case "image":
        return (
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 rounded object-cover"
          />
        );
      case "price":
        return `₹${product.price.toFixed(2)}`;
      case "actions":
        return (
          <div className="space-x-2">
            <button className="text-blue-500 hover:underline text-sm">
              <Eye
                className="w-3 h-3 text-black cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product_details/${product.id}`, {
                    state: { product },
                  });
                }}
              />
            </button>
            <button
              className="text-green-500 hover:underline text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(product.id, product);
              }}
            >
              <Edit className="w-3 h-3 text-black cursor-pointer" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (
                  window.confirm(
                    "Are you sure you want to delete this product?"
                  )
                ) {
                  setDeletingId(product.id);
                  deleteProduct(product.id)
                    .then(() => {
                      setDeletingId(null);
                      showSuccessToast("Succesfully Deleted!");
                    })
                    .catch(() => {
                      setDeletingId(null);
                      alert("Failed to delete product");
                    });
                }
              }}
              disabled={deletingId === product.id}
              className={`p-0 rounded-sm ${
                deletingId === product.id
                  ? "bg-red-200 cursor-not-allowed"
                  : "hover:bg-red-100"
              } text-white`}
              title="Delete Product"
            >
              {deletingId === product.id ? (
                <Loader className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4  cursor-pointer text-red-600" />
              )}
            </button>
          </div>
        );
      case "addFeature":
        const cartItem = cartItems.find((item) => item.id === product.id);
        return (
          <div className="flex items-center gap-2">
            {cartItem ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQuantity(product.id);
                    showErrorToast(" Quantity Decreased");
                  }}
                  disabled={cartItem.quantity <= 1}
                  className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  -
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQuantity(product.id);
                    showSuccessToast(" Quantity Increased");
                  }}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  showSuccessToast(`Added to cart`);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            )}
          </div>
        );

      default:
        return product[colId];
    }
  };

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-4 w-full bg-neutral-100 rounded-sm">
      <div className="flex flex-wrap items-end justify-end gap-4 mb-4">
        {/* <input
          type="text"
          placeholder="Search by name or category..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="border px-3 py-2 rounded shadow-sm w-full md:w-1/3"
        /> */}

        <div className="flex gap-1 bg-blue-100">
          <select
            onChange={(e) => {
              const [key, direction] = e.target.value.split(":");
              setSortConfig({ key, direction });
            }}
            className="border p-2 rounded"
            value={`${sortConfig.key}:${sortConfig.direction}`}
          >
            <option value="id:asc">Sort by ID ↑</option>
            <option value="price:asc">Sort by Price ↑</option>
            <option value="price:desc">Sort by Price ↓</option>
            <option value="name:asc">Sort A-Z</option>
            <option value="name:desc">Sort Z-A</option>
          </select>

          <select
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, stock: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
            <option value="limited">Limited</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map((col, index) => (
                <th
                  key={col.id}
                  title={`Sort by ${col.label}`}
                  draggable
                  onDragStart={() => setDraggedCol(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  onClick={() => handleSort(col.id)}
                  className="px-4 py-2 border-b font-medium text-gray-700 cursor-pointer hover:bg-blue-50 "
                >
                  {col.label}
                  <span className="ml-1 flex">
                    {sortConfig.key === col.id ? (
                      sortConfig.direction === "asc" ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product_details/${product.id}`);
                }}
              >
                {columns.map((col) => (
                  <td key={col.id} className="px-4 py-2 border-b">
                    {renderCell(col.id, product)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-3">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {maxPage}
          </span>
          <div className="space-x-2">
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={next}
              disabled={currentPage === maxPage}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
