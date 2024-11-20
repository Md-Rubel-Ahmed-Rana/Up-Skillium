import MyStuDropdown from "./MyStuDropdown";

const StudentList: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="px-4 py-3 font-semibold uppercase text-xs md:text-sm">
                Image
              </th>
              <th className="px-4 py-3 font-semibold uppercase text-xs md:text-sm">
                Student Name
              </th>
              <th className="px-4 py-3 font-semibold uppercase text-xs md:text-sm">
                Student Email
              </th>
              <th className="px-4 py-3 font-semibold uppercase text-xs md:text-sm">
                Roll
              </th>
              <th className="px-4 py-3 font-semibold uppercase text-xs md:text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-4 py-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Student"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
                />
              </td>
              <td className="px-4 py-3 text-gray-700 font-medium text-xs md:text-sm">
                John Doe
              </td>
              <td className="px-4 py-3 text-gray-700 font-medium text-xs md:text-sm">
                john.doe@example.com
              </td>
              <td className="px-4 py-3 text-gray-700 text-xs md:text-sm">
                101
              </td>

              <MyStuDropdown />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
