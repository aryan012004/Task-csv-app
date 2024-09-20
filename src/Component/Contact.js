import { useState } from "react";
import axios from "axios";

function Contact() {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({ ...contactInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/contact', contactInfo)
            .then(() => {
                alert('Message sent successfully');
                setContactInfo({ name: '', email: '', message: '' }); // Reset form
            })
            .catch(() => {
                alert('Failed to send message');
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Contact Us</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contactInfo.name}
                    onChange={handleChange}
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contactInfo.email}
                    onChange={handleChange}
                    style={styles.input}
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={contactInfo.message}
                    onChange={handleChange}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.submitButton}>Send Message</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#333',
    },
    form: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        height: '40px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        paddingLeft: '15px',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    textarea: {
        height: '100px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        paddingLeft: '15px',
        fontSize: '16px',
        boxSizing: 'border-box',
        resize: 'none',
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

export default Contact;
