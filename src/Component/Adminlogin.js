

import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Axios  from "axios";


function Adminlogin()
{
    let [admin,setUser]= useState({});
    let navigate = useNavigate();
  
 
    

    let getValue = (e)=>{
       let name = e.target.name;
       let  value= e.target.value;
       setUser({...admin,[name]:value});
      
    }
   
 let data = (e)=>{
    e.preventDefault();
    Axios.get("http://localhost:3000/admin/?email="+admin.email+"&password="+admin.password)
    .then((res)=>{
      
        if(res.data.length == 1)
        {
            // console.log(res.data);
            localStorage.setItem('admin',JSON.stringify(res.data[0]));
            window.location = "/addminview"
        }
        else
        {
            alert('Username Or Password Is Wrong');  
        }
    })
    .catch((err) => {
        alert('Username Or Password Is Wrong');
    })
   
 }   
    return(
        <div>
             <h1 style={{textAlign:'center'}}>Login</h1>
        <form method="post" onSubmit={(e)=>data (e)}>
             <table align="center" style={{backgroundColor:'#5a1cd9',width:'480px',height:'300px',borderRadius:'10px',margin:'200px auto'}}>
              
                <tr>
                    <td style={{color:'white',fontSize:'20px',textAlign:'center'}}>Enter email</td>
                    <td><input style={{color:'black',border:'1px solid lightblue',backgroundColor:'transparent',height:'26px'}} type="text" name="email" onChange={(e)=>getValue(e)}/></td><br/><br/><br/><br/>
                </tr>
                <tr>
                    <td style={{color:'white',fontSize:'20px',textAlign:'center'}} >Enter Password</td>
                    <td><input style={{color:'white',border:'1px solid lightblue',backgroundColor:'transparent',height:'26px'}} type="password" name="password" onChange={(e)=>getValue(e)}/></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input style={{backgroundColor:'transparent',color:'white',fontSize:'18px',marginTop:'50px'}} type="submit" name="Login" value='Login'/></td>
                </tr>              
             </table>
             </form>  
            
        </div>
    )
}
export default Adminlogin;