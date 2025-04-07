"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";
    return isHome ? <>{children}</> : <Sidebar>{children}</Sidebar>;
}
