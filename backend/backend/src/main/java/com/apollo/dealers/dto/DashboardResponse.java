package com.apollo.dealers.dto;

public class DashboardResponse {

    private long totalTasks;

    private long complied;

    private long delayPartialComplied;

    private long notComplied;

    private long notApplicable;

    public DashboardResponse() {
    }

    public DashboardResponse(
            long totalTasks,
            long complied,
            long delayPartialComplied,
            long notComplied,
            long notApplicable) {

        this.totalTasks = totalTasks;
        this.complied = complied;
        this.delayPartialComplied = delayPartialComplied;
        this.notComplied = notComplied;
        this.notApplicable = notApplicable;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public long getComplied() {
        return complied;
    }

    public void setComplied(long complied) {
        this.complied = complied;
    }

    public long getDelayPartialComplied() {
        return delayPartialComplied;
    }

    public void setDelayPartialComplied(long delayPartialComplied) {
        this.delayPartialComplied = delayPartialComplied;
    }

    public long getNotComplied() {
        return notComplied;
    }

    public void setNotComplied(long notComplied) {
        this.notComplied = notComplied;
    }

    public long getNotApplicable() {
        return notApplicable;
    }

    public void setNotApplicable(long notApplicable) {
        this.notApplicable = notApplicable;
    }
}