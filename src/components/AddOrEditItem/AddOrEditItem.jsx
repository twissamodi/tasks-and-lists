import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './AddOrEditItem.css'
const AddOrEditItem=({allListsData,setAllListsData,action})=>{
    const navigate=useNavigate();
    const {listId,taskId}=useParams();
    const [newItemTitle,setNewItemTitle]=useState('');
    const [isPrevItemLoaded,setIsPrevItemLoaded]=useState(false);
    useEffect(()=>{
        if(action==='Edit Task' && !isPrevItemLoaded){
            const taskBeingEdited=allListsData.filter((eachList)=>eachList.listId===parseInt(listId))[0].tasks.filter((eachTask)=>eachTask.taskId===parseInt(taskId));
            const taskTitleBeingEdited=taskBeingEdited[0].title;
            setNewItemTitle(taskTitleBeingEdited);
            setIsPrevItemLoaded(true);
        }
      
    },[isPrevItemLoaded]);

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
        navigate('/lists');
    }
    
    const addTaskToListHandler=()=>{
        const updatedListsData=allListsData.map((eachList)=>{
            return eachList.listId!==parseInt(listId) ? eachList : {...eachList,tasks: [...eachList.tasks,{
                title:newItemTitle,taskId:eachList.tasks.length+1
            }]
        }
    })
    setAllListsData(updatedListsData);
    navigate(-1);
    }

    const updateTaskHandler=()=>{
        const updatedListsData=allListsData.map((eachList)=>{
            return eachList.listId!==parseInt(listId) ? eachList : {...eachList,tasks:eachList.tasks.map((eachTask)=>{
                return eachTask.taskId!==parseInt(taskId) ? eachTask : {
                    taskId:eachTask.taskId,
                    title:newItemTitle
                }
            })
        }
    })
    setAllListsData(updatedListsData);
    navigate(-1);
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