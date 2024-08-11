import TaskSheet from "@/components/board/taskSheet";
import Board from "@/components/board/board";
import { dummyData } from "@/utils/dummyData";
import { Button } from "@nextui-org/react";
import { EditIcon, UserRoundPlusIcon } from "lucide-react";

const fetchProjectDetails = async (projectId: string) => {
  return dummyData.find((project) => project._id === projectId);
};

export default async function Home({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await fetchProjectDetails(params.projectId);

  return (
    <>
      <section className="w-full flex justify-between items-center mt-4 mb-8">
        <div className="flex-col">
          <h1 className="text-2xl font-semibold">{project?.name}</h1>
          <h3 className="text-sm">{project?.description}</h3>
        </div>
        <div className="flex gap-2">
          <button className="px-2">
            <EditIcon width={20} />
          </button>
          <Button startContent={<UserRoundPlusIcon width={10} />} className="bg-white border-1">
            Add Collaborators
          </Button>
          <TaskSheet title={"Add New Task"} />
        </div>
      </section>
      <hr />
      <section>
        <Board {...project} />
      </section>
    </>
  );
}
