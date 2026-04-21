import React from 'react';
import { getTasks } from '../lib/task';
import TaskCard from '../components/TaskCard';
import AddTask from '../components/AddTask';
import  {createATask} from '../lib/actions';
import Link from 'next/link';
import { Button } from '@heroui/react';

const Task = async () => {
    const tasks = await getTasks()
    return (
        <div>
            <h1 className='text-9xl mb-3 font-bold'>tasks {tasks.length}</h1>
            <AddTask createATask ={createATask}/>
             <Link href="/tasks/new">
             <Button className="ml-3" variant='secondary' >New Task </Button>
             </Link>
            {
                tasks.map((task) => <TaskCard key={task.id} task ={task}/>)
            }
        </div>
    );
};

export default Task;