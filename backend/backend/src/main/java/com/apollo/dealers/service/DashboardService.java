package com.apollo.dealers.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.apollo.dealers.dto.DashboardSummaryDTO;
import com.apollo.dealers.entity.AssignmentStatus;
import com.apollo.dealers.entity.ComplianceStatus;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.repository.TaskAssignmentRepository;

@Service
public class DashboardService {

    private final TaskAssignmentRepository assignmentRepository;

    public DashboardService(
            TaskAssignmentRepository assignmentRepository) {

        this.assignmentRepository = assignmentRepository;
    }

    // =====================================
    // CONTRACTOR DASHBOARD
    // =====================================

    public List<TaskAssignment> getAssignedTasks(
            Long contractorId) {

        return assignmentRepository
                .findByContractorContractorId(contractorId);
    }

    public List<TaskAssignment> getSubmittedTasks(
            Long contractorId) {

        return assignmentRepository
                .findByContractorContractorIdAndStatus(
                        contractorId,
                        AssignmentStatus.SUBMITTED);
    }

    public List<TaskAssignment> getApprovedTasks(
            Long contractorId) {

        return assignmentRepository
                .findByContractorContractorIdAndStatus(
                        contractorId,
                        AssignmentStatus.APPROVED);
    }

    public List<TaskAssignment> getRejectedTasks(
            Long contractorId) {

        return assignmentRepository
                .findByContractorContractorIdAndStatus(
                        contractorId,
                        AssignmentStatus.REJECTED);
    }

    public List<TaskAssignment> getPendingTasks(
            Long contractorId) {

        return assignmentRepository
                .findByContractorContractorIdAndStatus(
                        contractorId,
                        AssignmentStatus.PENDING);
    }

    // =====================================
    // CONTRACTOR DASHBOARD SUMMARY
    // =====================================

    public Map<String, Long> getContractorSummary(
            Long contractorId) {

        Map<String, Long> summary = new HashMap<>();

        summary.put(
                "totalTasks",
                (long) assignmentRepository
                        .findByContractorContractorId(contractorId)
                        .size());

        summary.put(
                "submitted",
                (long) assignmentRepository
                        .findByContractorContractorIdAndStatus(
                                contractorId,
                                AssignmentStatus.SUBMITTED)
                        .size());

        summary.put(
                "approved",
                (long) assignmentRepository
                        .findByContractorContractorIdAndStatus(
                                contractorId,
                                AssignmentStatus.APPROVED)
                        .size());

        summary.put(
                "rejected",
                (long) assignmentRepository
                        .findByContractorContractorIdAndStatus(
                                contractorId,
                                AssignmentStatus.REJECTED)
                        .size());

        summary.put(
                "pending",
                (long) assignmentRepository
                        .findByContractorContractorIdAndStatus(
                                contractorId,
                                AssignmentStatus.PENDING)
                        .size());

        return summary;
    }

    // =====================================
    // SUPERVISOR DASHBOARD
    // =====================================

    public List<TaskAssignment> getAllSubmittedTasks() {

        return assignmentRepository.findByStatus(
                AssignmentStatus.SUBMITTED);
    }

    public List<TaskAssignment> getAllApprovedTasks() {

        return assignmentRepository.findByStatus(
                AssignmentStatus.APPROVED);
    }

    public List<TaskAssignment> getAllRejectedTasks() {

        return assignmentRepository.findByStatus(
                AssignmentStatus.REJECTED);
    }

    public List<TaskAssignment> getCompliedTasks() {

        return assignmentRepository.findByComplianceStatus(
                ComplianceStatus.COMPLIED);
    }

    public List<TaskAssignment> getDelayedTasks() {

        return assignmentRepository.findByComplianceStatus(
                ComplianceStatus.DELAY_PARTIAL_COMPLIED);
    }

    public List<TaskAssignment> getNotCompliedTasks() {

        return assignmentRepository.findByComplianceStatus(
                ComplianceStatus.NOT_COMPLIED);
    }

    public List<TaskAssignment> getNotApplicableTasks() {

        return assignmentRepository.findByComplianceStatus(
                ComplianceStatus.NOT_APPLICABLE);
    }

    // =====================================
    // SUPERVISOR DASHBOARD SUMMARY
    // =====================================

    public Map<String, Long> getSupervisorSummary() {

        Map<String, Long> summary = new HashMap<>();

        summary.put(
                "submitted",
                assignmentRepository.countByStatus(
                        AssignmentStatus.SUBMITTED));

        summary.put(
                "approved",
                assignmentRepository.countByStatus(
                        AssignmentStatus.APPROVED));

        summary.put(
                "rejected",
                assignmentRepository.countByStatus(
                        AssignmentStatus.REJECTED));

        summary.put(
                "complied",
                assignmentRepository.countByComplianceStatus(
                        ComplianceStatus.COMPLIED));

        summary.put(
                "delayPartialComplied",
                assignmentRepository.countByComplianceStatus(
                        ComplianceStatus.DELAY_PARTIAL_COMPLIED));

        summary.put(
                "notComplied",
                assignmentRepository.countByComplianceStatus(
                        ComplianceStatus.NOT_COMPLIED));

        summary.put(
                "notApplicable",
                assignmentRepository.countByComplianceStatus(
                        ComplianceStatus.NOT_APPLICABLE));

        return summary;
    }

    public DashboardSummaryDTO getSummary() {

    DashboardSummaryDTO dto =
            new DashboardSummaryDTO();

    dto.setTotalTasks(
            assignmentRepository.count());

    dto.setComplied(
            assignmentRepository.countByComplianceStatus(
                    ComplianceStatus.COMPLIED));

    dto.setDelayPartial(
            assignmentRepository.countByComplianceStatus(
                    ComplianceStatus.DELAY_PARTIAL_COMPLIED));

    dto.setNotComplied(
            assignmentRepository.countByComplianceStatus(
                    ComplianceStatus.NOT_COMPLIED));

    dto.setNotApplicable(
            assignmentRepository.countByComplianceStatus(
                    ComplianceStatus.NOT_APPLICABLE));

    return dto;
}
}