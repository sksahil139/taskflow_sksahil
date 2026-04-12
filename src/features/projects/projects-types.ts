export interface Project {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: string;
}

export interface ProjectListResponse {
  projects: Project[];
}

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export interface ProjectDetail extends Project {
  tasks: {
    id: string;
    title: string;
    description?: string;
    status: "todo" | "in_progress" | "done";
    priority: "low" | "medium" | "high";
    project_id: string;
    assignee_id: string | null;
    due_date?: string | null;
    created_at: string;
    updated_at: string;
  }[];
}