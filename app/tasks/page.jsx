import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ClipboardList, PlusCircle } from "lucide-react";

import { getTasks } from "../lib/task";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import { createATask } from "../lib/actions";

const Task = async () => {
  const tasks = await getTasks();

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
                <ClipboardList className="h-4 w-4" />
                Task Management
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                My Tasks
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Organize your work, manage priorities, and keep track of your
                progress in one clean place.
              </p>
            </div>

            {/* Right Stats + Action */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total Tasks
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-800">
                  {tasks?.length || 0}
                </h2>
              </div>

              <Link href="/tasks/new">
                <Button
                  className="h-11 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
                  startContent={<PlusCircle className="h-4 w-4" />}
                >
                  New Task
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Quick Add</h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a new task quickly and keep your workflow moving.
            </p>
          </div>

          <AddTask createATask={createATask} />
        </div>

        {/* Task Grid */}
        {tasks?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <ClipboardList className="h-8 w-8 text-slate-400" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-800">
              No tasks found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Start by creating your first task and build your workflow.
            </p>

            <div className="mt-6">
              <Link href="/tasks/new">
                <Button
                  className="rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
                  startContent={<PlusCircle className="h-4 w-4" />}
                >
                  Create First Task
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Task;