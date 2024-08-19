import { Profile } from "../../../components/nav/profile";
import ProjectForm from "../../../components/nav/projectForm";
import SidebarItems from "../../../components/nav/sidebarItems";
import { getAllProjects } from "@/action/project";

export async function Sidebar() {
  const data = await getAllProjects();
  
  return (
    <nav className="flex-0 p-4 space-y-2 flex-grow-0 max-w-80 overflow-auto bg-neutral-50 border-r-1">
      <Profile />
      <hr />
      <ProjectForm />
      <SidebarItems Items={data.projects} />
    </nav>
  );
}
