const MyClassesItems = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Classes</h1>
        <div>
          <span>Total Classes: 10</span> | <span>Upcoming: 3</span> |{" "}
          <span>Live: 2</span>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search classes..."
          className="border rounded px-4 py-2"
        />
        <select className="border rounded px-4 py-2">
          <option>All</option>
          <option>Live</option>
          <option>Completed</option>
          <option>Upcoming</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-semibold">Class Name</h3>
          <p className="text-gray-600">Course: JavaScript Basics</p>
          <p className="text-gray-600">Date: 20 Nov 2024, 10:00 AM</p>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
            Live
          </span>
          <div className="mt-4 flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              View Details
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassesItems;
