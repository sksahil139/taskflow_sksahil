import { apiClient } from "@/lib/api-client";
import type {
  CreateProjectInput,
  Project,
  ProjectDetail,
  ProjectListResponse,
} from "./projects-types";

export function getProjects() {
  return apiClient<ProjectListResponse>("/projects");
}

export function createProject(payload: CreateProjectInput) {
  return apiClient<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProject(projectId: string) {
  return apiClient<ProjectDetail>(`/projects/${projectId}`);
}