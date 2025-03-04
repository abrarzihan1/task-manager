import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TaskInfo from './TaskInfo';  // Import the TaskInfo component

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);  // Track the selected task ID
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [error, setError] = useState(null);
    const [showPastTasks, setShowPastTasks] = useState(false);  // Track visibility of past tasks
    const navigate = useNavigate();

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8082/api/tasks/user/${localStorage.getItem('username')}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                        withCredentials: true
                    }
                );
                const sortedTasks = response.data.sort((a, b) => {
                    const dateA = new Date(a.dueDate);
                    const dateB = new Date(b.dueDate);
                    return dateA - dateB; // Sort in ascending order
                });
                setTasks(sortedTasks);
            } catch (error) {
                setError('Failed to load tasks. Please try again later.');
                console.log(error);
            } finally {
                setLoadingTasks(false);
            }
        };

        getTasks();
    }, []);

    const handleSelectTask = (id) => {
        setSelectedTaskId(id);
    };

    const updateTaskInList = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const handleCreateTask = () => {
        navigate('/tasks/new');
    };

    const formatText = (text) => {
        return text
            .split('_')  // Split by underscore
            .map((word, index) => {
                if (index === 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();  // Capitalize the first word
                }
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();  // Capitalize subsequent words
            })
            .join(' ');
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'LOW':
                return 'green';
            case 'MEDIUM':
                return 'yellow';
            case 'HIGH':
                return 'red';
            default:
                return 'gray';
        }
    };

    const filterTasks = () => {
        const currentDate = new Date();
        return tasks.filter((task) => {
            const taskDate = new Date(task.dueDate);
            return showPastTasks ? taskDate <= currentDate : taskDate > currentDate;
        });
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <button className="dashboard-button" onClick={handleCreateTask}>
                    Create task
                </button>

                <button
                    className="dashboard-button"
                    onClick={() => setShowPastTasks(!showPastTasks)}
                >
                    {showPastTasks ? 'Show Upcoming Tasks' : 'Show Past Tasks'}
                </button>

                {loadingTasks ? (
                    <div>Loading tasks...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <div className="task-table">
                        <div className="task-table-header">
                            <div className="task-table-header-title">Task Name</div>
                            <div className="task-table-header-title">Status</div>
                            <div className="task-table-header-title">Due Date</div>
                            <div className="task-table-header-title">Priority</div>
                        </div>
                        {filterTasks().map((task, index) => (
                            <div
                                className={`task-table-row ${task.id === selectedTaskId ? 'selected' : ''}`}
                                key={index}
                                onClick={() => handleSelectTask(task.id)}
                            >
                                <div className="task-table-element">{task.title}</div>
                                <div className="task-table-element">{formatText(task.status)}</div>
                                <div className="task-table-element">{task.dueDate}</div>
                                <div className="task-table-element">
                                    <span
                                        className={`priority-badge ${getPriorityColor(task.priority)}`}
                                    >
                                        {formatText(task.priority)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <TaskInfo taskId={selectedTaskId} updateTaskInList={updateTaskInList} />
        </div>
    );
};

export default Dashboard;
