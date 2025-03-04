import React, {useEffect, useState} from 'react';
import axios from 'axios';

const TaskInfo = ({taskId, updateTaskInList}) => {
    const [displayedTask, setDisplayedTask] = useState(null);
    const [loadingTaskDetails, setLoadingTaskDetails] = useState(false);

    const [formData, setFormData] = useState({
        username: localStorage.getItem('username'),
        title: '',
        description: '',
        status: '',
        priority: '',
        dueDate: ''
    });

    useEffect(() => {
        if (!taskId) return;

        const getTaskDetails = async () => {
            setLoadingTaskDetails(true);
            setDisplayedTask(null); // Clear previous task details while loading new data
            try {
                const response = await axios.get(`http://localhost:8082/api/tasks/id/${taskId}`,
                    {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                        withCredentials: true
                    }
                );
                setDisplayedTask(response.data);
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    priority: response.data.priority,
                    status: response.data.status,
                    dueDate: response.data.dueDate
                });
            } catch (err) {
                alert('Failed to load task details. Please try again later.');
                console.log(err);
            } finally {
                setLoadingTaskDetails(false);
            }
        };

        getTaskDetails();
    }, [taskId]);  // Fetch task details when taskId changes

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8082/api/tasks/${taskId}`,
                formData,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                    withCredentials: true
                }
            );
            alert('Tasked updated successfully.');
            setDisplayedTask(response.data);
            updateTaskInList(response.data);
        } catch (err) {
            alert('Failed to update task details. Please try again later.');
            console.log(err);
        }
    };

    const handleCancel = () => {
        setFormData({
            title: displayedTask.title,
            description: displayedTask.description,
            priority: displayedTask.priority,
            status: displayedTask.status,
            dueDate: displayedTask.dueDate
        });
    };

    return (
        <div className="task-info-container">
            {loadingTaskDetails ? (
                <div>Loading task details...</div>
            ) : displayedTask ? (
                <>
                    <div className="form-input-row">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-input-title"
                        />
                    </div>

                    <div className="form-input-row">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-input-row">
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="task-select"
                        >
                            <option value="LOW">Low Priority</option>
                            <option value="MEDIUM">Medium Priority</option>
                            <option value="HIGH">High Priority</option>
                        </select>
                    </div>

                    <div className="form-input-row">
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="task-select"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>

                    <div className="form-input-row">
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="date-input"
                        />
                    </div>

                    <div className="task-info-buttons">
                        <button onClick={handleCancel} className="task-info-button">Cancel</button>
                        <button onClick={handleSave} className="task-info-button">Save Changes</button>
                    </div>
                </>
            ) : (
                <div>Select a task to view details.</div>
            )}
        </div>
    );
};

export default TaskInfo;
