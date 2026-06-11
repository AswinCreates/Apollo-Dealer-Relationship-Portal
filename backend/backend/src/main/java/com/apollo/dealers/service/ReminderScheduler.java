package com.apollo.dealers.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.apollo.dealers.entity.AssignmentStatus;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.repository.TaskAssignmentRepository;

@Component
public class ReminderScheduler {

    private final TaskAssignmentRepository assignmentRepository;
    private final EmailService emailService;

    public ReminderScheduler(
            TaskAssignmentRepository assignmentRepository,
            EmailService emailService) {

        this.assignmentRepository = assignmentRepository;
        this.emailService = emailService;
    }

    @Scheduled(cron = "0 0 9 * * *")
    public void sendReminderEmails() {

        List<TaskAssignment> assignments = assignmentRepository.findAll();

        LocalDate today = LocalDate.now();

        for (TaskAssignment assignment : assignments) {

            if (assignment.getStatus() == AssignmentStatus.APPROVED) {
                continue;
            }

            if (assignment.getContractor() == null
                    || assignment.getContractor().getUser() == null
                    || assignment.getContractor().getUser().getEmail() == null) {
                continue;
            }

            LocalDate dueDate = assignment.getDueDate();

            if (dueDate == null) {
                continue;
            }

            long daysRemaining = today.until(dueDate).getDays();

            if (daysRemaining <= 3) {

                emailService.sendMail(
                        assignment.getContractor()
                                .getUser()
                                .getEmail(),

                        "Compliance Task Reminder",

                        "Task: "
                                + assignment.getComplianceTask().getTaskName()
                                + "\nDue Date: "
                                + dueDate
                                + "\nPlease submit your compliance documents.");
            }
        }
    }
}