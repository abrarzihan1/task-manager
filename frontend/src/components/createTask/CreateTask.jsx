import React from 'react';
import './CreateTask.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const CreateTask = () => {
    const [error, setError] = React.useState('');
    const navigate = useNavigate();
    const priority = ['LOW', 'MEDIUM', 'HIGH'];
    const status = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

    const [task, setTask] = React.useState({
        username: localStorage.getItem('username'),
        title: '',
        description: '',
        status: '',
        priority: '',
        dueDate: ''
    });

    const createTask = async () => {
        try {
            const response = await axios.post('http://localhost:8082/api/tasks',
                task,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    withCredentials: true
                }
            );
            alert('Task created');
            navigate('/dashboard');
        } catch (error) {
            setError('Error creating task');
        }
    };

    const handleGoBack = () => {
        navigate('/dashboard');
    }

    return (
        <div className="create-task-page">
            <form className="create-task-form">
                <Link to={'/dashboard'} className="return-link">{"<"} Go Back</Link>
                <h1>Create a new task</h1>
                <div className="task-form-element">
                    <label htmlFor="title" className="task-form-label">Title</label>
                    <input
                        type="text"
                        value={task.title}
                        placeholder="Enter title"
                        onChange={(e) => setTask({...task, title: e.target.value})}
                        className="task-form-text-input"
                    />
                </div>
                <div className="task-form-element">
                    <label htmlFor="description" className="task-form-label">Description</label>
                    <input
                        type="text"
                        value={task.description}
                        placeholder="Enter description"
                        onChange={(e) => setTask({...task, description: e.target.value})}
                        className="task-form-text-input"
                    />
                </div>
                <div className="task-form-element">
                    <label htmlFor="priority" className="task-form-label">Priority</label>
                    <div className="task-form-buttons">
                        {priority.map(type => (
                            <button
                                key={type}
                                className={task.priority === type ? 'task-form-button-selected' : 'task-form-button'}
                                onClick={() => setTask({...task, priority: type})}
                                type="button"
                            >
                                {type.replace('_', '')}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="task-form-element">
                    <label htmlFor="status" className="task-form-label">Status</label>
                    <div className="task-form-buttons">
                        {status.map(type => (
                            <button
                                key={type}
                                className={task.status === type ? 'task-form-button-selected' : 'task-form-button'}
                                onClick={() => setTask({...task, status: type})}
                                type="button"
                            >
                                {type.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="task-form-element">
                    <label htmlFor="dueDate" className="task-form-label">Due Date</label>
                    <input
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => setTask({...task, dueDate: e.target.value})}
                        className="task-form-text-input"
                    />
                </div>
                <button type="button" onClick={createTask} className="create-task-button">Create Task</button>
                <div className="task-form-element">
                    {error && <p className="error-message">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
