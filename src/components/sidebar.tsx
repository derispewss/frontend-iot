"use client";

import Image from "next/image";
import Logo from "@/assets/image/Logo.png";
import { KoHo } from "next/font/google";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const koho = KoHo({
  subsets: ["latin"],
  weight: ["400"],
});

const MENU_ITEMS = [
  { label: "Dashboard", icon: "akar-icons:dashboard", path: "/dashboard" },
  { label: "Schedule", icon: "uil:schedule", path: "/schedule" },
];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = () => {
    if (typeof window !== "undefined") {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile && window.innerWidth <= 1280) {
        setIsCollapsed(true);
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  if (isMobile === null) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {!isMobile && (
        <aside
          className={`bg-muted-foreground h-screen text-white transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-20" : "w-64"
          } flex flex-col shadow-lg`}>
          <div className="flex flex-row items-center justify-center py-6">
            <Image src={Logo} alt="EcoTrack Logo" className="w-10 h-12" />
            {!isCollapsed && (
              <h1 className={`${koho.className} text-2xl pl-2.5 font-bold`}>
                EcoTrack
              </h1>
            )}
          </div>

          <button
            className="mx-auto text-sm text-gray-400 hover:text-white flex items-center gap-1 py-2 px-3 rounded-md hover:bg-muted/20 transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <Icon
              icon={isCollapsed ? "ph:caret-right" : "ph:caret-left"}
              className="w-4 h-4"
            />
            {!isCollapsed && <span>Collapse</span>}
          </button>

          <nav className="flex flex-col space-y-1 mt-6 px-3 flex-grow">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-gray-200 hover:bg-muted/20"
                }`}
                aria-current={isActive(item.path) ? "page" : undefined}>
                <Icon
                  icon={item.icon}
                  className={`w-6 h-6 ${isCollapsed ? "mx-auto" : "mr-3"}`}
                  aria-hidden="true"
                />
                {!isCollapsed && (
                  <span className="text-base">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
        </aside>
      )}

      {isMobile && (
        <>
          <div className="fixed top-0 left-0 w-full bg-muted-foreground text-white z-40 shadow-md h-16 flex items-center px-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-muted/20"
              aria-label="Toggle navigation menu">
              <Icon
                icon={isOpen ? "heroicons:x-mark" : "heroicons:bars-3"}
                className="w-6 h-6"
              />
            </button>
            <div className="flex items-center ml-3">
              <Image src={Logo} alt="EcoTrack Logo" className="w-7 h-9" />
              <h1 className={`${koho.className} text-xl pl-2 font-bold`}>
                EcoTrack
              </h1>
            </div>
          </div>
          <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpen(false)} />
          
          <div className={`fixed left-0 top-0 h-full bg-muted-foreground w-64 z-40 shadow-xl transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-4 h-16 flex items-center border-b border-muted/20">
              <Image src={Logo} alt="EcoTrack Logo" className="w-7 h-9" />
              <h1 className={`${koho.className} text-xl pl-2 font-bold text-white`}>
                EcoTrack
              </h1>
            </div>

            <nav className="p-4 space-y-1">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-white"
                      : "text-gray-200 hover:bg-muted/20"
                  }`}
                  onClick={() => setIsOpen(false)}>
                  <Icon
                    icon={item.icon}
                    className="w-6 h-6 mr-3"
                    aria-hidden="true"
                  />
                  <span className="text-base">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      <main className={`flex-1 overflow-auto ${isMobile ? "pt-16 pb-16" : ""}`}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
