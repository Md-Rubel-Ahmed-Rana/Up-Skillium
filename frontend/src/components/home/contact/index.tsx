import ContactForm from "./ContactForm";
import ContactHeader from "./ContactHeader";

const ContactUs = () => {
  return (
    <div className="border-t border-gray-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-2">
      <ContactHeader />
      <ContactForm />
    </div>
  );
};

export default ContactUs;
