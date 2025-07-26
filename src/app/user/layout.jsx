"use client";
import { FaSearch, FaMicrophone, FaUser } from "react-icons/fa";
import react,{ useState } from "react";

const userlayout=()=> {
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [egg, setEgg] = useState(false);

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">

      {/* Header */}
      <div className="flex items-center bg-gray-100 border rounded-md px-4 py-2 shadow-sm space-x-2">
        <FaSearch className="text-gray-600" />
        <input
          type="text"
          placeholder="Search Here"
          className="flex-1 bg-transparent outline-none px-2 text-gray-700 placeholder-gray-500"
        />
        <FaMicrophone className="text-gray-600 cursor-pointer" />
        <FaUser className="text-gray-600 cursor-pointer ml-2" />
      </div>

      {/* Toggle Filters */}
      <div className="flex justify-between px-4">
        {/* Veg */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-700">Veg</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={veg}
              onChange={() => setVeg(!veg)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition-all">
              <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transition-transform ${veg ? "translate-x-5" : ""}`}></div>
            </div>
          </label>
        </div>

        {/* Non Veg */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-700">Non Veg</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={nonVeg}
              onChange={() => setNonVeg(!nonVeg)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-red-500 relative transition-all">
              <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transition-transform ${nonVeg ? "translate-x-5" : ""}`}></div>
            </div>
          </label>
        </div>

        {/* Egg */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-700">Egg</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={egg}
              onChange={() => setEgg(!egg)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-yellow-500 relative transition-all">
              <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 transition-transform ${egg ? "translate-x-5" : ""}`}></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}


export default userlayout