package com.apollo.dealers.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.apollo.dealers.entity.ComplianceTask;
import com.apollo.dealers.repository.ComplianceTaskRepository;

@Service
public class ComplianceTaskService {

    private final ComplianceTaskRepository repository;

    public ComplianceTaskService(
            ComplianceTaskRepository repository) {

        this.repository = repository;
    }

    public ComplianceTask createTask(
            ComplianceTask task) {

        return repository.save(task);
    }

    public List<ComplianceTask> getAllTasks() {

        return repository.findAll();
    }
}