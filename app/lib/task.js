import tasks from '../data/task.json';
// import Task from '../tasks/page';

export const getTasks = async() => {

    return tasks
};
export const postTask = async (newTask)=>{
    newTask.id = tasks.length+1
    tasks.unshift(newTask)
   console.log(newTask)
    
    return {ok :true, message :"Task added successfully"}
}
