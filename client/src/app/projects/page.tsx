import AddTaskItem from "@/components/board/addTaskItem";
import Board from "@/components/board/board";

export default function home() {
  return (
    <>
      <section className="w-full flex">
        <AddTaskItem title={"Add New Task"} className={`ml-auto`} />
      </section>
      <Board />
    </>
  );
}
