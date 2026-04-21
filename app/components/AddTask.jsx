"use client";

import React from "react";
import { CirclePlus } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import SelectItem from "./SelectItem";

const AddTask = ({ createATask }) => {
  return (
    <Modal>
      <Button className="text-4xl bg-red-600 py-10 px-10" variant="secondary">
        Add a Task
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <CirclePlus className="size-5" />
              </Modal.Icon>

              <Modal.Heading>Contact Us</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form action={createATask} className="flex flex-col gap-4">
                  <TextField className="w-full" name="title" type="text">
                    <Label>Title</Label>
                    <Input placeholder="Enter your task title" />
                  </TextField>

                  <TextField className="w-full" name="description" type="text">
                    <Label>Description</Label>
                    <Input placeholder="Enter your task description" />
                  </TextField>

                <SelectItem/>

                

                  <TextField className="w-full" name="assignTo">
                    <Label>AssignTo</Label>
                    <Input placeholder="Enter your assignTo" />
                  </TextField>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">Cancel</Button>
                    <Button slot="close" type="submit">Add New Taskd</Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default AddTask;
