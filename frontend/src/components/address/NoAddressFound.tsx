import { EnvironmentOutlined } from "@ant-design/icons";
import { Button, Result } from "antd/lib";

type Props = {
  message?: string;
  title?: string;
  buttonText?: string;
  onClick?: () => void;
};

const NoAddressFound = ({
  message = "Address not found or you are not authorized to access it.",
  title = "No Address Found",
  buttonText,
  onClick,
}: Props) => {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded border border-gray-200 bg-white p-6 shadow-sm">
      <div className="w-full max-w-xl">
        <Result
          icon={
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-500">
                <EnvironmentOutlined />
              </div>
            </div>
          }
          title={
            <span className="text-xl font-semibold text-gray-800">{title}</span>
          }
          subTitle={
            <p className="mx-auto max-w-md text-sm leading-6 text-gray-500">
              {message}
            </p>
          }
          extra={
            buttonText && onClick ? (
              <Button
                type="primary"
                size="large"
                onClick={onClick}
                className="rounded-lg px-6"
              >
                {buttonText}
              </Button>
            ) : null
          }
        />
      </div>
    </div>
  );
};

export default NoAddressFound;
