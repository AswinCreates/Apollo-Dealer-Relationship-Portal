package com.apollo.dealers.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public SubmissionService(
            TaskSubmissionRepository submissionRepository,
            TaskAssignmentRepository assignmentRepository) {

        this.submissionRepository = submissionRepository;
        this.assignmentRepository = assignmentRepository;
    }

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

        submission.setRemarks(remarks);

        submission.setSubmissionDate(
                LocalDate.now());

        if (LocalDate.now().isAfter(
                assignment.getDueDate().plusDays(5))) {

            assignment.setComplianceStatus(
                    ComplianceStatus.DELAY_PARTIAL_COMPLIED);

        } else {

            assignment.setComplianceStatus(
                    ComplianceStatus.COMPLIED);
        }

        assignment.setStatus(
                AssignmentStatus.COMPLETED);

        assignmentRepository.save(assignment);

        return submissionRepository.save(submission);
    }
}