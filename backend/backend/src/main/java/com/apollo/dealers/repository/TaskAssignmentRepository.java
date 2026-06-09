package com.apollo.dealers.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apollo.dealers.entity.ComplianceStatus;
import com.apollo.dealers.entity.TaskAssignment;

public interface TaskAssignmentRepository
                extends JpaRepository<TaskAssignment, Long> {

        long countByComplianceStatus(
                        ComplianceStatus complianceStatus);

        List<TaskAssignment> findByComplianceStatus(
                        ComplianceStatus complianceStatus);
}