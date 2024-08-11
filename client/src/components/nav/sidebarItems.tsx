import SidebarItem, { SidebarItemProps } from "./sidebarItem";

export default function SidebarItems({ Items }: { Items: SidebarItemProps[] }) {
  return (
    <>
      {Items.map((item, index) => (
        <div className="flex-col gap-1" key={index}>
          <SidebarItem {...item} />
        </div>
      ))}
    </>
  );
}
