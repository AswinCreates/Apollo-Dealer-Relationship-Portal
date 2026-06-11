package com.apollo.dealers.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apollo.dealers.entity.TaskSubmission;

public interface TaskSubmissionRepository
                extends JpaRepository<TaskSubmission, Long> {

        List<TaskSubmission> findByTaskAssignmentId(
                        Long assignmentId);

        Optional<TaskSubmission> findByTaskAssignment_Id(
                        Long assignmentId);
}