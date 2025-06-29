import { ICart } from "@/types/cart.type";
import { Divider } from "antd/lib";
import CartCheckoutButton from "./CartCheckoutButton";

type Props = {
  items: ICart[];
};

const PricesCalculate = ({ items }: Props) => {
  const totalOriginal = items.reduce(
    (sum, item) => sum + item.course.price.original,
    0
  );
  const totalSale = items.reduce(
    (sum, item) => sum + item.course.price.salePrice,
    0
  );
  const totalDiscount = totalOriginal - totalSale;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Subtotal:</span>
        <span>${totalOriginal.toFixed(2)}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "green",
        }}
      >
        <span>Discount:</span>
        <span>- ${totalDiscount.toFixed(2)}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        <span>Total:</span>
        <span>${totalSale.toFixed(2)}</span>
      </div>
      <CartCheckoutButton />
    </div>
  );
};

export default PricesCalculate;
