package com.apollo.dealers.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import com.apollo.dealers.entity.AssignmentStatus;
import com.apollo.dealers.entity.ComplianceStatus;
import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.entity.TaskSubmission;
import com.apollo.dealers.repository.TaskAssignmentRepository;
import com.apollo.dealers.repository.TaskSubmissionRepository;

@Service
public class SubmissionService {

        private final TaskSubmissionRepository submissionRepository;
        private final TaskAssignmentRepository assignmentRepository;
        private final EmailService emailService;

        public SubmissionService(
                        TaskSubmissionRepository submissionRepository,
                        TaskAssignmentRepository assignmentRepository,
                        EmailService emailService) {

                this.submissionRepository = submissionRepository;
                this.assignmentRepository = assignmentRepository;
                this.emailService = emailService;
        }

        // =====================================================
        // CONTRACTOR UPLOAD DOCUMENT
        // =====================================================

        public TaskSubmission uploadDocument(
                        Long assignmentId,
                        String remarks,
                        MultipartFile file)
                        throws IOException {

                TaskAssignment assignment = assignmentRepository.findById(assignmentId)
                                .orElseThrow(() -> new RuntimeException("Assignment not found"));

                String uploadDir = "uploads/compliance/";

                Files.createDirectories(Paths.get(uploadDir));

                String fileName = System.currentTimeMillis()
                                + "_"
                                + file.getOriginalFilename();

                Path filePath = Paths.get(uploadDir, fileName);

                Files.copy(
                                file.getInputStream(),
                                filePath);

                TaskSubmission submission = new TaskSubmission();

                submission.setTaskAssignment(assignment);

                submission.setDocumentName(
                                file.getOriginalFilename());

                submission.setFilePath(
                                filePath.toString());

                submission.setRemarks(
                                remarks);

                submission.setSubmissionDate(
                                LocalDate.now());

                // Waiting for supervisor review
                assignment.setStatus(
                                AssignmentStatus.SUBMITTED);

                assignmentRepository.save(assignment);

                return submissionRepository.save(submission);
        }

        // =====================================================
        // SUPERVISOR APPROVES SUBMISSION
        // =====================================================

        public TaskSubmission approveSubmission(
Long submissionId,
String supervisorRemarks) {


    TaskSubmission submission = submissionRepository.findById(submissionId)
                    .orElseThrow(() -> new RuntimeException("Submission not found"));

    TaskAssignment assignment = submission.getTaskAssignment();

    submission.setSupervisorRemarks(
                    supervisorRemarks);

    if (submission.getSubmissionDate()
                    .isAfter(assignment.getDueDate().plusDays(5))) {

            assignment.setComplianceStatus(
                            ComplianceStatus.DELAY_PARTIAL_COMPLIED);

    } else {

            assignment.setComplianceStatus(
                            ComplianceStatus.COMPLIED);
    }

    assignment.setStatus(
                    AssignmentStatus.APPROVED);

    assignmentRepository.save(assignment);

    if (assignment.getContractor() != null
                    &&
                    assignment.getContractor().getUser() != null) {

            emailService.sendMail(
                            assignment.getContractor()
                                            .getUser()
                                            .getEmail(),
                            "Compliance Submission Approved",
                            "Your compliance submission has been approved.");
    }

    return submissionRepository.save(submission);


}

public TaskSubmission rejectSubmission(
Long submissionId,
String supervisorRemarks) {


    TaskSubmission submission = submissionRepository.findById(submissionId)
                    .orElseThrow(() -> new RuntimeException("Submission not found"));

    TaskAssignment assignment = submission.getTaskAssignment();

    submission.setSupervisorRemarks(
                    supervisorRemarks);

    assignment.setStatus(
                    AssignmentStatus.REJECTED);

    assignment.setComplianceStatus(
                    ComplianceStatus.NOT_COMPLIED);

    assignmentRepository.save(assignment);

    if (assignment.getContractor() != null
                    &&
                    assignment.getContractor().getUser() != null) {

            emailService.sendMail(
                            assignment.getContractor()
                                            .getUser()
                                            .getEmail(),
                            "Compliance Submission Rejected",
                            "Your compliance submission has been rejected. Please review and resubmit.");
    }

    return submissionRepository.save(submission);


}

        // =====================================================
        // MARK TASK AS NOT APPLICABLE
        // =====================================================

        public TaskAssignment markNotApplicable(
                        Long assignmentId) {

                TaskAssignment assignment = assignmentRepository.findById(assignmentId)
                                .orElseThrow(() -> new RuntimeException("Assignment not found"));

                assignment.setComplianceStatus(
                                ComplianceStatus.NOT_APPLICABLE);

                assignment.setStatus(
                                AssignmentStatus.APPROVED);

                return assignmentRepository.save(assignment);
        }

        // =====================================
        // GET SUBMISSION BY ASSIGNMENT
        // =====================================

        public TaskSubmission getSubmissionByAssignment(
                        Long assignmentId) {

                return submissionRepository
                                .findByTaskAssignment_Id(assignmentId)
                                .orElseThrow(() -> new RuntimeException("Submission not found"));
        }

        // =====================================
        // GET ALL SUBMISSIONS
        // =====================================

        public List<TaskSubmission> getAllSubmissions() {

                return submissionRepository.findAll();
        }

        // =====================================
        // DOWNLOAD FILE
        // =====================================

        public ResponseEntity<Resource> downloadFile(
                        Long submissionId)
                        throws IOException {

                TaskSubmission submission = submissionRepository.findById(submissionId)
                                .orElseThrow(() -> new RuntimeException("Submission not found"));

                Path path = Paths.get(submission.getFilePath());

                Resource resource = new UrlResource(path.toUri());

                return ResponseEntity.ok()
                                .header(HttpHeaders.CONTENT_DISPOSITION,
                                                "attachment; filename=\"" + submission.getDocumentName() + "\"")
                                .body(resource);
        }
}

