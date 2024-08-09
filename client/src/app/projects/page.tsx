import AddTaskItem from "@/components/addTaskItem";
import Board from "@/components/board/board";

export default function home() {
  return (
    <>
      <AddTaskItem title={"Add New Task"} />
      <Board />
    </>
  );
}
