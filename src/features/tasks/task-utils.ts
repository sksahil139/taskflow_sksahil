import type { TaskPriority, TaskStatus } from "@/types/common";

export const taskStatusOptions: Array<{ label: string; value: TaskStatus }> = [
  { label: "To do", value: "todo" },
  { label: "In progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

export const taskPriorityLabel: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const taskStatusLabel: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};