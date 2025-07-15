import clsx from "clsx";
import { useState } from "react";
// icons
import { GoHome } from "react-icons/go";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";


import { LuUsers } from "react-icons/lu";
import { useLocation } from "react-router-dom";

interface SideNavItemType {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const sidebarItems: SideNavItemType[] = [
  {
    icon: <GoHome />,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: <AiFillProduct />,
    label: "Product",
    href: "/pim/products"
  },
  {
    icon: <MdOutlineCategory />,
    label: "Category",
    href: "/pim/categories"
  },
  {
    icon: <LuUsers />,
    label: "User",
    href: "/users"
  },
];

export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={clsx(
        "relative min-h-screen max-h-screen overflow-y-auto md:pr-8 pr-3 pt-2 flex flex-col gap-3 border-r-[1px] px-[10px]",
        isSidebarOpen ? "md:w-[300px]" : "md:w-[80px]"
      )}
    >
      {/* Logo */}
      <a href="/" className="text-[30px] flex items-center gap-3 px-2 py-1">
        <div
          className={clsx(
            "flex items-center justify-center bg-gray-200 rounded-full transition-all duration-300",
            isSidebarOpen ? "w-[60px] h-[60px]" : "w-[40px] h-[40px]"
          )}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className={clsx(
              "transition-all duration-300",
              isSidebarOpen ? "w-[40px] h-[40px]" : "w-[24px] h-[24px]"
            )}
          />
        </div>
        {isSidebarOpen && (
          <span className="text-xl font-semibold whitespace-nowrap">Shop</span>
        )}
      </a>

      {/* Items */}
      {sidebarItems.map((d, i) => (
        <SideNavItem
          key={i}
          icon={d.icon}
          href={d.href}
          isSidebarOpen={isSidebarOpen}
          label={d.label}
        />
      ))}

      {/* Toggle button – fixed to right edge */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className={clsx(
          "absolute top-1/9 -translate-y-1/2 z-9999 right-[-16px] z-50 bg-white border border-gray-300 rounded-full p-2 shadow-md transition-all z-50",
          isSidebarOpen ? "text-2xl" : "text-xl rotate-180"
        )}
      >
        <RiArrowLeftDoubleFill className="text-gray-500" />
      </button>
    </div>
  );
}

function SideNavItem({
  href,
  isSidebarOpen,
  icon,
  label
}: SideNavItemType & { isSidebarOpen: boolean }) {
  const location = useLocation();
  const pathname = location.pathname
  const isActivePage = pathname == href;
  return (
    <a
      href={href}
      className="flex gap-2 items-center cursor-pointer px-[10px] hover:bg-[#d5dce6] rounded-[6px]"
    >
      <div className="w-[35px] h-[35px] text-3xl flex items-center justify-items-center">
        {icon}
      </div>
      {isSidebarOpen && (
        <p
          className={clsx(
            "text-xl md:block pr-4  transition-all ",
            isActivePage && "font-bold"
          )}
        >
          {label}
        </p>
      )}
    </a>
  );
}