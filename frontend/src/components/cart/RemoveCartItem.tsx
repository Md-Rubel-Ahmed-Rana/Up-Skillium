import { Button } from "antd/lib";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  cartId: string;
};

const RemoveCartItem = ({ cartId }: Props) => {
  return <Button type="text" icon={<FaTrashAlt color="red" />} />;
};

export default RemoveCartItem;
