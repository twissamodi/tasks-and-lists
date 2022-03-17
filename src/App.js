import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AllListDetails from './components/AllListDetails/AllListDetails';
import AddOrEditItem from './components/AddOrEditItem/AddOrEditItem';
import {MOCK_ALL_DETAILS} from "../src/Constants/MockData"
import { useState } from "react";
import DisplayTasksInList from './components/DisplayTasksInList/DisplayTasksInList'
function App() {
  const [allListsData,setAllListsData]=useState(MOCK_ALL_DETAILS);
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
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
