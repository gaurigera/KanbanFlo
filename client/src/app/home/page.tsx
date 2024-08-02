import { User } from "@nextui-org/react";

export default function home() {
  return (
    <>
      <div className="bg-blue-300">hi</div>
      <User
        name="Jane Doe"
        description="Product Designer"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        }}
      />
    </>
  );
}
