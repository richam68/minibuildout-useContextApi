// src/components/StatCard.jsx
const StatCard = ({ label, value, prefix = "", suffix = "" }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-xl font-semibold">
        {prefix}
        {value}
        {suffix}
      </h2>
    </div>
  );
};

export default StatCard;
