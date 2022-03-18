export const BACKEND_URL='http://localhost:4006';

export const getAllLists={
    url:'/lists',
    method:'get'
}
export const createList={
    url:'/lists/add-list',
    method:'post'
}
export const getAllTasks=(listId)=>{
    return {
        url:`/lists/${listId}`,
        method:'get'
    }
}
export const createTask=(listId)=>{
    return{
        url:`/lists/${listId}/tasks/add-task`,
        method:'post'
    }
   
}
export const updateTask=(listId,taskId)=>{
    return {
        url:`/lists/${listId}/tasks/${taskId}`,
        method:'post'
    }
}