import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import Service from '../services/Http';
import axios from 'axios'

function useAdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        // Validate email
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        }

        // Validate password
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = {
                email: email,
                password: password
            }

            const response = await axios.post("http://localhost:8080/api/v1/adminlogin", data)
            // console.log("response",response)
            // localStorage.setItem("_id", response.data.data._id);

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('adminToken', token,);


                const _id = response.data.data._id;
                localStorage.setItem("_id", _id)

                navigate('/admin/dashboard', { replace: true });
            }
            else {
                toast.error(response.data.message)
            }



            // const services = new Service();
            // const res = await services.post('login',data);
            // if (res.status === 'success') {
            //     const token = res.token;
            //     localStorage.setItem('adminToken', token);
            //     navigate('/dashboard',{ replace: true });
            //   } else {
            //     setErrors({message:res.message});
            //   }

        } else {
            // Form is invalid, display errors
            console.log('Form validation failed');
        }
    }

    return (
        <div className="login-box" style={{ marginTop: "150px", marginLeft: "550px" }}>
            {/* /.login-logo */}
            <Toaster />
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <a href="#" className="h1"><b>Comera</b></a>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                            </div>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        {errors.message && <div className="invalid-feedback" style={{ display: 'block' }}>{errors.message}</div>}
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                        </div>
                    </form>
                    {/* /.social-auth-links */}
                    <p className="mb-1">
                       <button onClick={() => navigate("/admin/forgetpwd")}>
  Forgot Password
</button>
                    </p>
                </div>
                {/* /.card-body */}
            </div>
            {/* /.card */}
        </div>
    );
}
export default useAdminLogin;