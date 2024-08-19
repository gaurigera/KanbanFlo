export const getTask = async (taskId: string | null) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = result.json();
  return data;
};

const addTask = async (projectId: string, columndId: string, task) => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${projectId}/column/${columndId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: task
    }
  );

  const data = result.json();
  return data;
};
