package com.apollo.dealers.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.dto.TaskAssignmentRequest;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.service.TaskAssignmentService;

@RestController
@RequestMapping("/api/task-assignments")
public class TaskAssignmentController {

    private final TaskAssignmentService service;

    public TaskAssignmentController(
            TaskAssignmentService service) {

        this.service = service;
    }

    @PostMapping
    public TaskAssignment assignTask(
            @RequestBody TaskAssignmentRequest request) {

        return service.assignTask(request);
    }

    @GetMapping
    public List<TaskAssignment> getAllAssignments() {

        return service.getAllAssignments();
    }

    @PutMapping("/{id}/complied")
    public TaskAssignment markComplied(
            @PathVariable Long id) {

        return service.markComplied(id);
    }

    @PutMapping("/{id}/not-applicable")
    public TaskAssignment markNotApplicable(
            @PathVariable Long id) {

        return service.markNotApplicable(id);
    }
}