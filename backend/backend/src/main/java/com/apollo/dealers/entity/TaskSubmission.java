package com.apollo.dealers.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "task_submissions")
public class TaskSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "assignment_id")
    private TaskAssignment taskAssignment;

    @Column(name = "document_name")
    private String documentName;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "submission_date")
    private LocalDate submissionDate;

    public TaskSubmission() {
    }

    public Long getId() {
        return id;
    }

    public TaskAssignment getTaskAssignment() {
        return taskAssignment;
    }

    public void setTaskAssignment(TaskAssignment taskAssignment) {
        this.taskAssignment = taskAssignment;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }
}