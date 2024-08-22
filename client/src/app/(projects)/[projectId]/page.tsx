import TaskSheet from "@/components/board/taskSheet";
import Board from "@/components/board/board";
import { Button } from "@nextui-org/react";
import { EditIcon, UserRoundPlusIcon } from "lucide-react";
import { fetchProject } from "@/action/project";

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
          <form className="flex w-full justify-between">
            <div className="flex flex-col w-full bg-neutral-50/45">
              <input
                className="text-2xl font-semibold bg-neutral-50/45"
                disabled
                value={project?.name}
                placeholder="Enter title..."
              />
              <input
                className="text-sm bg-neutral-50/45"
                disabled
                value={project?.description}
                placeholder="Enter a description..."
              />
            </div>
            <button className="px-2">
              <EditIcon width={20} />
            </button>
          </form>
          <div className="flex gap-2">
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
