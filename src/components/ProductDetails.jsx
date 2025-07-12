import React from "react";
import { SkipBack } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (!product) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded text-center">
        <h2 className="text-xl font-semibold text-red-600">No Product Found</h2>
        <p className="text-gray-600 mt-2">
          Please select a product to view details.
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleBack}
        className="flex justify-center items-center gap-2 mt-2 ml-3 cursor-pointer"
      >
        <SkipBack />
        Back
      </button>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Product Details
        </h2>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
          </div>
          <div className="flex justify-center items-center gap-6">
            <div className="flex justify-center items-center gap-2">
              <label className="text-gray-600 font-medium">Name:</label>
              <p className="text-lg font-semibold">{product.name}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <label className="text-gray-600 font-medium">Category:</label>
              <p>{product.category}</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6">
            <div className="flex justify-center items-center gap-2">
              <label className="text-gray-600 font-medium">Price:</label>
              <p>₹{product.price.toFixed(2)}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <label className="text-gray-600 font-medium">Stock:</label>
              <p>{product.stock}</p>
            </div>
          </div>
          <div>
            <label className="text-gray-600 font-medium">Status:</label>
            <p
              className={`inline-block px-2 py-1 rounded ${
                product.status === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : product.status === "Out of Stock"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {product.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
