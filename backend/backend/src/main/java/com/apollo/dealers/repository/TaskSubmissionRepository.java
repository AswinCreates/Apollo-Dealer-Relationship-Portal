package com.apollo.dealers.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apollo.dealers.entity.TaskSubmission;

public interface TaskSubmissionRepository
        extends JpaRepository<TaskSubmission, Long> {

}