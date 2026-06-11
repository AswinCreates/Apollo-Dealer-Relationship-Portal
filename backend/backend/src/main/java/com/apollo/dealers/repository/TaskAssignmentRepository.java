package com.apollo.dealers.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apollo.dealers.entity.AssignmentStatus;
import com.apollo.dealers.entity.ComplianceStatus;
import com.apollo.dealers.entity.TaskAssignment;

public interface TaskAssignmentRepository
                extends JpaRepository<TaskAssignment, Long> {

        // =========================
        // Dashboard Counts
        // =========================

        long countByStatus(
                        AssignmentStatus status);

        long countByComplianceStatus(
                        ComplianceStatus complianceStatus);

        long countByContractorContractorId(
                        Long contractorId);

        long countByContractorContractorIdAndStatus(
                        Long contractorId,
                        AssignmentStatus status);

        long countByContractorContractorIdAndComplianceStatus(
                        Long contractorId,
                        ComplianceStatus complianceStatus);

        

        // =========================
        // Dashboard Lists
        // =========================

        List<TaskAssignment> findByContractorContractorId(
                        Long contractorId);

        List<TaskAssignment> findByContractorContractorIdAndStatus(
                        Long contractorId,
                        AssignmentStatus status);

        // =========================
        // Supervisor Dashboard
        // =========================

        List<TaskAssignment> findByStatus(
                        AssignmentStatus status);

        List<TaskAssignment> findByComplianceStatus(
                        ComplianceStatus complianceStatus);

                        

                
}