import { create } from "zustand";
import { Project } from "@/utils/dummyData";

export interface Store {
  data: Project;
  setData: (newData: Project) => void;
}

export const initProjectStore = (): Project => {
  return {
    "_id": "64d1f4e5f67d4f001c85d5a1",
    name: "Website Redesign",
    description: "Redesign the corporate website to improve user experience",
    columns: [
      {
        _id: "64d1f4e5f67d4f001c85d5a2",
        position: 1,
        name: "To Do",
        tasks: [
          {
            _id: "64d1f4e5f67d4f001c85d5a3",
            title: "Design the homepage",
            description: "Create the design for the homepage",
            priority: "Low",
            startDate: "2024-08-01T00:00:00.000Z",
            endDate: "2024-08-08T00:00:00.000Z",
            position: 1,
            commentCount: 1,
            comments: [
              {
                _id: "64d1f4e5f67d4f001c85d5a4",
                by: {
                  _id: "64d1f4e5f67d4f001c85d5a7",
                  name: "Alice Johnson",
                },
                content: "Make sure the design is responsive",
                date: "2024-08-01T12:00:00.000Z",
              },
            ],
            createdAt: "2024-08-01T08:00:00.000Z",
            updatedAt: "2024-08-02T08:00:00.000Z",
          },
        ],
        theme: "blue",
      },
      {
        _id: "64d1f4e5f67d4f001c85d5a9",
        position: 2,
        name: "In Progress",
        tasks: [
          {
            _id: "64d1f4e5f67d4f001c85d5a5",
            title: "Set up backend server",
            description: "Initialize the server with Express.js",
            priority: "Medium",
            startDate: "2024-08-01T00:00:00.000Z",
            endDate: "2024-08-15T00:00:00.000Z",
            position: 1,
            commentCount: 1,
            comments: [
              {
                _id: "64d1f4e5f67d4f001c85d5a6",
                by: {
                  _id: "64d1f4e5f67d4f001c85d5a8",
                  name: "Bob Smith",
                },
                content: "Use MongoDB as the database",
                date: "2024-08-02T12:00:00.000Z",
              },
            ],
            createdAt: "2024-08-01T08:30:00.000Z",
            updatedAt: "2024-08-02T09:00:00.000Z",
          },
        ],
        theme: "yellow",
      },
      {
        _id: "64d1f4e5f67d4f001c85d5aa",
        position: 3,
        name: "Done",
        tasks: [],
        theme: "rose",
      },
    ],
    collaborators: [
      {
        _id: "64d1f4e5f67d4f001c85d5ab",
        user: {
          _id: "64d1f4e5f67d4f001c85d5a7",
          name: "Alice Johnson",
        },
        role: "Admin",
      },
      {
        _id: "64d1f4e5f67d4f001c85d5ac",
        user: {
          _id: "64d1f4e5f67d4f001c85d5a8",
          name: "Bob Smith",
        },
        role: "Edit",
      },
    ],
    createdAt: "2024-08-01T08:00:00.000Z",
    updatedAt: "2024-08-02T08:00:00.000Z",
  }
};

const createProjectStore = (initData: Project) => {
  return create<Store>()((set) => ({
    data: initData,
    setData: (newData: Project) => set({ data: newData }),
  }));
};

export default createProjectStore;
