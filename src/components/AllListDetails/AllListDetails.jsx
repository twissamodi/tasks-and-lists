import { useNavigate } from "react-router-dom";
import CreateItemButton from "../CreateItemButton/CreateItemButton";
import DisplayAllLists from "../DisplayAllLists/DisplayAllLists";
import './AllListDetails.css'
const AllListDetails=({allListsData,setAllListsData})=>{
    const navigate=useNavigate();
    return(
        <div className="list-page-container">
            <CreateItemButton path={('/lists/add-list')} action='Add List'></CreateItemButton>
            <DisplayAllLists allListsData={allListsData} setAllListsData={setAllListsData}/>
        </div>
    )
}
export default AllListDetails;