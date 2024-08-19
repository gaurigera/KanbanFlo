import TaskSheet from "@/components/board/taskSheet";
import Board from "@/components/board/board";
import { Button } from "@nextui-org/react";
import { EditIcon, UserRoundPlusIcon } from "lucide-react";
import { fetchProject } from "@/action/project";
import { Sidebar } from "./sidebar";

export default async function Home({
  params,
}: {
  params: { projectId: string };
}) {
  const { project } = await fetchProject(params.projectId);

  return (
    <section className="flex h-screen">
      <section className="flex-1 p-5 space-y-3 bg-neutral-50/45">
        <section className="w-full flex justify-between items-center mt-4 mb-8">
          <div className="flex-col">
            <h1 className="text-2xl font-semibold">{project?.name}</h1>
            <h3 className="text-sm">{project?.description}</h3>
          </div>
          <div className="flex gap-2">
            <button className="px-2">
              <EditIcon width={20} />
            </button>
            <Button
              startContent={<UserRoundPlusIcon width={10} />}
              className="bg-white border-1"
            >
              Add Collaborators
            </Button>
            <TaskSheet title={"Add New Task"} />
          </div>
        </section>
        <hr />
        <section>
          <Board {...project} />
        </section>
      </section>
    </section>
  );
}
