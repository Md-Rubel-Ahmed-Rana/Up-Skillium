import { Button, Form, Input } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleContact = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Your message has been sent!");
      form.resetFields();
    }, 2000);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleContact}
      className="space-y-4 max-w-3xl mx-auto mt-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-8"
      size="large"
    >
      <Form.Item
        name="name"
        label={<span className="text-white">Your Name</span>}
        rules={[
          { required: true, message: "Please enter your name" },
          { min: 3, message: "Name must be at least 3 characters" },
        ]}
      >
        <Input
          placeholder="Enter your full name"
          className="bg-gray-100 text-gray-900"
        />
      </Form.Item>
      <Form.Item
        name="email"
        label={<span className="text-white">Email Address</span>}
        rules={[
          { required: true, message: "Please enter your email address" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input
          placeholder="Enter your email address"
          className="bg-gray-100 text-gray-900"
        />
      </Form.Item>
      <Form.Item
        name="message"
        label={<span className="text-white">Message</span>}
        rules={[{ required: true, message: "Please enter your message" }]}
      >
        <Input.TextArea
          placeholder="Write your message here"
          rows={5}
          className="bg-gray-100 text-gray-900 resize-none"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:to-red-400 text-white"
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
