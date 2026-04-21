"use client";

import React from "react";
import { Label, ListBox, Select } from "@heroui/react";

const SelectItem = () => {
  return (
    <div className="p-5 max-w-full">
      <Select name="priority" className="min-w-full" placeholder="Select one">
        <Label>Priority</Label>

        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="low" textValue="low" >
              Low
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="medium" textValue="medium">
              Medium
              <ListBox.ItemIndicator />
            </ListBox.Item>

            <ListBox.Item id="high" textValue="high">
              High
              <ListBox.ItemIndicator />
            </ListBox.Item>

          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
};

export default SelectItem;