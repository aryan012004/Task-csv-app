import { useState } from "react"
import Axios from "axios"

function Adduser()
{
    let [user,setuser]=useState({})
    let getValue= (e)=>{
      let name= e.target.name
      let value = e.target.value
      setuser({...user,[name]:value});
    }
    let Submidata = (e) =>{
      e.preventDefault();
      Axios.get('http://localhost:3000/users/?email='+user.email)
      .then((res)=>{
           if(res.data.length==0)
           { 
             if(user.password==user.cpass)
             {
               Axios.post("http://localhost:3000/users/", user)
               .then((res)=>{
                   alert('Register Successfully');
                   setuser({});
               })
               .catch((err)=>{
                 alert('Something Wrond !')
               })
             }
             else{
               alert('password and confirm password not match' )
             }
           }
           else
           {
             alert('email is already use' )
           }
      })
      .catch((err)=>{
        alert(err)
      })
     } 
    return(
        <div>
            <div id="main-wrapper">
            
              <div className="page-wrapper">
              
                <div className="page-breadcrumb">
                  <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                      <h4 className="page-title">Form Basic</h4>
                      <div className="ml-auto text-right">
                        
                      </div>
                    </div>
                  </div>
                </div>
                 <div className="container-fluid">
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <form className="form-horizontal" method="post" onSubmit={(e)=>Submidata(e)}>
                          <div className="card-body">
                            <h4 className="card-title">User Info</h4>
                            <div className="form-group row">
                              <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">Username</label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" id="fname"name="username" placeholder="User Name Here" onChange={(e) =>getValue(e)}/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Email</label>
                              <div className="col-sm-9">
                                <input type="text" name="email" className="form-control" id="lname" placeholder="Email Here"onChange={(e) =>getValue(e)} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Password</label>
                              <div className="col-sm-9">
                                <input type="password" className="form-control" id="lname" name="password" placeholder="Password Here" onChange={(e) =>getValue(e)}/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="email1" className="col-sm-3 text-right control-label col-form-label">Confirm passowrd</label>
                              <div className="col-sm-9">
                                <input type="password" className="form-control" id="email1" name="cpass" placeholder="Confirm Passowrd Here" onChange={(e) =>getValue(e)}/>
                              </div>
                            </div>
                          
                          </div>
                          <div className="border-top">
                            <div className="card-body">
                              <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                            </div>
                          </div>
                        </form>
                      </div>
                      
                    </div>
                    
                  </div>
                 
                </div>
             
              </div>
             
            </div>
           
    
        </div>
    )
}
export default Adduser;