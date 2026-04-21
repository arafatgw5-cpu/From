import { DollarSign } from "lucide-react";
import Link from "next/link";
import React from "react";

const TaskCard = ({ task }) => {
  if (!task) return null;

  const {
    id,
    title = "No Title",
    description = "No description available",
    status = "pending",
    priority = "low",
  } = task;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:shadow-xl">
      
      {/* Top */}
      <div className="mb-4 flex items-center justify-between">
        <DollarSign className="size-6 text-indigo-500" />

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === "completed"
              ? "bg-green-100 text-green-600"
              : status === "in-progress"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Title */}
      <h2 className="mb-2 text-lg font-semibold text-slate-800">
        {title}
      </h2>

      {/* Description */}
      <p className="mb-4 text-sm leading-6 text-slate-500">
        {description}
      </p>

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold ${
            priority === "high"
              ? "text-red-500"
              : priority === "medium"
              ? "text-orange-500"
              : "text-green-500"
          }`}
        >
          {priority} priority
        </span>

        <Link
          href={`/tasks/${id}`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          Details →
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;