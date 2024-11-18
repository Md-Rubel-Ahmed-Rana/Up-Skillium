import { Form, FormInstance, InputNumber } from "antd/lib";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  form: FormInstance;
};

const CoursePrices = ({ form }: Props) => {
  const [calculatedSalePrice, setCalculatedSalePrice] = useState(0);

  const handleInputChange = (field: string, value: number | null) => {
    const parsedValue = value || 0;

    const originalPrice = form.getFieldValue(["price", "original"]) || 0;
    const discountPercentage = form.getFieldValue(["price", "discount"]) || 0;

    if (field === "discount" && (parsedValue < 0 || parsedValue > 100)) {
      toast.error("Discount must be between 0 and 100.");
      return;
    }

    let newSalePrice = originalPrice;

    if (field === "original") {
      newSalePrice = parsedValue - (parsedValue * discountPercentage) / 100;
    } else if (field === "discount") {
      newSalePrice = originalPrice - (originalPrice * parsedValue) / 100;
    }

    setCalculatedSalePrice(parseFloat(newSalePrice.toFixed(2)));
    form.setFieldsValue({ ["price"]: { salePrice: newSalePrice.toFixed(2) } });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Original Price */}
      <Form.Item
        label="Original Price"
        name={["price", "original"]}
        rules={[{ required: true, message: "Please enter the original price" }]}
      >
        <InputNumber
          placeholder="Original Price"
          min={0}
          className="w-full"
          onChange={(value) => handleInputChange("original", value)}
        />
      </Form.Item>

      <Form.Item
        label="Discount (%)"
        name={["price", "discount"]}
        rules={[
          {
            required: true,
            message: "Please enter the discount percentage",
          },
        ]}
      >
        <InputNumber
          placeholder="Discount"
          min={0}
          max={100}
          className="w-full"
          onChange={(value) => handleInputChange("discount", value)}
        />
      </Form.Item>

      <Form.Item
        label="Sale Price"
        name={["price", "salePrice"]}
        rules={[{ required: true, message: "Please enter the sale price" }]}
      >
        <InputNumber
          placeholder="Sale Price"
          min={0}
          className="w-full"
          value={calculatedSalePrice}
          readOnly
        />
      </Form.Item>
    </div>
  );
};

export default CoursePrices;
