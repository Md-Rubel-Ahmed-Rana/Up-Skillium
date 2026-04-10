import { ICart } from "@/types/cart.type";
import Image from "next/image";
import RemoveCartItem from "./RemoveCartItem";

type Props = {
  item: ICart;
};

const CartItem = ({ item }: Props) => {
  return (
    <div
      key={item?.id}
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        alignItems: "center",
        background: "#fafafa",
      }}
    >
      <Image
        src={item?.course?.image}
        alt={item?.course?.title}
        width={64}
        height={64}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{item?.course?.title}</div>
        <div style={{ color: "#555", fontSize: 13 }}>
          <span style={{ textDecoration: "line-through", marginRight: 6 }}>
            ${item?.course?.price?.original.toFixed(2)}
          </span>
          <span style={{ color: "green" }}>
            ${item?.course?.price?.salePrice.toFixed(2)}
          </span>
        </div>
      </div>
      <RemoveCartItem cartId={item?.id} />
    </div>
  );
};

export default CartItem;
