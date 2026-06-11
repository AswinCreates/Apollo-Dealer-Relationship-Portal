package com.apollo.dealers.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import com.apollo.dealers.entity.TaskSubmission;
import com.apollo.dealers.service.SubmissionService;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(
            SubmissionService submissionService) {

        this.submissionService = submissionService;
    }

    @PostMapping("/upload")
    public TaskSubmission uploadDocument(

            @RequestParam Long assignmentId,

            @RequestParam(required = false) String remarks,

            @RequestParam MultipartFile file)

            throws IOException {

        return submissionService.uploadDocument(
                assignmentId,
                remarks,
                file);
    }

    // =====================================
    // GET SUBMISSION BY ASSIGNMENT
    // =====================================

    @GetMapping("/assignment/{assignmentId}")
    public TaskSubmission getSubmission(
            @PathVariable Long assignmentId) {

        return submissionService
                .getSubmissionByAssignment(assignmentId);
    }

    // =====================================
    // GET ALL SUBMISSIONS
    // =====================================

    @GetMapping
    public List<TaskSubmission> getAllSubmissions() {

        return submissionService
                .getAllSubmissions();
    }

    // =====================================
    // DOWNLOAD DOCUMENT
    // =====================================

    @GetMapping("/download/{submissionId}")
    public ResponseEntity<Resource> downloadDocument(
            @PathVariable Long submissionId)
            throws IOException {

        return submissionService.downloadFile(submissionId);
    }
}