import { FaStar } from "react-icons/fa";
import LearnMoreBtn from "./LearnMoreBtn";
import SidebarIcons from "./SidebarIcons";
import SmallCourseRaitings from "./TopCoursesRaitings";

interface SmallCardProps {
    course: {
        id: number;
        imageUrl: string;
        title: string;
        description: string;
        rating: number;
    };
}

const handleLeraMore = () => {
    alert("Hi learn more button");
};

const SmallCourses = ({ course }: SmallCardProps) => (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden relative group">
        <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-40 object-cover"
        />
        <FaStar className="text-6xl text-yellow-500 absolute top-0 right-0" />
        <div className="p-4">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm mt-2">{course.description}</p>
            <SmallCourseRaitings key={course.id} course={course} />
            <LearnMoreBtn onClick={handleLeraMore} />
        </div>
        <SidebarIcons />
    </div>
);

export default SmallCourses;
