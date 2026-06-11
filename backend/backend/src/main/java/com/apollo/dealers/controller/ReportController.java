package com.apollo.dealers.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.dto.ComplianceReportDTO;
import com.apollo.dealers.service.ExcelExportService;
import com.apollo.dealers.service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;
    private final ExcelExportService excelExportService;

    public ReportController(
            ReportService reportService,
            ExcelExportService excelExportService) {

        this.reportService = reportService;
        this.excelExportService = excelExportService;
    }

    // =====================================
    // OVERALL REPORT
    // =====================================

    @GetMapping("/overall")
    public ComplianceReportDTO overallReport() {

        return reportService.getOverallReport();
    }

    // =====================================
    // CONTRACTOR REPORT
    // =====================================

    @GetMapping("/contractor/{contractorId}")
    public ComplianceReportDTO contractorReport(
            @PathVariable Long contractorId) {

        return reportService.getContractorReport(
                contractorId);
    }

    // =====================================
    // EXPORT EXCEL REPORT
    // =====================================

@GetMapping("/export/excel")
public ResponseEntity<byte[]> exportExcel()
        throws Exception {

    byte[] excelData =
            excelExportService.exportAssignments();

    return ResponseEntity.ok()
            .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=compliance-report.xlsx")
            .contentType(
                    MediaType.APPLICATION_OCTET_STREAM)
            .body(excelData);
}

}
