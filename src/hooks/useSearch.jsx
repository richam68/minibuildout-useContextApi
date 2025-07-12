import { useMemo } from "react";

const useSearch = (products, searchQuery) => {
  const searchIndex = useMemo(() => {
    const index = new Map();

    products.forEach((product) => {
      const keywords = `${product.name} ${product.category}`.toLowerCase();
      for (let i = 0; i < keywords.length; i++) {
        for (let j = i + 1; j <= keywords.length; j++) {
          const substr = keywords.substring(i, j).trim();
          if (substr.length > 1) {
            if (!index.has(substr)) {
              index.set(substr, new Set());
            }
            index.get(substr).add(product);
          }
        }
      }
    });

    return index;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    const query = searchQuery.toLowerCase();
    const resultSet = searchIndex.get(query);

    return resultSet ? Array.from(resultSet) : [];
  }, [searchQuery, searchIndex, products]);

  return filteredProducts;
};

export default useSearch;
