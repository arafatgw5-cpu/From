"use client";

import React from "react";
import SelectItem from "@/app/components/SelectItem";
import { newTaskAction } from "@/app/lib/actions";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Button,
} from "react-aria-components";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

const NewTask = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-2xl">
        <Form
          action={newTaskAction}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
        >
          {/* Header */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6 md:px-8">
            <p className="mb-2 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Task Management
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Create New Task
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Fill in the details below to add a new task to your workflow.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-6 px-6 py-6 md:px-8 md:py-8">
            {/* Title */}
            <TextField name="title" isRequired className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Task Title
              </Label>
              <Input
                className={inputClass}
                placeholder="Enter task title"
              />
            </TextField>

            {/* Description */}
            <TextField name="description" isRequired className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Description
              </Label>
              <TextArea
                className={`${inputClass} min-h-32 resize-none`}
                placeholder="Write a short description about the task"
              />
            </TextField>

            {/* Status / Priority */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Status / Priority
              </Label>
              <div className="rounded-xl border border-slate-300 bg-white p-2">
                <SelectItem />
              </div>
            </div>

            {/* Assign To */}
            <TextField name="assignTo" isRequired className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">
                Assign To
              </Label>
              <Input
                className={inputClass}
                placeholder="Enter assignee name"
              />
            </TextField>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/70 px-6 py-5 sm:flex-row sm:justify-end md:px-8">
            <Button
              type="reset"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
            >
              Add Task
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewTask;

