import { useState,useEffect } from "react";

import Axios  from "axios";

 
import { Link } from "react-router-dom";
let udata = JSON.parse(localStorage.getItem('admin'));
function Adminreg()
{
    let [admin,setUser]= useState({});

    // useEffect(()=>{
    //     let userdata = JSON.parse(localStorage.getItem('admin'));
    //     console.log(userdata);
    //     if(userdata!=null)
    //     {
    //         window.location = "/todo"
    //     }
    //   })

    let getValue = (e)=>{
       let name = e.target.name;
       let  value= e.target.value;
       setUser({...admin,[name]:value});
    
    }
 let data = (e)=>{
    e.preventDefault();
    Axios.get("http://localhost:3000/admin/?username=" + admin.username)
            .then((res) => {
                if (res.data.length == 0) {
                    Axios.get("http://localhost:3000/admin/?email=" + admin.email)
                        .then((res) => {
                            if (res.data.length == 0) {
                                if (admin.password === admin.cpass) {
                                    Axios.post("http://localhost:3000/admin", admin)
                                        .then((res) => {
                                            alert('Register Successfully');
                                             window.location = "/addminlogin"
                                            // usenavigate("/mainpage")
                                        })
                                        .catch((err) => {
                                           alert('Somthing Went Wrong');
                                        })
                                }
                                else {
                                   alert('Password And Confirm Password Is Not Match')
                                }
                            }
                            else {
                               alert('Email Is Alredy Use');
                            }
                        })
                        .catch((err) => {
                           alert('Somthing Went Wrong');
                        })
                }
                else {
                   alert('Username Is Alredy Use')
                }
            })
            .catch((err) => {
               alert('Somthing Went Wrong');
         })
 }   
    return(
        <div style={{textAlign:'center', margin:'200px 0 0 0 '}}>
             <h1>Admin Registartion</h1>
             
  <form method="post" onSubmit={(e)=>data (e)}>
             <table align="center" style={{backgroundColor:'#5a1cd9',padding:' 60px 50px 60px 50px',fontSize:'28px'}}>
                <tr>
                    
                    <td><input type="text" style={{height:'40px',width:'500px',borderRadius:'8px',border:'none',paddingLeft:'20px'}} name="username" placeholder="Enter username" onChange={(e)=>getValue(e)}/></td>
                </tr>
                <tr>
                    
                    <td><input type="text" style={{height:'40px',width:'500px',borderRadius:'8px',border:'none',paddingLeft:'20px'}} placeholder="Enter you email" name="email" onChange={(e)=>getValue(e)}/></td>
                </tr>
                <tr>
                    
                    <td><input type="password"style={{height:'40px',width:'500px',borderRadius:'8px',border:'none',paddingLeft:'20px'}} placeholder="password" name="password" onChange={(e)=>getValue(e)}/></td>
                </tr>
                <tr>
                   
                    <td><input type="password"style={{height:'40px',width:'500px',borderRadius:'8px',border:'none',paddingLeft:'20px'}} placeholder="confrim password" name="cpass" onChange={(e)=>getValue(e)}/></td>
                </tr>
                <td>
                    <tr></tr>
                    <tr><input type="submit" style={{border:'none',padding:'10px 15px',marginLeft:'250px',borderRadius:'5px',backgroundColor:'white',color:'#5a1cd9'}} value='Register'/></tr>
                </td>
             </table>
             </form>  
            
             <Link style={{textDecoration:'none'}} to='/addminlogin'>Login</Link>
        </div>
    )
}
export default Adminreg;