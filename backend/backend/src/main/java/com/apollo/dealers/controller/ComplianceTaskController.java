package com.apollo.dealers.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.entity.ComplianceTask;
import com.apollo.dealers.service.ComplianceTaskService;

@RestController
@RequestMapping("/api/compliance-tasks")
public class ComplianceTaskController {

    private final ComplianceTaskService service;

    public ComplianceTaskController(
            ComplianceTaskService service) {

        this.service = service;
    }

    @PostMapping
    public ComplianceTask createTask(
            @RequestBody ComplianceTask task) {

        return service.createTask(task);
    }

    @GetMapping
    public List<ComplianceTask> getAllTasks() {

        return service.getAllTasks();
    }
}