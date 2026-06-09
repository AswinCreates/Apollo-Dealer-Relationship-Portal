package com.apollo.dealers.dto;

public class SubmissionRequest {

    private Long assignmentId;

    private String remarks;

    public SubmissionRequest() {
    }

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}