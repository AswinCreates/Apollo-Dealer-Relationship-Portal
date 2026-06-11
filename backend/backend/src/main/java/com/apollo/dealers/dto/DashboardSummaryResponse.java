package com.apollo.dealers.dto;

public class DashboardSummaryResponse {

    private long totalAssigned;
    private long submitted;
    private long approved;
    private long rejected;
    private long pendingReview;
    private long notSubmitted;

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(
            long totalAssigned,
            long submitted,
            long approved,
            long rejected,
            long pendingReview,
            long notSubmitted) {

        this.totalAssigned = totalAssigned;
        this.submitted = submitted;
        this.approved = approved;
        this.rejected = rejected;
        this.pendingReview = pendingReview;
        this.notSubmitted = notSubmitted;
    }

    public long getTotalAssigned() {
        return totalAssigned;
    }

    public long getSubmitted() {
        return submitted;
    }

    public long getApproved() {
        return approved;
    }

    public long getRejected() {
        return rejected;
    }

    public long getPendingReview() {
        return pendingReview;
    }

    public long getNotSubmitted() {
        return notSubmitted;
    }
}