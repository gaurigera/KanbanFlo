"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItemProps {
  _id: string;
  name: string;
}

export default function SidebarItem(Item: SidebarItemProps) {
  const projectPath = `/${Item._id}`;

  const pathname = usePathname();
  const isActive = pathname === projectPath;
  return (
    <>
      <Link
        href={projectPath}
        className={clsx("text-sm w-full", isActive && "font-bold")}
      >
        <div className="flex justify-between">
          <span className="max-w-32 text-nowrap overflow-hidden text-ellipsis">
            {Item.name}
          </span>
          {isActive && <span className="w-3 h-3">⭐</span>}
        </div>
      </Link>
    </>
  );
}
