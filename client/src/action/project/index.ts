export const fetchProject = async (projectId: string) => {
  try {
    const result = await fetch(`${process.env.API_URL}/project/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = result.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export const getAllProjects = async () => {
  const result = await fetch(`${process.env.API_URL}/project`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = result.json();
  return data;
};

export const addProject = async (name: string) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  const data = await result.json();
  console.log(data);
  
  return data;
};
