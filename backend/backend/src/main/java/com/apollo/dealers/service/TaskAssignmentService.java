package com.apollo.dealers.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.apollo.dealers.dto.TaskAssignmentRequest;
import com.apollo.dealers.entity.AssignmentStatus;
import com.apollo.dealers.entity.ComplianceStatus;
import com.apollo.dealers.entity.ComplianceTask;
import com.apollo.dealers.entity.Contractor;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.repository.ComplianceTaskRepository;
import com.apollo.dealers.repository.ContractorRepository;
import com.apollo.dealers.repository.TaskAssignmentRepository;

@Service
public class TaskAssignmentService {

        private final TaskAssignmentRepository assignmentRepository;
        private final ComplianceTaskRepository taskRepository;
        private final ContractorRepository contractorRepository;
        private final EmailService emailService;

        public TaskAssignmentService(
                        TaskAssignmentRepository assignmentRepository,
                        ComplianceTaskRepository taskRepository,
                        ContractorRepository contractorRepository,
                        EmailService emailService) {

                this.assignmentRepository = assignmentRepository;
                this.taskRepository = taskRepository;
                this.contractorRepository = contractorRepository;
                this.emailService = emailService;
        }

        // =====================================
        // ASSIGN TASK
        // =====================================

        public TaskAssignment assignTask(
                        TaskAssignmentRequest request) {

                ComplianceTask task = taskRepository.findById(
                                request.getTaskId())
                                .orElseThrow(() -> new RuntimeException("Task not found"));

                Contractor contractor = contractorRepository.findById(
                                request.getContractorId())
                                .orElseThrow(() -> new RuntimeException("Contractor not found"));

                TaskAssignment assignment = new TaskAssignment();

                assignment.setComplianceTask(task);
                assignment.setContractor(contractor);
                assignment.setAssignedDate(LocalDate.now());
                assignment.setDueDate(request.getDueDate());

                assignment.setStatus(
                                AssignmentStatus.PENDING);

                assignment.setComplianceStatus(
                                ComplianceStatus.NOT_COMPLIED);

                TaskAssignment savedAssignment = assignmentRepository.save(assignment);

                // Email Notification

                if (contractor.getUser() != null
                                &&
                                contractor.getUser().getEmail() != null) {

                        emailService.sendMail(
                                        contractor.getUser().getEmail(),
                                        "Compliance Task Assigned",
                                        "A new compliance task has been assigned to you.\n\n"
                                                        + "Task : "
                                                        + task.getTaskName()
                                                        + "\nDue Date : "
                                                        + request.getDueDate()
                                                        + "\n\nPlease login and complete the compliance before the due date.");
                }

                return savedAssignment;
        }

        // =====================================
        // GET ALL ASSIGNMENTS
        // =====================================

        public List<TaskAssignment> getAllAssignments() {

                return assignmentRepository.findAll();
        }

        // =====================================
        // MARK COMPLIED
        // =====================================

        public TaskAssignment markComplied(
                        Long id) {

                TaskAssignment assignment = assignmentRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException(
                                                "Assignment not found"));

                if (LocalDate.now().isAfter(
                                assignment.getDueDate().plusDays(5))) {

                        assignment.setComplianceStatus(
                                        ComplianceStatus.DELAY_PARTIAL_COMPLIED);

                } else {

                        assignment.setComplianceStatus(
                                        ComplianceStatus.COMPLIED);
                }

                assignment.setStatus(
                                AssignmentStatus.SUBMITTED);

                return assignmentRepository.save(
                                assignment);
        }

        // =====================================
        // MARK NOT APPLICABLE
        // =====================================

        public TaskAssignment markNotApplicable(
                        Long id) {

                TaskAssignment assignment = assignmentRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException(
                                                "Assignment not found"));

                assignment.setComplianceStatus(
                                ComplianceStatus.NOT_APPLICABLE);

                return assignmentRepository.save(
                                assignment);
        }

        // =====================================
        // DASHBOARD COUNTS
        // =====================================

        public long getCompliedCount() {

                return assignmentRepository.countByComplianceStatus(
                                ComplianceStatus.COMPLIED);
        }

        public long getDelayPartialCount() {

                return assignmentRepository.countByComplianceStatus(
                                ComplianceStatus.DELAY_PARTIAL_COMPLIED);
        }

        public long getNotCompliedCount() {

                return assignmentRepository.countByComplianceStatus(
                                ComplianceStatus.NOT_COMPLIED);
        }

    public long getNotApplicableCount() {

            return assignmentRepository.countByComplianceStatus(
                            ComplianceStatus.NOT_APPLICABLE);
    }

}
