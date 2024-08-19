export const fetchProject = async (projectId: string) => {
  try {
    const result = await fetch(`${process.env.API_URL}/project/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = result.json();
    return data
  } catch (error) {
    return { error };
  }
};
