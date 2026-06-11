package com.apollo.dealers.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.dto.DashboardSummaryDTO;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    // =====================================
    // CONTRACTOR DASHBOARD
    // =====================================

    @GetMapping("/{contractorId}/assigned")
    public List<TaskAssignment> assigned(
            @PathVariable Long contractorId) {

        return dashboardService
                .getAssignedTasks(contractorId);
    }

    @GetMapping("/{contractorId}/submitted")
    public List<TaskAssignment> submitted(
            @PathVariable Long contractorId) {

        return dashboardService
                .getSubmittedTasks(contractorId);
    }

    @GetMapping("/{contractorId}/approved")
    public List<TaskAssignment> approved(
            @PathVariable Long contractorId) {

        return dashboardService
                .getApprovedTasks(contractorId);
    }

    @GetMapping("/{contractorId}/rejected")
    public List<TaskAssignment> rejected(
            @PathVariable Long contractorId) {

        return dashboardService
                .getRejectedTasks(contractorId);
    }

    @GetMapping("/{contractorId}/pending")
    public List<TaskAssignment> pending(
            @PathVariable Long contractorId) {

        return dashboardService
                .getPendingTasks(contractorId);
    }

    @GetMapping("/{contractorId}/summary")
    public Map<String, Long> contractorSummary(
            @PathVariable Long contractorId) {

        return dashboardService
                .getContractorSummary(contractorId);
    }

    // =====================================
    // SUPERVISOR DASHBOARD
    // =====================================

    @GetMapping("/supervisor/submitted")
    public List<TaskAssignment> supervisorSubmitted() {

        return dashboardService.getAllSubmittedTasks();
    }

    @GetMapping("/supervisor/approved")
    public List<TaskAssignment> supervisorApproved() {

        return dashboardService.getAllApprovedTasks();
    }

    @GetMapping("/supervisor/rejected")
    public List<TaskAssignment> supervisorRejected() {

        return dashboardService.getAllRejectedTasks();
    }

    @GetMapping("/supervisor/complied")
    public List<TaskAssignment> complied() {

        return dashboardService.getCompliedTasks();
    }

    @GetMapping("/supervisor/delayed")
    public List<TaskAssignment> delayed() {

        return dashboardService.getDelayedTasks();
    }

    @GetMapping("/supervisor/not-complied")
    public List<TaskAssignment> notComplied() {

        return dashboardService.getNotCompliedTasks();
    }

    @GetMapping("/supervisor/not-applicable")
    public List<TaskAssignment> notApplicable() {

        return dashboardService.getNotApplicableTasks();
    }

    @GetMapping("/supervisor/summary")
    public Map<String, Long> supervisorSummary() {

        return dashboardService
                .getSupervisorSummary();
    }

    @GetMapping("/summary")
    public DashboardSummaryDTO summary() {

        return dashboardService.getSummary();
    }
}