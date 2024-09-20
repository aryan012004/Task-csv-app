import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/signin'); 
    };

    return (
        <header className="bg-primary py-3">
            <div className="container-fluid d-flex justify-content-between align-items-center">
               
                <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
                    <span className="fs-3 fw-bold">Logo</span>
                </Link>

                
                <nav className="d-flex gap-4">
                    <Link to="/addminview" className="text-decoration-none text-white fs-5">
                        Admin View
                    </Link>
                    <Link to="/about" className="text-decoration-none text-white fs-5">
                        Blog
                    </Link>
                    <Link to="/contact" className="text-decoration-none text-white fs-5">
                        Contact
                    </Link>
                </nav>

              
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="btn btn-light">
                            Logout
                        </button>
                    ) : (
                        <Link to="/signin" className="btn btn-light">
                            Login 
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
