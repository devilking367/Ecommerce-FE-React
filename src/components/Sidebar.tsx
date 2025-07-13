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

const sidebarItmes: SideNavItemType[] = [
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
      className={ clsx(
        "min-h-screen max-h-screen overflow-y-auto w-fit md:pr-8 pr-3 pt-2 flex flex-col gap-3 border-r-[1px] px-[10px]",
        isSidebarOpen && "md:w-[300px]"
      )}
    >
      <>
        <a href={"/"} className="text-[30px]">
          Ecommerce
        </a>
      </>

      {sidebarItmes.map((d, i) => (
        <SideNavItem
          key={i}
          icon={d.icon}
          href={d.href}
          isSidebarOpen={isSidebarOpen}
          label={d.label}
        />
      ))}

      <section
        className={clsx(
          "hidden md:flex w-ful  justify-end",
          !isSidebarOpen && "justify-start"
        )}
      >
        <>
          <RiArrowLeftDoubleFill
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className={clsx(
              "text-gray-400 transition-all text-4xl",
              !isSidebarOpen && "rotate-180"
            )}
          />
        </>
      </section>
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