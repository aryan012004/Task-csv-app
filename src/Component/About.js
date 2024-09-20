import { useEffect, useState } from "react";
import axios from "axios";

function About() {
    const [info, setInfo] = useState(null);

    useEffect(() => {
     
        axios.get('http://localhost:3000/about-info')
            .then((res) => setInfo(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>About Us</h1>
            {info ? (
                <div style={styles.infoContainer}>
                    <p style={styles.text}>{info.description}</p>
                </div>
            ) : (
                <div style={styles.infoContainer}>
                    <p style={styles.text}>
                        <strong>The Art of Task Management: Mastering Productivity and Efficiency</strong>
                        <br/><br/>
                        In today’s fast-paced world, effective task management has become a crucial skill for personal and professional success. The ability to organize, prioritize, and execute tasks efficiently not only enhances productivity but also reduces stress and improves overall well-being. Here’s a comprehensive look at the art of task management and how mastering it can transform your life.
                        <br/><br/>
                        <strong>Understanding Task Management</strong>
                        <br/><br/>
                        Task management involves the process of planning, organizing, and executing tasks to achieve specific goals within a set timeframe. It’s a systematic approach to managing various responsibilities, ensuring that tasks are completed effectively and on time. Good task management helps in minimizing procrastination, avoiding overwhelm, and maintaining focus.
                        <br/><br/>
                        <strong>Key Principles of Effective Task Management</strong>
                        <br/><br/>
                        <ul style={styles.list}>
                            <li><strong>Prioritization:</strong> Not all tasks are created equal. Prioritizing tasks based on their urgency and importance is essential. The Eisenhower Matrix is a popular tool for this purpose, categorizing tasks into four quadrants: urgent and important, important but not urgent, urgent but not important, and neither urgent nor important.</li>
                            <li><strong>Goal Setting:</strong> Setting clear, achievable goals provides direction and motivation. Breaking down larger goals into smaller, manageable tasks makes it easier to track progress and stay on course.</li>
                            <li><strong>Time Management:</strong> Allocating specific time slots for each task helps in maintaining focus and preventing multitasking. Time-blocking is a technique where you assign fixed periods to tasks, ensuring dedicated attention to each.</li>
                            <li><strong>Organization:</strong> A clutter-free workspace and an organized to-do list are foundational for effective task management. Utilize tools such as planners, task management apps, or digital calendars to keep track of tasks and deadlines.</li>
                            <li><strong>Delegation:</strong> Recognizing tasks that can be delegated to others is crucial for efficient task management. Delegation frees up your time for higher-priority tasks and empowers others to contribute.</li>
                            <li><strong>Review and Adapt:</strong> Regularly reviewing your task list and progress helps in identifying bottlenecks and making necessary adjustments. Flexibility in adapting to changing priorities or unforeseen challenges is key to staying on track.</li>
                        </ul>
                        <br/><br/>
                        <strong>Tools and Techniques</strong>
                        <br/><br/>
                        <ul style={styles.list}>
                            <li><strong>Task Management Apps:</strong> Applications like Todoist, Asana, and Trello offer powerful features for organizing tasks, setting deadlines, and tracking progress. These tools often include collaboration features, making them ideal for team projects.</li>
                            <li><strong>Pomodoro Technique:</strong> This time management method involves working in focused intervals (typically 25 minutes) followed by a short break. It helps in maintaining concentration and avoiding burnout.</li>
                            <li><strong>Kanban Boards:</strong> Visualizing tasks using Kanban boards allows for an easy overview of tasks in different stages of completion. Tools like Trello and Jira are popular for implementing Kanban boards.</li>
                            <li><strong>GTD (Getting Things Done):</strong> This methodology emphasizes capturing all tasks and responsibilities in a system, clarifying their next actions, and regularly reviewing and organizing them.</li>
                        </ul>
                        <br/><br/>
                        <strong>Benefits of Effective Task Management</strong>
                        <br/><br/>
                        <ul style={styles.list}>
                            <li><strong>Increased Productivity:</strong> Efficient task management leads to higher productivity by ensuring tasks are completed in a timely manner and with fewer disruptions.</li>
                            <li><strong>Reduced Stress:</strong> By staying organized and focused, you minimize the risk of last-minute rushes and overwhelm, leading to reduced stress levels.</li>
                            <li><strong>Enhanced Focus:</strong> Prioritizing and allocating time for tasks improves focus and concentration, leading to better quality work.</li>
                            <li><strong>Better Work-Life Balance:</strong> Effective task management helps in balancing work responsibilities with personal life, contributing to overall well-being and satisfaction.</li>
                        </ul>
                        <br/><br/>
                        <strong>Conclusion</strong>
                        <br/><br/>
                        Mastering task management is not just about keeping track of your to-do list; it’s about creating a structured approach to achieve your goals efficiently. By adopting the right strategies and utilizing the appropriate tools, you can enhance your productivity, reduce stress, and achieve a better work-life balance. Embrace the art of task management and watch as it transforms your productivity and efficiency, paving the way for personal and professional success.
                    </p>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px',
    },
    infoContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    text: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: '1.6',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
    },
};

export default About;
