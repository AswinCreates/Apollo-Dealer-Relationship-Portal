package com.apollo.dealers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "dealers")
public class Contractor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contractorId;

    private String clientName;

    private String contractorName;

    private String ownerName;

    private String address;

    private String natureOfJob;

    private String engagementDate;

    private String agreementPeriod;

    private String licenseNumber;

    private Integer licenseStrength;

    private Integer headCount;

    private String licenseValidity;

    private Integer registrationCertificateStrength;

    private String contractValidity;

    private String epfCode;

    private String esicCode;

    private String lwfCode;

    private String ptCodeEstablishment;

    private String ptCodeEmployer;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Contractor() {
    }

    // ======================
    // Getters
    // ======================

    public Long getContractorId() {
        return contractorId;
    }

    public String getClientName() {
        return clientName;
    }

    public String getContractorName() {
        return contractorName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getAddress() {
        return address;
    }

    public String getNatureOfJob() {
        return natureOfJob;
    }

    public String getEngagementDate() {
        return engagementDate;
    }

    public String getAgreementPeriod() {
        return agreementPeriod;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public Integer getLicenseStrength() {
        return licenseStrength;
    }

    public Integer getHeadCount() {
        return headCount;
    }

    public String getLicenseValidity() {
        return licenseValidity;
    }

    public Integer getRegistrationCertificateStrength() {
        return registrationCertificateStrength;
    }

    public String getContractValidity() {
        return contractValidity;
    }

    public String getEpfCode() {
        return epfCode;
    }

    public String getEsicCode() {
        return esicCode;
    }

    public String getLwfCode() {
        return lwfCode;
    }

    public String getPtCodeEstablishment() {
        return ptCodeEstablishment;
    }

    public String getPtCodeEmployer() {
        return ptCodeEmployer;
    }

    public User getUser() {
        return user;
    }

    // ======================
    // Setters
    // ======================

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public void setContractorName(String contractorName) {
        this.contractorName = contractorName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setNatureOfJob(String natureOfJob) {
        this.natureOfJob = natureOfJob;
    }

    public void setEngagementDate(String engagementDate) {
        this.engagementDate = engagementDate;
    }

    public void setAgreementPeriod(String agreementPeriod) {
        this.agreementPeriod = agreementPeriod;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public void setLicenseStrength(Integer licenseStrength) {
        this.licenseStrength = licenseStrength;
    }

    public void setHeadCount(Integer headCount) {
        this.headCount = headCount;
    }

    public void setLicenseValidity(String licenseValidity) {
        this.licenseValidity = licenseValidity;
    }

    public void setRegistrationCertificateStrength(Integer registrationCertificateStrength) {
        this.registrationCertificateStrength = registrationCertificateStrength;
    }

    public void setContractValidity(String contractValidity) {
        this.contractValidity = contractValidity;
    }

    public void setEpfCode(String epfCode) {
        this.epfCode = epfCode;
    }

    public void setEsicCode(String esicCode) {
        this.esicCode = esicCode;
    }

    public void setLwfCode(String lwfCode) {
        this.lwfCode = lwfCode;
    }

    public void setPtCodeEstablishment(String ptCodeEstablishment) {
        this.ptCodeEstablishment = ptCodeEstablishment;
    }

    public void setPtCodeEmployer(String ptCodeEmployer) {
        this.ptCodeEmployer = ptCodeEmployer;
    }

    public void setUser(User user) {
        this.user = user;
    }
}