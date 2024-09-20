import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Reg() {
    let [user, setUser] = useState({});

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    let data = (e) => {
        e.preventDefault();
        Axios.get("http://localhost:3000/users/?username=" + user.username)
            .then((res) => {
                if (res.data.length === 0) {
                    Axios.get("http://localhost:3000/users/?email=" + user.email)
                        .then((res) => {
                            if (res.data.length === 0) {
                                if (user.password === user.cpass) {
                                    Axios.post("http://localhost:3000/users", user)
                                        .then(() => {
                                            alert('Registered Successfully');
                                            window.location = "/signin";
                                        })
                                        .catch(() => {
                                            alert('Something Went Wrong');
                                        });
                                } else {
                                    alert('Password And Confirm Password Do Not Match');
                                }
                            } else {
                                alert('Email Is Already In Use');
                            }
                        })
                        .catch(() => {
                            alert('Something Went Wrong');
                        });
                } else {
                    alert('Username Is Already In Use');
                }
            })
            .catch(() => {
                alert('Something Went Wrong');
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Registration</h1>
            <Link to='/signin' style={styles.link}>Already have an account? Login</Link>
            <form method="post" onSubmit={data} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    onChange={getValue}
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={getValue}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={getValue}
                    style={styles.input}
                />
                <input
                    type="password"
                    name="cpass"
                    placeholder="Confirm Password"
                    onChange={getValue}
                    style={styles.input}
                />
                <input
                    type="submit"
                    value="Register"
                    style={styles.submitButton}
                />
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#333',
    },
    link: {
        marginBottom: '20px',
        fontSize: '1rem',
        color: '#1a73e8',
        textDecoration: 'none',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        height: '40px',
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #ddd',
        paddingLeft: '15px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    submitButton: {
        backgroundColor: '#1a73e8',
        color: '#ffffff',
        border: 'none',
        padding: '12px 0',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default Reg;
