import AddTaskItem from "@/components/addTaskItem";
import { Button, User } from "@nextui-org/react";
import Link from "next/link";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex">
      <nav className="flex-0 p-4 space-y-2">
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
        <hr />
        <div className="flex justify-between">
          <h1 className="font-bold">Projects</h1>
          <button>+</button>
        </div>
        <div className="flex flex-col">
          <Link href="#">A</Link>
          <Link href="#">B</Link>
          <Link href="#">C</Link>
        </div>
      </nav>
      <section>{children}</section>
    </section>
  );
}
