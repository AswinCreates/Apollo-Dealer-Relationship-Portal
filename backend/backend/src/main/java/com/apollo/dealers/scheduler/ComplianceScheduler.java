package com.apollo.dealers.scheduler;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.apollo.dealers.entity.AssignmentStatus;
import com.apollo.dealers.entity.ComplianceStatus;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.repository.TaskAssignmentRepository;

@Component
public class ComplianceScheduler {

    private final TaskAssignmentRepository assignmentRepository;

    public ComplianceScheduler(
            TaskAssignmentRepository assignmentRepository) {

        this.assignmentRepository = assignmentRepository;
    }

    @Scheduled(cron = "0 0 9 * * ?")
    public void updateOverdueTasks() {

        List<TaskAssignment> pendingTasks = assignmentRepository.findByStatus(
                AssignmentStatus.PENDING);

        for (TaskAssignment assignment : pendingTasks) {

            if (assignment.getDueDate() != null
                    && LocalDate.now().isAfter(
                            assignment.getDueDate().plusDays(5))) {

                assignment.setComplianceStatus(
                        ComplianceStatus.NOT_COMPLIED);

                assignmentRepository.save(
                        assignment);
            }
        }
    }
}