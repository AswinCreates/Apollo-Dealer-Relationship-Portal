package com.apollo.dealers.scheduler;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.apollo.dealers.entity.AssignmentStatus;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.repository.TaskAssignmentRepository;
import com.apollo.dealers.service.EmailService;

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

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendDueDateReminders() {

        List<TaskAssignment> assignments =
                assignmentRepository.findAll();

        LocalDate today = LocalDate.now();

        for (TaskAssignment assignment : assignments) {

            if (assignment.getStatus() != AssignmentStatus.PENDING) {
                continue;
            }

            long daysLeft =
                    today.until(
                            assignment.getDueDate())
                            .getDays();

            if (daysLeft == 7
                    || daysLeft == 3
                    || daysLeft == 1) {

                String email =
                        assignment.getContractor()
                                .getUser()
                                .getEmail();

                emailService.sendMail(
                        email,
                        "Compliance Due Reminder",
                        "Task due in "
                                + daysLeft
                                + " day(s).\n\nDue Date: "
                                + assignment.getDueDate());
            }
        }
    }
}