package com.apollo.dealers.dto;

public class DashboardSummaryDTO {

    private long totalTasks;
    private long complied;
    private long delayPartial;
    private long notComplied;
    private long notApplicable;

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(
            long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public long getComplied() {
        return complied;
    }

    public void setComplied(
            long complied) {
        this.complied = complied;
    }

    public long getDelayPartial() {
        return delayPartial;
    }

    public void setDelayPartial(
            long delayPartial) {
        this.delayPartial = delayPartial;
    }

    public long getNotComplied() {
        return notComplied;
    }

    public void setNotComplied(
            long notComplied) {
        this.notComplied = notComplied;
    }

    public long getNotApplicable() {
        return notApplicable;
    }

    public void setNotApplicable(
            long notApplicable) {
        this.notApplicable = notApplicable;
    }
}