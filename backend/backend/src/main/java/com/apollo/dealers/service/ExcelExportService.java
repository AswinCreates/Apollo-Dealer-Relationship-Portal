package com.apollo.dealers.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.apollo.dealers.entity.TaskAssignment;
import com.apollo.dealers.repository.TaskAssignmentRepository;

@Service
public class ExcelExportService {

    private final TaskAssignmentRepository assignmentRepository;

    public ExcelExportService(
            TaskAssignmentRepository assignmentRepository) {

        this.assignmentRepository = assignmentRepository;
    }

public byte[] exportAssignments()
        throws IOException {

    List<TaskAssignment> assignments =
            assignmentRepository.findAll();

    XSSFWorkbook workbook =
            new XSSFWorkbook();

    XSSFSheet sheet =
            workbook.createSheet("Compliance Report");

    Row header =
            sheet.createRow(0);

    header.createCell(0).setCellValue("Assignment ID");
    header.createCell(1).setCellValue("Contractor");
    header.createCell(2).setCellValue("Task");
    header.createCell(3).setCellValue("Due Date");
    header.createCell(4).setCellValue("Status");
    header.createCell(5).setCellValue("Compliance Status");

    int rowNum = 1;

    for (TaskAssignment assignment : assignments) {

        Row row =
                sheet.createRow(rowNum++);

        row.createCell(0).setCellValue(
                assignment.getId());

        row.createCell(1).setCellValue(
                assignment.getContractor() != null
                        ? assignment.getContractor().getContractorName()
                        : "");

        row.createCell(2).setCellValue(
                assignment.getComplianceTask() != null
                        ? assignment.getComplianceTask().getTaskName()
                        : "");

        row.createCell(3).setCellValue(
                assignment.getDueDate() != null
                        ? assignment.getDueDate().toString()
                        : "");

        row.createCell(4).setCellValue(
                assignment.getStatus() != null
                        ? assignment.getStatus().name()
                        : "");

        row.createCell(5).setCellValue(
                assignment.getComplianceStatus() != null
                        ? assignment.getComplianceStatus().name()
                        : "");
    }

    ByteArrayOutputStream outputStream =
            new ByteArrayOutputStream();

    workbook.write(outputStream);

    workbook.close();

    return outputStream.toByteArray();
}

}
