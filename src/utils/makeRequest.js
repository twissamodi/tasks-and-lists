import {BACKEND_URL} from '../Constants/apiEndpoints';
import axios from 'axios';

const makeRequest=async(apiEndpoint,dynamicConfig={},navigateTo=()=>{})=>{
    try{
        const {data}=await axios({...apiEndpoint,url:`${BACKEND_URL}${apiEndpoint.url}`,data:{
            ...dynamicConfig
        }});
        return data;
    }catch(err){
        switch(err.response?.status){
            case 404: console.log(err.response.data);
            navigateTo('/notFound');
            break;
        }
    }
    
}

export default makeRequest;