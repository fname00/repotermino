import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const ProSidebarContent = () => {
  const path = usePathname();

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {mobileMenuItems.map((item, index) => {
          // Check if the item has a subMenu
          if (item.subMenu && item.subMenu.length > 0) {
            return (
              <SubMenu
                key={index}
                className={isParentActive(item.subMenu, path) ? "active" : ""}
                label={item.label}
              >
                {item.subMenu.map((subItem, subIndex) => {
                  if (subItem.subMenu && subItem.subMenu.length > 0) {
                    return (
                      <SubMenu
                        key={subIndex}
                        label={subItem.label}
                        className={
                          isParentActive(subItem.subMenu, path) ? "active" : ""
                        }
                      >
                        {subItem.subMenu.map((nestedItem, nestedIndex) => (
                          <MenuItem
                            key={nestedIndex}
                            component={
                              <Link
                                className={
                                  nestedItem.path === path ? "active" : ""
                                }
                                href={nestedItem.path}
                              />
                            }
                          >
                            {nestedItem.label}
                          </MenuItem>
                        ))}
                      </SubMenu>
                    );
                  } else {
                    return (
                      <MenuItem
                        key={subIndex}
                        component={
                          <Link
                            className={
                              subItem.path === path ? "active" : ""
                            }
                            href={subItem.path}
                          />
                        }
                      >
                        {subItem.label}
                      </MenuItem>
                    );
                  }
                })}
              </SubMenu>
            );
          } else {
            // Render a simple MenuItem if no subMenu
            return (
              <MenuItem
                key={index}
                component={
                  <Link
                    className={item.path === path ? "active" : ""}
                    href={item.path}
                  />
                }
              >
                {item.label}
              </MenuItem>
            );
          }
        })}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
