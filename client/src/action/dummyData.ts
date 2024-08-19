// User type
type User = {
  _id: string;
  name: string;
};

// Comment type
type Comment = {
  _id: string;
  by: User;
  content: string;
  date: string;
};

// Task type
export type Task = {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  startDate: Date;
  endDate: Date;
  position: number;
  commentCount: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

// Column type
export type Column = {
  _id: string;
  position: number;
  name: string;
  tasks: Task[];
  theme: string;
};

// CollaboratorRole type
type CollaboratorRole = "Admin" | "Edit" | "View" | "Comment";

// Collaborator type
type Collaborator = {
  _id: string;
  user: User;
  role: CollaboratorRole;
};

// Project type
export type Project = {
  _id: string;
  name: string;
  description?: string;
  columns?: Column[];
  collaborators?: Collaborator[];
  createdAt: string;
  updatedAt: string;
};

// Array of Projects
export type DummyData = Project[];

export const dummyData: DummyData = [
  {
    _id: "64d1f4e5f67d4f001c85d5a1",
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
            startDate: new Date("2024-08-01T00:00:00.000Z"),
            endDate: new Date("2024-08-08T00:00:00.000Z"),
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
  },
  {
    _id: "64d1f4e5f67d4f001c85d5ad",
    name: "Mobile App Development",
    description: "Develop a new mobile app for the e-commerce platform",
    columns: [
      {
        _id: "64d1f4e5f67d4f001c85d5ae",
        position: 1,
        name: "To Do",
        tasks: [],
        theme: "purple",
      },
      {
        _id: "64d1f4e5f67d4f001c85d5af",
        position: 2,
        name: "In Progress",
        tasks: [],
        theme: "orange",
      },
      {
        _id: "64d1f4e5f67d4f001c85d5b0",
        position: 3,
        name: "Done",
        tasks: [],
        theme: "rose",
      },
    ],
    collaborators: [
      {
        _id: "64d1f4e5f67d4f001c85d5b1",
        user: {
          _id: "64d1f4e5f67d4f001c85d5a7",
          name: "Alice Johnson",
        },
        role: "View",
      },
      {
        _id: "64d1f4e5f67d4f001c85d5b2",
        user: {
          _id: "64d1f4e5f67d4f001c85d5a8",
          name: "Bob Smith",
        },
        role: "Comment",
      },
    ],
    createdAt: "2024-07-20T08:00:00.000Z",
    updatedAt: "2024-07-25T08:00:00.000Z",
  },
];
