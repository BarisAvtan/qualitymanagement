import axios from "axios";
import { useNavigate } from "react-router-dom";


function Requests(navigate){

  const GetResult = async (config)=>{
    // var navigate = useNavigate();
      try 
      {
        const response = await axios(config);
        return response.data; 
  
      } catch (error) {
        //console.log(error)
        if (error.response && error.response.status === 401) {
          // Unauthorized, navigate to login
          //navigate('/login');
        }
  
        throw error; 
      }
      
  };
  return {GetResult};
}
 
export default Requests;
