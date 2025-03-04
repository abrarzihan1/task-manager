package org.taskmanager.service;

import org.taskmanager.model.Task;

import java.util.List;

public interface TaskService {
    public String addTask(Task task);
    public Task getTask(long id);
    public List<Task> getTasksByUsername(String username);
    public boolean deleteTask(long id);
    public Task updateTask(long id, Task task);
}
