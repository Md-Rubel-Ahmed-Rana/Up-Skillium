interface Props {
    onClick: () => void;
}

const LearnMoreBtn = ({onClick}: Props) => {

    return (
        <div>
            <button
            onClick={onClick}
            className="mt-12 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
                Learn More
            </button>
        </div>
    );
};

export default LearnMoreBtn;