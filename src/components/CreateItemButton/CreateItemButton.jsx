import './CreateItemButton.css'
import { useNavigate } from "react-router-dom";
const CreateItemButton=({action,path})=>{
    const navigate=useNavigate();

    return(
        <div className="create-button-container">
            <button onClick={()=>navigate(path)} className={action==='Add List' ? "create-button create-list-button" : "create-button create-task-button"} ><img className='plus' src="https://img.icons8.com/emoji/344/plus-emoji.png" alt="plus sign"></img>{action}</button>
        </div>
    )
}
export default CreateItemButton;