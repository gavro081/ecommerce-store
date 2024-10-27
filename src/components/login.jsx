import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { ClipLoader } from 'react-spinners';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);
                console.log('Signed in!');
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className='loader'>
                <ClipLoader color='purple' loading={loading} size={40} />
            </div>
        );
    }

    return (
        <div className="login">
            <div className="container">
                <div className="right">
                    <img src="waving-runner.jpg" />
                </div>
                <div className='left'>
                    <h2>welcome back</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error &&
                            <p>
                                please check credentials
                            </p>
                        }
                        <button type="submit">log in</button>
                    </form>
                    <div>
                        <p>Don't have an account?
                            <Link to="/register">
                                <h3>Register</h3>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
