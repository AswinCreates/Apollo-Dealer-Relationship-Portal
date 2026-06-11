package com.apollo.dealers.dto;

public class ComplianceSummaryResponse {

    private long totalTasks;
    private long complied;
    private long delayed;
    private long notComplied;
    private long notApplicable;

    public ComplianceSummaryResponse() {
    }

    public ComplianceSummaryResponse(
            long totalTasks,
            long complied,
            long delayed,
            long notComplied,
            long notApplicable) {

        this.totalTasks = totalTasks;
        this.complied = complied;
        this.delayed = delayed;
        this.notComplied = notComplied;
        this.notApplicable = notApplicable;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getComplied() {
        return complied;
    }

    public long getDelayed() {
        return delayed;
    }

    public long getNotComplied() {
        return notComplied;
    }

    public long getNotApplicable() {
        return notApplicable;
    }
}