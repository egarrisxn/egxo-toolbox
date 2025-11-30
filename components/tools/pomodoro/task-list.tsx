"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

// Helper function to load tasks from localStorage once on initial render
const loadInitialTasks = (): Task[] => {
  if (typeof window === "undefined") return [];
  const savedTasks = localStorage.getItem("focusTasks");
  try {
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
  }
};

export default function TaskList() {
  // Initialize state directly using the result of loadInitialTasks()
  const [tasks, setTasks] = useState<Task[]>(loadInitialTasks);
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    localStorage.setItem("focusTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className='h-fit w-full max-w-96 min-w-80 sm:max-w-96 sm:min-w-96 xl:min-w-[26em]'>
      <CardHeader className='xl:hidden'>
        <CardTitle className='mx-auto text-lg font-bold'>Task List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-2'>
          <Input
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyUp={handleKeyUp}
            placeholder='Add task...'
            className='grow'
          />
          <Button onClick={addTask} size='icon'>
            <Plus />
          </Button>
        </div>
        <div className='max-h-60 space-y-1 overflow-y-auto py-2 xl:max-h-none'>
          {tasks.length === 0 ? (
            <p className='pt-2 text-center text-sm text-primary/50 italic'>
              No tasks
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center rounded p-1.5 ${task.completed ? "bg-primary/5" : ""}`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className='mr-2'
                />
                <span
                  className={`flex-1 text-sm text-primary ${task.completed ? "text-primary/40 line-through" : ""}`}
                >
                  {task.text}
                </span>
                <Button
                  size='icon'
                  onClick={() => removeTask(task.id)}
                  className='size-4 p-2.5 text-primary/50 opacity-0 group-hover:opacity-100 hover:bg-transparent hover:text-primary/70'
                >
                  <Trash2 className='size-2' />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
