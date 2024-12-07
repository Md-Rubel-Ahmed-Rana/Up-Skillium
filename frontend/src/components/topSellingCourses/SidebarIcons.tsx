import { useState } from "react";
import { GrAnnounce, GrFavorite } from "react-icons/gr";

const SidebarIcons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnnounceClick = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <div className="absolute top-1/2 right-4 transform translate-x-20 -translate-y-1/2 flex flex-col gap-3 rounded-2xl opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-slate-200 p-2 shadow-lg mt-7">
        <GrFavorite className="text-2xl hover:text-cyan-500 duration-300 cursor-pointer" />
        <GrAnnounce
          className="text-2xl hover:text-cyan-500 duration-300 cursor-pointer"
          onClick={handleAnnounceClick}
        />
      </div>

   
      {isModalOpen && (
        <div>
        
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

        
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
              <h2 className="text-2xl font-bold mb-4">
                Why Top Rated Programming Courses Matter
              </h2>
              <p className="mb-4">
                Top-rated programming courses are curated to provide the most
                effective learning experiences. These courses are designed by
                industry experts who understand the current trends and
                requirements in software development.
              </p>
              <p className="mb-4">
                Enrolling in these courses can help you:
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    Gain in-demand skills like web development, data science,
                    or AI programming.
                  </li>
                  <li>Build real-world projects that showcase your expertise.</li>
                  <li>
                    Boost your career with certifications that are recognized
                    worldwide.
                  </li>
                  <li>Stay ahead of the curve with up-to-date content.</li>
                </ul>
              </p>
              <p>
                Whether youre a beginner or a seasoned developer, these courses
                will help you excel in your career and achieve your goals.
              </p>
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarIcons;
