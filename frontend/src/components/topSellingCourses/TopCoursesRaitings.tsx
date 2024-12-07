interface Props {
    course: {
        rating: number;
    }
};

const SmallCourseRaitings = ({course}: Props) => {
    return (
        <div>
           
            <div className="flex items-center mt-5">
                <span className="text-yellow-500 text-lg">
                    {"★".repeat(Math.floor(course.rating))} 
                </span>
                <span className="text-gray-400 text-lg">
                    {"☆".repeat(5 - Math.floor(course.rating))} 
                </span>
                <span className="ml-2 text-sm text-gray-600">
                    ({course.rating.toFixed(1)}) 
                </span>
            </div>
        </div>
    );
};

export default SmallCourseRaitings;