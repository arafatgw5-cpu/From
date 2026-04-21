"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postTask } from "./task";

// 👉 create task (no redirect)
export const createATask = async (formData) => {
  const newTask = Object.fromEntries(formData.entries());

  console.log("New Task:", newTask);

  const res = await postTask(newTask);

  if (res.ok) {
    revalidatePath("/tasks");
  }

  return res;
};

// 👉 create + redirect
export const newTaskAction = async (formData) => {
  const newTask = Object.fromEntries(formData.entries());

  console.log("New Task:", newTask);

  const res = await postTask(newTask);

  if (res.ok) {
    revalidatePath("/tasks");
    redirect("/tasks"); // ✅ correct
  }

  return res;
};