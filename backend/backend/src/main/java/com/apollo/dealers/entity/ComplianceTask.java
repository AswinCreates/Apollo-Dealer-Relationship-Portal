package com.apollo.dealers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "compliance_tasks")
public class ComplianceTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;

    private String frequency;

    @Column(length = 1000)
    private String description;

    private String mandatoryDocument;

    private Boolean active = true;

    public ComplianceTask() {
    }

    public Long getId() {
        return id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMandatoryDocument() {
        return mandatoryDocument;
    }

    public void setMandatoryDocument(String mandatoryDocument) {
        this.mandatoryDocument = mandatoryDocument;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}