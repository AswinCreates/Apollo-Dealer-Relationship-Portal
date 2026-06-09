package com.apollo.dealers.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}