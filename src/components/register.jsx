import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router';
import { signOut } from "firebase/auth";
import { ClipLoader } from 'react-spinners';
import './register.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });
            await signOut(auth);

            navigate('/login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.log('Error code:', errorCode);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="register">
            <div className='container'>
                {loading ? (
                    <ClipLoader color='purple' loading={loading} size={40} />
                ) : (
                    <div className="register-form">
                        <div className="left">
                            <h2>join our team</h2>
                            <form onSubmit={handleRegister}>
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
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
                                {error && <p>{error}</p>}
                                <button type="submit">join us</button>
                            </form>
                        </div>
                        <div className="right">
                            <img src='runclub.jpeg'></img>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
