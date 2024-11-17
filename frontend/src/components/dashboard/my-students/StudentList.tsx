import React, { useState } from "react";

const StudentList: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setMenuVisible((prev) => (prev === id ? null : id));
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="px-6 py-4 font-semibold uppercase text-sm">
                Image
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-sm">
                Student Name
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-sm">
                Student Email
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-sm">
                Roll
              </th>
              <th className="px-6 py-4 font-semibold uppercase text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-6 py-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Student"
                  className="w-12 h-12 rounded-full shadow-md"
                />
              </td>
              <td className="px-6 py-4 text-gray-700 font-medium">John Doe</td>
              <td className="px-6 py-4 text-gray-700 font-medium">
                john.doe@example.com
              </td>
              <td className="px-6 py-4 text-gray-700">101</td>
              <td className="px-6 py-4 relative">
                <button
                  onClick={() => toggleMenu("1")}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl ml-8"
                >
                  ...
                </button>
                {menuVisible === "1" && (
                  <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 w-40">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                      Delete
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                      Edit
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                      View
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
