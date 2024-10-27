import React, {useEffect} from 'react';
import './toast.css'
import { Link } from 'react-router-dom';
import Cart from './cart';

const Toast = ({message , show, onClose, link}) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 2500);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);
    if (!show) return null;

   return (
    <div className="toast">
        {message.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
        ))}
        {link && (
            <div>
                <Link to={link} className='toast-link'>view cart</Link>
            </div>
        )}
    </div>
   )
};

export default Toast;