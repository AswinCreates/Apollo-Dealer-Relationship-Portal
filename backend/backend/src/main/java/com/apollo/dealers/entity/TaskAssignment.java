package com.apollo.dealers.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "task_assignments")
public class TaskAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private ComplianceTask complianceTask;

    @ManyToOne
    @JoinColumn(name = "contractor_id")
    private Contractor contractor;

    private LocalDate assignedDate;

    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private AssignmentStatus status;

    @Enumerated(EnumType.STRING)
    private ComplianceStatus complianceStatus;

    public TaskAssignment() {
    }

    public Long getId() {
        return id;
    }

    public ComplianceTask getComplianceTask() {
        return complianceTask;
    }

    public void setComplianceTask(ComplianceTask complianceTask) {
        this.complianceTask = complianceTask;
    }

    public Contractor getContractor() {
        return contractor;
    }

    public void setContractor(Contractor contractor) {
        this.contractor = contractor;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDate assignedDate) {
        this.assignedDate = assignedDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public AssignmentStatus getStatus() {
        return status;
    }

    public void setStatus(AssignmentStatus status) {
        this.status = status;
    }

    public ComplianceStatus getComplianceStatus() {
        return complianceStatus;
    }

    public void setComplianceStatus(
            ComplianceStatus complianceStatus) {
        this.complianceStatus = complianceStatus;
    }
}