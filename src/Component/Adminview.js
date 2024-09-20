import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Adminview() {
  let [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      Axios.get("http://localhost:3000/users")
        .then((res) => {
          let data = res.data;
          setUsers(data);
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    };
    getData();
  }, []);

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => {
      
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted successfully");
      })
      .catch((err) => {
        alert("Failed to delete user");
      });
  };
  

  return (
    <>
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">User Tables</h4>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title m-b-0">Static Table</h5>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Password</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.username}</td>
                        <td>
                        
                          <Link to={`/dashboard/${user.id}`}>{user.email}</Link>
                        </td>
                        <td>{user.password}</td>
                        <td>
                          <button
                            onClick={() => deleteUser(user.id)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              padding: "5px 10px",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminview;
