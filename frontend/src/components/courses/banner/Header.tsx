import SectionHeader from "@/components/home/SectionHeader";

const Header = () => {
  return (
    <SectionHeader
      titleText="Welcome to Our Learning Platform"
      descText="Unlock your potential with our expertly designed courses."
      titleStyles="lg:text-5xl text-lg font-extrabold mb-4 leading-tight"
      descStyles="lg:text-lg text-sm"
    />
  );
};

export default Header;
