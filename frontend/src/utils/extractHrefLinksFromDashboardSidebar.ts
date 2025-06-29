import { MenuProps } from "antd/lib";
import Link from "next/link";
import { isValidElement } from "react";

const extractHrefLinksFromDashboardSidebar = (
  items: MenuProps["items"]
): string[] => {
  const hrefs: string[] = [];

  const recurse = (menuItems: MenuProps["items"]) => {
    if (!menuItems) return;

    for (const item of menuItems) {
      if (!item) continue;

      if ("label" in item) {
        const label = item.label;
        if (isValidElement(label) && label.type === Link && label.props?.href) {
          hrefs.push(label.props.href);
        }
      }

      if ("children" in item && Array.isArray(item.children)) {
        recurse(item.children);
      }
    }
  };

  recurse(items);
  return hrefs;
};

export default extractHrefLinksFromDashboardSidebar;
