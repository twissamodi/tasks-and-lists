import {useNavigate,useParams} from 'react-router-dom';
import { BsPencil } from "react-icons/bs";
import CreateItemButton  from '../CreateItemButton/CreateItemButton';
import './DisplayTasksInList.css'
import { useEffect } from 'react';
import makeRequest from '../../utils/makeRequest';
import { getAllTasks } from '../../Constants/apiEndpoints';
import { useState } from 'react';
const DisplayTasksInList=({setAllListsData,allListsData})=>{ 
    const listId = useParams().listId;
    const navigate=useNavigate();
    const [selectedList,setSelectedList]=useState(null);
    const [isInitialised,setIsInitialised]=useState(false);
    
    useEffect(()=>{
        if(!isInitialised && allListsData.length){
            setIsInitialised(true);
            const derivedList =allListsData.filter(eachList=>eachList.listId===parseInt(listId))[0];
            if(derivedList){
                makeRequest(getAllTasks(listId),{},navigate).then(data=>{derivedList['tasks']=data;
                setSelectedList(derivedList);
            });
            }
            else{
                navigate('/notFound');
            }
        }
    },[isInitialised,allListsData,listId])


    return selectedList ? <div className='task-page-container'>
    <div className='add-task-button-container'>
    <CreateItemButton path={(`/lists/${selectedList.listId}/tasks/add-task`)} action='Add Task'/>
    </div>
    <div className='background-container'>
    </div>
    <div className='task-list-container'>
        <p className='list-name'>{selectedList.listName}</p>
        <div className='tasks-container'>
        <ul className='unordered-task-list'>
            
            {selectedList.tasks?.map((eachTask,index)=>{
                return(
                    <div key={index} className='list-item-container'>
                        <li key={index+1} className='task-title' >{eachTask.title}</li><button key={index+2 } className='edit-task-button' onClick={()=>navigate(`/lists/${selectedList.listId}/tasks/${eachTask.taskId}`)}><BsPencil/></button>
                    </div>
                    
                )
            })}
        </ul>
        </div>
       
        </div>
    </div> :  <div>Loading</div> 
} 

export default DisplayTasksInList;
//