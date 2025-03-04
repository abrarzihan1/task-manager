package org.taskmanager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.taskmanager.model.Task;
import org.taskmanager.service.TaskService;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/tasks")
@RestController
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/id/{id}")
    public Task getTask(@PathVariable long id) {
        return taskService.getTask(id);
    }

    @GetMapping("/user/{username}")
    public List<Task> getTasksByUser(@PathVariable String username) {
        return taskService.getTasksByUsername(username);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        String result = taskService.addTask(task);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable long id) {
        if (taskService.deleteTask(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable long id, @RequestBody Task task) {
        try {
            // Check if the task exists first, and update it if it does
            Task updatedTask = taskService.updateTask(id, task);

            // If the task is successfully updated, return the updated task with a 200 OK response
            if (updatedTask != null) {
                return ResponseEntity.ok(updatedTask);  // Return the updated task in the response
            } else {
                // If the task wasn't found, return a 404 Not Found
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // If there is any other exception, return a 500 Internal Server Error with a message
            return ResponseEntity.status(500).body("Failed to update task: " + e.getMessage());
        }
    }

}
