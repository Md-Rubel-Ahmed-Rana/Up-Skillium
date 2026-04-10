const buildPathToKeyMap = (items: any): { [key: string]: string } => {
  const map: { [key: string]: string } = {};

  const traverseItems = (menuItems: any, parentKey = "") => {
    if (!menuItems) return;

    menuItems.forEach((item: any) => {
      if (!item) return;

      const currentKey = item?.key as string;

      if (
        item?.label &&
        typeof item?.label === "object" &&
        "props" in item?.label
      ) {
        const link = item?.label?.props?.href;
        if (link) {
          map[link] = parentKey ? `${parentKey}-${currentKey}` : currentKey;
        }
      }

      if (item?.children) {
        traverseItems(item?.children, currentKey);
      }
    });
  };

  traverseItems(items);
  return map;
};

export default buildPathToKeyMap;
