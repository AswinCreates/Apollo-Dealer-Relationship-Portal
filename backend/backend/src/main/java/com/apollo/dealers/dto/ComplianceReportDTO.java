package com.apollo.dealers.dto;

public class ComplianceReportDTO {

    private Long totalTasks;

    private Long complied;

    private Long delayed;

    private Long notComplied;

    private Long notApplicable;

    private Double compliancePercentage;

    public ComplianceReportDTO() {
    }

    public ComplianceReportDTO(
            Long totalTasks,
            Long complied,
            Long delayed,
            Long notComplied,
            Long notApplicable,
            Double compliancePercentage) {

        this.totalTasks = totalTasks;
        this.complied = complied;
        this.delayed = delayed;
        this.notComplied = notComplied;
        this.notApplicable = notApplicable;
        this.compliancePercentage = compliancePercentage;
    }

    public Long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(Long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public Long getComplied() {
        return complied;
    }

    public void setComplied(Long complied) {
        this.complied = complied;
    }

    public Long getDelayed() {
        return delayed;
    }

    public void setDelayed(Long delayed) {
        this.delayed = delayed;
    }

    public Long getNotComplied() {
        return notComplied;
    }

    public void setNotComplied(Long notComplied) {
        this.notComplied = notComplied;
    }

    public Long getNotApplicable() {
        return notApplicable;
    }

    public void setNotApplicable(Long notApplicable) {
        this.notApplicable = notApplicable;
    }

    public Double getCompliancePercentage() {
        return compliancePercentage;
    }

    public void setCompliancePercentage(Double compliancePercentage) {
        this.compliancePercentage = compliancePercentage;
    }
}