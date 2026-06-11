package com.apollo.dealers.service;

import org.springframework.stereotype.Service;

import com.apollo.dealers.dto.ComplianceReportDTO;
import com.apollo.dealers.entity.ComplianceStatus;
import com.apollo.dealers.repository.TaskAssignmentRepository;

@Service
public class ReportService {

    private final TaskAssignmentRepository assignmentRepository;

    public ReportService(
            TaskAssignmentRepository assignmentRepository) {

        this.assignmentRepository = assignmentRepository;
    }

    // =====================================
    // CONTRACTOR REPORT
    // =====================================

    public ComplianceReportDTO getContractorReport(
            Long contractorId) {

        long totalTasks = assignmentRepository.countByContractorContractorId(
                contractorId);

        long complied = assignmentRepository
                .countByContractorContractorIdAndComplianceStatus(
                        contractorId,
                        ComplianceStatus.COMPLIED);

        long delayed = assignmentRepository
                .countByContractorContractorIdAndComplianceStatus(
                        contractorId,
                        ComplianceStatus.DELAY_PARTIAL_COMPLIED);

        long notComplied = assignmentRepository
                .countByContractorContractorIdAndComplianceStatus(
                        contractorId,
                        ComplianceStatus.NOT_COMPLIED);

        long notApplicable = assignmentRepository
                .countByContractorContractorIdAndComplianceStatus(
                        contractorId,
                        ComplianceStatus.NOT_APPLICABLE);

        double percentage = 0;

        if (totalTasks > 0) {

            percentage = ((double) complied / totalTasks) * 100;
        }

        return new ComplianceReportDTO(
                totalTasks,
                complied,
                delayed,
                notComplied,
                notApplicable,
                percentage);
    }

    // =====================================
    // OVERALL REPORT
    // =====================================

    public ComplianceReportDTO getOverallReport() {

        long totalTasks = assignmentRepository.count();

        long complied = assignmentRepository.countByComplianceStatus(
                ComplianceStatus.COMPLIED);

        long delayed = assignmentRepository.countByComplianceStatus(
                ComplianceStatus.DELAY_PARTIAL_COMPLIED);

        long notComplied = assignmentRepository.countByComplianceStatus(
                ComplianceStatus.NOT_COMPLIED);

        long notApplicable = assignmentRepository.countByComplianceStatus(
                ComplianceStatus.NOT_APPLICABLE);

        double percentage = 0;

        if (totalTasks > 0) {

            percentage = ((double) complied / totalTasks) * 100;
        }

        return new ComplianceReportDTO(
                totalTasks,
                complied,
                delayed,
                notComplied,
                notApplicable,
                percentage);
    }
}