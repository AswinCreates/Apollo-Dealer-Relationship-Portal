package com.apollo.dealers.dto;

public class ContractorComplianceReportResponse {

    private Long contractorId;
    private String contractorName;

    private long totalTasks;
    private long complied;
    private long pending;
    private long rejected;

    public ContractorComplianceReportResponse() {
    }

    public ContractorComplianceReportResponse(
            Long contractorId,
            String contractorName,
            long totalTasks,
            long complied,
            long pending,
            long rejected) {

        this.contractorId = contractorId;
        this.contractorName = contractorName;
        this.totalTasks = totalTasks;
        this.complied = complied;
        this.pending = pending;
        this.rejected = rejected;
    }

    public Long getContractorId() {
        return contractorId;
    }

    public String getContractorName() {
        return contractorName;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getComplied() {
        return complied;
    }

    public long getPending() {
        return pending;
    }

public long getRejected() {
    return rejected;
}

}
