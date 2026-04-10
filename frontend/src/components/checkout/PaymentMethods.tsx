import { FaStripeS, FaPaypal } from "react-icons/fa";
import { Radio, RadioChangeEvent, Typography } from "antd/lib";

const { Title, Text } = Typography;

type Props = {
  setPaymentMethod: (value: string) => void;
  paymentMethod: string;
};

const PaymentMethods = ({ paymentMethod, setPaymentMethod }: Props) => {
  const handleSelectPaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="mb-6 w-full">
      <Title level={4}>Choose Payment Method</Title>
      <Radio.Group
        onChange={handleSelectPaymentMethod}
        value={paymentMethod}
        className="w-full flex flex-col lg:flex-row gap-2"
      >
        <Radio value="stripe" className="border-2 px-4 py-2 rounded-md w-full">
          <div className="flex items-center gap-2 w-full">
            <FaStripeS size={24} color="#6772e5" />
            <Text>Stripe</Text>
          </div>
        </Radio>
        <Radio value="paypal" className="border-2 px-4  py-2 rounded-md w-full">
          <div className="flex items-center gap-2 w-full">
            <FaPaypal size={24} color="#003087" />
            <Text>PayPal</Text>
          </div>
        </Radio>
      </Radio.Group>
      {paymentMethod === "paypal" && (
        <p className="text-red-500">
          PayPal is temporarily unavailable. We apologize for any inconvenience
          and are working to restore this payment option soon.
        </p>
      )}
    </div>
  );
};

export default PaymentMethods;
