import { Button, Dropdown, MenuProps } from "antd/lib";

const MyStuDropdown = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <div className="mt-5 ml-6">
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Button>...</Button>
      </Dropdown>
    </div>
  );
};

export default MyStuDropdown;
