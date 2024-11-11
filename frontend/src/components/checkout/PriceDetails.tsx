import { Typography } from "antd/lib";

const { Title, Text } = Typography;

type Props = {
  price: { original: number; discount: number; salePrice: number };
};

const PriceDetails = ({ price }: Props) => {
  return (
    <div className="mb-4">
      <Title level={4}>Price Details</Title>
      <div className="flex justify-between">
        <Text className="text-gray-600">Original Price:</Text>
        <Text delete className="text-gray-500">
          ${price?.original.toFixed(2)}
        </Text>
      </div>
      <div className="flex justify-between">
        <Text className="text-gray-600">Discount:</Text>
        <Text className="text-red-500">-${price?.discount.toFixed(2)}</Text>
      </div>
      <div className="flex justify-between font-semibold text-lg">
        <Text>Total:</Text>
        <Text>${price?.salePrice?.toFixed(2)}</Text>
      </div>
    </div>
  );
};

export default PriceDetails;
