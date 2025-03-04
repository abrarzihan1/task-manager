package org.taskmanager.service.implmentation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.taskmanager.model.Task;
import org.taskmanager.repository.TaskRepository;
import org.taskmanager.service.TaskService;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskServiceImplementation implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public String addTask(Task task) {
        taskRepository.save(task);
        return "Success";
    }

    @Override
    public Task getTask(long id) {
        return taskRepository.findById(id);
    }

    @Override
    public List<Task> getTasksByUsername(String username) {
        return taskRepository.findByUsername(username);
    }

    @Override
    public boolean deleteTask(long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Task updateTask(long id, Task task) {
        Task existingTask = taskRepository.findById(id);
        if (existingTask != null) {
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setPriority(task.getPriority());
            existingTask.setStatus(task.getStatus());
            existingTask.setDueDate(task.getDueDate());
            return taskRepository.save(existingTask);
        }
        return null;
    }
}
