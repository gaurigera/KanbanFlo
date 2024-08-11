import { dummyData } from "@/utils/dummyData";
import { Profile } from "./profile";
import ProjectForm from "./projectForm";
import SidebarItems from "./sidebarItems";

const fetchProjects = async (userId?:string) => {
  return dummyData;
}

export async function Sidebar() {
  const data = await fetchProjects()
  return (
    <nav className="flex-0 p-4 space-y-2 flex-grow-0 max-w-80 overflow-auto bg-neutral-50 border-r-1">
      <Profile />
      <hr />
      <ProjectForm />
      <SidebarItems Items={data}/>
    </nav>
  );
}
