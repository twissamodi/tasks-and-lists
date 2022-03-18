import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {createList,createTask,updateTask} from '../../Constants/apiEndpoints';
import makeRequest from '../../utils/makeRequest';
import './AddOrEditItem.css'
const AddOrEditItem=({allListsData,setAllListsData,action})=>{
    const navigate=useNavigate();
    const {listId,taskId}=useParams();
    const [newItemTitle,setNewItemTitle]=useState('');
    const [isPrevItemLoaded,setIsPrevItemLoaded]=useState(false);
    const [hasListBeenCreated,setHasListBeenCreated]=useState(false);
    const [hasTaskBeenCreated,setHasTaskBeenCreated]=useState(false);
    const [hasTaskBeenUpdated,setHasTaskBeenUpdated]=useState(false);
    const [updatedListData,setUpdatedListData]=useState('');
    useEffect(()=>{
        if(action==='Edit Task' && !isPrevItemLoaded){
            const taskBeingEdited=allListsData.filter((eachList)=>eachList.listId===parseInt(listId))[0].tasks.filter((eachTask)=>eachTask.taskId===parseInt(taskId));
            const taskTitleBeingEdited=taskBeingEdited[0].title;
            setNewItemTitle(taskTitleBeingEdited);
            setIsPrevItemLoaded(true);
        }
      
    },[isPrevItemLoaded]);
    useEffect( ()=>{
        if(hasListBeenCreated){
            makeRequest(createList,{
                listName:newItemTitle
            }
            ).then(()=>{
                setAllListsData(updatedListData);
                setHasListBeenCreated(false);
                navigate('/lists');
            })
        }
    },[hasListBeenCreated])

    useEffect(()=>{
        if(hasTaskBeenCreated){
            makeRequest(createTask(listId),{
                title:newItemTitle}
            ).then(()=>{
                setAllListsData(updatedListData);
                setHasTaskBeenCreated(false);
                navigate(`/lists/${listId}`);
            })
            
        }
    },[hasTaskBeenCreated])


    useEffect(()=>{
        if(hasTaskBeenUpdated){
            makeRequest(updateTask(listId,taskId),{
                title:newItemTitle}
            ).then(()=>{
                setAllListsData(updatedListData);
                setHasTaskBeenUpdated(false);
                navigate(`/lists/${listId}`);
            })
        }
            
    },[hasTaskBeenUpdated])

    const createOrEditItem=(event)=>{
        setNewItemTitle(event.target.value);
    }
    
    const addListToPrevListsHandler=()=>{
        const index=allListsData[allListsData.length-1].listId+1;
        const newList={
            listName:newItemTitle,
            listId:index,
            tasks:[]
    }
        setAllListsData((prevState)=>[...prevState,newList]);
        setHasListBeenCreated(true);
    }
    
    const addTaskToListHandler=()=>{
        console.log(allListsData);
        setUpdatedListData(allListsData.map((eachList)=>{
            return eachList.listId!==parseInt(listId) ? eachList : {...eachList,tasks: [...eachList.tasks,{
                title:newItemTitle,taskId:eachList.tasks.length+1
            }]
        }
    }));
    setHasTaskBeenCreated(true);
    }

    const updateTaskHandler=()=>{
        setUpdatedListData(allListsData.map((eachList)=>{
            return eachList.listId!==parseInt(listId) ? eachList : {...eachList,tasks:eachList.tasks.map((eachTask)=>{
                return eachTask.taskId!==parseInt(taskId) ? eachTask : {
                    taskId:eachTask.taskId,
                    title:newItemTitle
                }
            })
        }
    }));
    setHasTaskBeenUpdated(true);
    }

    return(
        <div className="add-edit-item-container">
            <div className="top-background" />
            <div className="buttom-background" />
            <div className="input-container">
                <label className="action-label"><b>{action}</b></label>
                <input className="title-input" value={newItemTitle} onChange={createOrEditItem}></input>
                <div className="button-container">
                    <button className="action-button submit-button" onClick={action==='Add List' ? addListToPrevListsHandler: action==='Add Task' ? addTaskToListHandler : updateTaskHandler}>Submit</button>
                    <button className="action-button back-button" onClick={()=>navigate(-1)}>Cancel</button>
                </div>
                
            </div>
            
        </div>
       
    )
}
export default AddOrEditItem;