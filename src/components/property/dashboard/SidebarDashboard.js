"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // Importowanie funkcji signOut

const SidebarDashboard = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" }); // Wylogowanie i przekierowanie na stronę logowania
  };

  const sidebarItems = [
    {
      title: "PANEL GŁÓWNY",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
        {
          href: "/dashboard-add-property",
          icon: "flaticon-new-tab",
          text: "Dodaj nową nieruchomość",
        },
        {
          href: "/dashboard-add-activity",
          icon: "flaticon-new-tab",
          text: "Dodaj nową aktywność",
        },
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "Lista nieruchomości",
        },
        {
          href: "/dashboard-my-activities",
          icon: "flaticon-home",
          text: "Lista aktywności",
        },
        {
          href: "#", // Ustawienie href na "#" ponieważ używamy funkcji onClick do wylogowania
          icon: "flaticon-logout",
          text: "Wyloguj",
          onClick: handleLogout, // Dodanie obsługi wylogowania
        },
      ],
    },
  ];

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  href={item.href}
                  onClick={item.onClick} // Dodanie funkcji onClick dla pozycji wylogowania
                  className={`items-center ${
                    pathname === item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
