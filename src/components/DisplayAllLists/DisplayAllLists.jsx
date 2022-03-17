import './DisplayAllLists.css'
import {useNavigate} from 'react-router-dom'
const DisplayAllLists=({allListsData,setAllListsData})=>{
    const navigate=useNavigate();
    return (
        <div className="all-lists-container">
            <p className="available-list-p-tag"><b>Available Lists</b></p>
            <ul className="unordered-list-names">
                {allListsData.map((eachList)=>{
                    return(
                        <li className="each-list-item" key={eachList.listId}><button className="select-list-button" onClick={()=>{navigate(`/lists/${eachList.listId}`)}}>{eachList.listName}</button></li>
                    )
                })}
            </ul>
        </div>
    )
}
export default DisplayAllLists;