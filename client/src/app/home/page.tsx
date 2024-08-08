import AddTaskItem from "@/components/addTaskItem";
import TaskItem from "@/components/taskItem";

export default function home() {
  return (
    <>
      <AddTaskItem title={"Add New Task"} />
      <TaskItem />
    </>
  );
}
