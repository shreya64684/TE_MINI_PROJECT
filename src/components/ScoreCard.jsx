const ScoreCard = ({ title, value, percentage, increase, icon }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-700 font-semibold">{title}</h3>
          <span className="text-gray-500">{icon}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        <p className={`text-sm mt-1 ${increase ? "text-green-500" : "text-red-500"}`}>
          {increase ? `+${percentage}%` : `-${percentage}%`} from last month
        </p>
      </div>
    );
  };
  
  export default ScoreCard;



