import { Box, DollarSign } from "react-feather";
import generateMockProducts from "../data/generateMockProduct";
import ProductTable from "../components/ProductTable";
import StatCard from "../components/StatsCard";

const { productsArray } = generateMockProducts(1000);

const Dashboard = () => {
  //total of products
  const totalProducts = productsArray?.length;
  const totalRevenue = productsArray?.reduce(
    (acc, product) => acc + product?.price * product?.stock,
    0
  );
  const limitedStockCount =
    productsArray?.filter((p) => p?.status === "Limited")?.length || 0;

  const inStockCount =
    productsArray?.filter((p) => p?.status === "In Stock")?.length || 0;

  const outOfStockCount =
    productsArray?.filter((p) => p?.status === "Out of Stock")?.length || 0;

  const uniqueCategories = new Set(productsArray?.map((p) => p?.category))
    ?.size;

  const stats = [
    { label: "Total Products", value: totalProducts, icon: <Box /> },
    {
      label: "Total Revenue",
      value: totalRevenue.toFixed(2),
      prefix: "₹",
      icon: <DollarSign />,
    },

    { label: "Categories", value: uniqueCategories },
    { label: "In Stock ", value: inStockCount },
    { label: "Out of Stock ", value: outOfStockCount },
    { label: "Limited Stock ", value: limitedStockCount },
  ];

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {stats?.map((stat, index) => (
          <StatCard
            key={index}
            label={stat?.label}
            value={stat?.value}
            prefix={stat?.prefix}
            suffix={stat?.suffix}
          />
        ))}
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <ProductTable />
      </div>
    </>
  );
};

export default Dashboard;
