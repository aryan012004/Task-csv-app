import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CSVLink } from 'react-csv';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
    const [data1, setData1] = useState([]);
    const [to, setTo] = useState({});
    const [filters, setFilters] = useState({ status: '', priority: '', dueDate: '', assignee: '' });
    const [savedFilters, setSavedFilters] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [user, setUserData] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [importErrors, setImportErrors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Pagination
    const [tasksPerPage] = useState(10); // Number of tasks per page
    const { userId } = useParams();
    const intervals = useRef({});

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        if (storedUserData) {
            setUserData(storedUserData);
        }

        const storedData = JSON.parse(localStorage.getItem('todoList')) || [];
        setData1(storedData);
    }, [userId]);

    useEffect(() => {
        if (data1.length > 0) {
            localStorage.setItem('todoList', JSON.stringify(data1));
        }
    }, [data1]);

    // Pagination Logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    // Handle page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Apply filters to the task list
    useEffect(() => {
        let tasks = [...data1];

        if (filters.status) {
            tasks = tasks.filter(task => filters.status === 'Completed' ? task.isCompleted : !task.isCompleted);
        }

        if (filters.priority) {
            tasks = tasks.filter(task => task.priority === filters.priority);
        }

        if (filters.dueDate) {
            const currentDate = new Date();
            tasks = tasks.filter(task => {
                const dueDate = new Date(task.endDate);
                switch (filters.dueDate) {
                    case 'This Week':
                        return dueDate >= currentDate && dueDate <= new Date(currentDate.setDate(currentDate.getDate() + 7));
                    case 'This Month':
                        return dueDate.getMonth() === new Date().getMonth();
                    default:
                        return true;
                }
            });
        }

        if (filters.assignee) {
            tasks = tasks.filter(task => task.assignedTo === filters.assignee);
        }

        setFilteredTasks(tasks);
    }, [filters, data1]);

    // Save custom filters
    const saveFilter = () => {
        setSavedFilters([...savedFilters, filters]);
        localStorage.setItem('savedFilters', JSON.stringify([...savedFilters, filters]));
        toast.success("Filter saved!");
    };

    // Load custom filters
    const loadSavedFilters = () => {
        const saved = JSON.parse(localStorage.getItem('savedFilters')) || [];
        setSavedFilters(saved);
        toast.success("Filters loaded!");
    };
    const deleteData = (id) => {
        const taskToDelete = data1.find(task => task.id === id);
        if (!taskToDelete.permissions.includes(user.username)) {
            toast.error("You do not have permission to delete this task.");
            return;
        }
        clearInterval(intervals.current[id]);
        const newData = data1.filter(v => v.id !== id);
        setData1(newData);
        toast.error("Task deleted");
    };

    const completeTask = (id) => {
        const taskToComplete = data1.find(task => task.id === id);
        if (!taskToComplete.permissions.includes(user.username)) {
            toast.error("You are not authorized to complete this task.");
            return;
        }
        clearInterval(intervals.current[id]);
        const updatedData = data1.map(task =>
            task.id === id ? { ...task, isCompleted: true } : task
        );
        setData1(updatedData);
        toast.success("Task completed!");
    };
    const setReminder = (task) => {
        toast.info(`Task due on: ${task.endDate}`);
    };

    // Apply saved filter
    const applySavedFilter = (filter) => {
        setFilters(filter);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Import tasks from CSV
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file.size > 1000000) { // 1MB limit
            toast.error("File size exceeds the limit.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n').map(row => row.split(','));
            const newTasks = [];
            let hasErrors = false;

            rows.forEach((row, index) => {
                if (index === 0) return; // Skip header

                const [task, taskdetail, endDate, assignedTo, isCompleted, permissions] = row;

                // Validate each field
                if (!task || !taskdetail || !endDate || !assignedTo) {
                    toast.error(`Row ${index + 1}: Missing required fields.`);
                    hasErrors = true;
                    return;
                }

                if (new Date(endDate) < new Date()) {
                    toast.error(`Row ${index + 1}: End date cannot be in the past.`);
                    hasErrors = true;
                    return;
                }

                const newTask = {
                    task,
                    taskdetail,
                    startDate: new Date().toISOString(),
                    endDate,
                    assignedTo,
                    isCompleted: isCompleted === 'Completed',
                    permissions: permissions ? permissions.split(', ') : [user.username]
                };

                newTasks.push(newTask);
            });

            if (!hasErrors) {
                setData1([...data1, ...newTasks]);
                toast.success("Tasks imported successfully!");
            }
        };
        reader.readAsText(file);
    };

    // Task form validation
    const validateForm = () => {
        const { task, taskdetail, endDate, assignedTo } = to;
        if (!task || !taskdetail || !endDate || !assignedTo) {
            toast.error("All fields must be filled out before submitting.");
            return false;
        }
        return true;
    };

    // Handle task creation
    const Tododata = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Prevent form submission if validation fails

        const obj = {
            task: e.target.task.value,
            taskdetail: e.target.taskdetail.value,
            startDate: new Date().toISOString(),
            endDate: e.target.endDate.value,
            id: Math.round(Math.random() * 1000),
            isCompleted: false,
            elapsedTime: "0:00:00",
            assignedTo: e.target.assignedTo.value,
            permissions: [user.username]
        };

        setData1([...data1, obj]);
        toast.success("Task added successfully!");
        e.target.reset();
    };

    return (
        <div style={styles.container}>
            <div>
                {user ? (
                    <h1>Welcome to your dashboard, {user.username}!</h1>
                ) : (
                    <h1>Loading your dashboard...</h1>
                )}
            </div>

            <h1 style={styles.title}>ADD TASK</h1>

            {/* Task Input Form */}
            <form method="post" onSubmit={Tododata} style={styles.form}>
                <table border={1} cellPadding="10px" style={styles.table}>
                    <tbody>
                        <tr>
                            <td>Task Title:</td>
                            <td>
                                <textarea name="task" style={styles.textarea} onChange={(e) => setTo({ ...to, task: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>Task Details:</td>
                            <td>
                                <textarea name="taskdetail" style={styles.textarea} onChange={(e) => setTo({ ...to, taskdetail: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>Due Date:</td>
                            <td>
                                <input type="date" name="endDate" style={styles.input} onChange={(e) => setTo({ ...to, endDate: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>Assign To:</td>
                            <td>
                                <input type="text" name="assignedTo" style={styles.input} onChange={(e) => setTo({ ...to, assignedTo: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={styles.submitRow}>
                                <input type="submit" style={styles.submitButton} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {/* CSV Export/Import */}
            <div style={styles.csvContainer}>
                <CSVLink data={data1} filename="tasks_export.csv">
                    <button style={styles.csvButton}>Export Tasks to CSV</button>
                </CSVLink>
                <input type="file" accept=".csv" onChange={handleFileUpload} style={styles.fileInput} />
            </div>

            {/* Filter Form */}
            <div style={styles.filterContainer}>
                <h3>Filters</h3>
                <div style={styles.filterGroup}>
                    <label>Status:</label>
                    <select name="status" value={filters.status} onChange={handleFilterChange} style={styles.filterInput}>
                        <option value="">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Incomplete">Incomplete</option>
                    </select>
                </div>
                <div style={styles.filterGroup}>
                    <label>Priority:</label>
                    <select name="priority" value={filters.priority} onChange={handleFilterChange} style={styles.filterInput}>
                        <option value="">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div style={styles.filterGroup}>
                    <label>Due Date:</label>
                    <select name="dueDate" value={filters.dueDate} onChange={handleFilterChange} style={styles.filterInput}>
                        <option value="">All</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                    </select>
                </div>
                <div style={styles.filterGroup}>
                    <label>Assigne:</label>
                    <input type="text" name="assignee" value={filters.assignee} onChange={handleFilterChange} style={styles.filterInput} placeholder="Assignee Name" />
                </div>
                <button onClick={saveFilter} style={styles.saveButton}>Save Filter</button>
                <button onClick={loadSavedFilters} style={styles.loadButton}>Load Saved Filters</button>

                {savedFilters.length > 0 && (
                    <div style={styles.savedFilters}>
                        <h4>Saved Filters:</h4>
                        {savedFilters.map((filter, index) => (
                            <button key={index} onClick={() => applySavedFilter(filter)} style={styles.applyFilterButton}>
                                {`Status: ${filter.status}, Priority: ${filter.priority}, Due Date: ${filter.dueDate}, Assignee: ${filter.assignee}`}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Display Filtered Task List */}
                <h2 style={{textAlign:"center"}}>YOUR TASKS</h2>
            <div style={styles.taskList}>
                {currentTasks.length === 0 ? (
                    <h3 style={styles.noTasks}>No tasks found.</h3>
                ) : (
                    currentTasks.map((v, i) => (
                        <div key={i} style={styles.taskCard}>
                            <div style={styles.taskHeader}>
                                <span style={styles.taskLabel}>Task</span>
                                <button onClick={() => deleteData(v.id)} style={styles.deleteButton}>❌</button>
                            </div>
                            <h2 style={styles.taskTitle}>
                                <span>🏴</span>{v.task}
                            </h2>
                            <h4 style={styles.taskDetails}>Task Details: {v.taskdetail}</h4>
                            <h4>Assigned To: {v.assignedTo}</h4>
                            <div style={styles.taskInfo}>
                                <span>Start: {new Date(v.startDate).toLocaleString()}</span>
                                <span style={styles.dueDate}>Due: {v.endDate}</span>
                            </div>
                            <div style={styles.taskActions}>
                                <button onClick={() => completeTask(v.id)} style={styles.completeButton}>Completed</button>
                                <button onClick={() => setReminder(v)} style={styles.remindButton}>Remind</button>
                                
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div style={styles.pagination}>
                {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={currentPage === index + 1 ? styles.activePageButton : styles.pageButton}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f7fa',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
    },
    form: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    textarea: {
        width: '100%',
        height: '60px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        padding: '10px',
    },
    input: {
        width: '100%',
        height: '35px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        padding: '10px',
    },
    submitRow: {
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    csvContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    csvButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '20px',
    },
    fileInput: {
        marginTop: '20px',
        padding: '10px',
    },
    filterContainer: {
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    filterGroup: {
        marginBottom: '15px',
    },
    filterInput: {
        padding: '10px',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
    },
    loadButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
        marginLeft: '10px',
    },
    savedFilters: {
        marginTop: '20px',
    },
    applyFilterButton: {
        display: 'block',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
    },
    taskList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    },
    taskCard: {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '487px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    taskHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '10px',
    },
    taskLabel: {
        backgroundColor: '#4CAF50',
        padding: '5px 15px',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#333',
        fontSize: '18px',
        cursor: 'pointer',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    pageButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        margin: '0 5px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
    },
    activePageButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px',
        margin: '0 5px',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
    },
    completeButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        flex: 1,
      
    },
    remindButton: {
        backgroundColor: '#FFC107',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        flex: 1,
    },
    noTasks: {
        textAlign: 'center',
        color: '#999',
    }
};

export default Dashboard;
