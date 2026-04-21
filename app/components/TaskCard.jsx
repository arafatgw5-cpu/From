"use client";

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
    <div className="group relative w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition duration-300"></div>

      {/* Top */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100">
          <DollarSign className="size-5 text-indigo-600" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
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
      <h2 className="relative mb-2 text-lg font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition">
        {title}
      </h2>

      {/* Description */}
      <p className="relative mb-5 text-sm leading-6 text-slate-500 line-clamp-2">
        {description}
      </p>

      {/* Divider */}
      <div className="border-t border-slate-100 mb-4"></div>

      {/* Bottom */}
      <div className="relative flex items-center justify-between">

        {/* Priority Badge */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            priority === "high"
              ? "bg-red-100 text-red-600"
              : priority === "medium"
              ? "bg-orange-100 text-orange-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {priority}
        </span>

        {/* Button Link */}
        <Link
          href={`/tasks/${id}`}
          className="text-sm font-medium text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all"
        >
          Details
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;