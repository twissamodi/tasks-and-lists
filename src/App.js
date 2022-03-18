import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AllListDetails from './components/AllListDetails/AllListDetails';
import AddOrEditItem from './components/AddOrEditItem/AddOrEditItem';
import {MOCK_ALL_DETAILS} from "../src/Constants/MockData"
import { useEffect, useState } from "react";
import DisplayTasksInList from './components/DisplayTasksInList/DisplayTasksInList';
import {getAllLists} from './Constants/apiEndpoints';
import makeRequest from './utils/makeRequest';
import NotFound from './components/NotFound/NotFound';
import './App.css'
function App() {
  const [allListsData,setAllListsData]=useState([]);
  const [isInitialised,setIsInitialised]=useState(false);
  useEffect(async ()=>{
    if(!isInitialised){
      const data=await makeRequest(getAllLists);
      setAllListsData(data);
      setIsInitialised(true);
    }
  },[isInitialised]);
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route
        path='/lists'
        element={<AllListDetails
        allListsData={allListsData}
        setAllListsData={setAllListsData}
      />}
        />
    
      <Route
      path='/lists/add-list'
      element={<AddOrEditItem action='Add List' allListsData={allListsData} setAllListsData={setAllListsData}/>}
      ></Route>
      <Route
      path='/lists/:listId'
      element={<DisplayTasksInList allListsData={allListsData} setAllListsData={setAllListsData}/>}
      ></Route>
      <Route 
      path='/lists/:listId/tasks/add-task'
      element={<AddOrEditItem action='Add Task' allListsData={allListsData} setAllListsData={setAllListsData}/>}
      ></Route>
      <Route
        path='/lists/:listId/tasks/:taskId'
        element={<AddOrEditItem action='Edit Task' allListsData={allListsData} setAllListsData={setAllListsData}/>}
      > 
      </Route> 
      <Route 
      path='/notFound'
      element={<NotFound/>}
      />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
