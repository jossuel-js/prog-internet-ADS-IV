import { useState } from 'react';
import './App.css';
import { AddTask } from './components/add_task';
import { Top } from './components/forms';
import { TaskList } from './components/list_task';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleAddTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task: Task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <div className="App">
      <Top>

      <h1>React + Reducer</h1>
      <h3>Tasks</h3>
      </Top>
      
      <AddTask onAddTask={handleAddTask} />
      
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
      
    </div>
  )
}

export interface Task{
  id: number
  text: string
  done: boolean
}

let nextId = 3;

const initialTasks: Task[] = [
  {id: 0, text: 'Elaborar Aulas', done: true},
  {id: 1, text: 'Estudar Flutter - Estados', done: false},
  {id: 2, text: 'Correr avenida Raul Lopres', done: false},
];
