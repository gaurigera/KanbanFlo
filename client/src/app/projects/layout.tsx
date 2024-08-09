import ProjectForm from "@/components/nav/projectForm";
import { User } from "@nextui-org/react";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex h-screen">
      <nav className="flex-0 p-4 space-y-2 flex-grow-0 max-w-80 overflow-auto">
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
        <hr />
        <ProjectForm />
      </nav>
      <section className="flex-1 p-5 space-y-3">{children}</section>
    </section>
  );
}
