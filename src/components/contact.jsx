import React, { useState } from 'react'
import './contact.css'
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
import { db } from './firebaseConfig'
import Toast from './toast';
import { useAuth } from './authcontext';

const Contact = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const { currentUser } = useAuth();

    const sendMessage = async (username, email, subject, message) => {
        if (!currentUser) {
            alert('you must log in')
        }
        else {
            try {
                await addDoc(collection(db, "messages"), {
                    username: username,
                    email: email,
                    subject: subject,
                    message: message,
                    timestamp: new Date()
                });
                setShowToast(true);
            } catch (e) {
                console.error("error sending message", e);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && email && subject && message) {
            sendMessage(username, email, subject, message);
            setUsername("");
            setEmail("");
            setSubject("");
            setMessage("");
        } else {
            alert("fill out all fields");
        }
    }


    return (
        <>
            <div className='contact'>
                <div className='container'>
                    <div className='form'>
                        <p>contact us</p>
                        <form onSubmit={handleSubmit}>
                            <div className='box'>
                                <div className='label'>
                                    <h4>Name</h4>
                                </div>
                                <div className='input'>
                                    <input
                                        type='text'
                                        placeholder='filip'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='label'>
                                    <h4>E-mail</h4>
                                </div>
                                <div className='input'>
                                    <input
                                        type='email'
                                        placeholder='filip@ukim.mk'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='label'>
                                    <h4>Subject</h4>
                                </div>
                                <div className='input'>
                                    <input
                                        type='text'
                                        placeholder='product availability'
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='box'>
                                <div className='label'>
                                    <h4>Message</h4>
                                </div>
                                <div className='input'>
                                    <textarea
                                        placeholder='do you have any information on when x will be available'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <p>{!currentUser && 'you must be logged in to be able to send messages'}</p>
                            <button type='submit'>send</button>
                        </form>
                    </div>
                    <Toast
                        message={'your message was sent'}
                        show={showToast}
                        onClose={() => setShowToast(false)}
                        link={''}
                    />
                </div>
            </div>
        </>
    )
}
export default Contact