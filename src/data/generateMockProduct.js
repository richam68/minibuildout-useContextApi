const generateMockProducts = (count = 1000) => {
  const categories = ["Electronics", "Grocery", "Clothing", "Accessories"];
  const categorySet = new Set(categories); // Ensures uniqueness
  const productsMap = new Map();

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr?.length)];
  const getRandomPrice = () => +(Math.random() * 1000 + 100).toFixed(2); // ₹100 - ₹1100
  const getRandomStock = () => Math.floor(Math.random() * 100); // 0 - 99
  const getRandomStatus = () =>
    getRandom(["In Stock", "Out of Stock", "Limited"]);

  for (let i = 1; i <= count; i++) {
    const category = getRandom(Array.from(categorySet));
    const product = {
      id: i,
      name: `Product ${i}`,
      category,
      price: getRandomPrice(),
      stock: getRandomStock(),
      status: getRandomStatus(),
      image: `https://picsum.photos/seed/${i}/60/60`,
    };
    productsMap.set(i, product);
  }

  return {
    productsArray: Array.from(productsMap.values()), // For rendering in UI
    productsMap, // For fast access by ID
    categorySet, // Unique categories
  };
};

export default generateMockProducts;
