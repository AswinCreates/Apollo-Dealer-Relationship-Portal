package com.apollo.dealers.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.apollo.dealers.entity.Contractor;
import com.apollo.dealers.repository.ContractorRepository;

@Service
public class ContractorService {

    private final ContractorRepository contractorRepository;

    public ContractorService(ContractorRepository contractorRepository) {
        this.contractorRepository = contractorRepository;
    }

    // Create Contractor
    public Contractor createContractor(Contractor contractor) {
        return contractorRepository.save(contractor);
    }

    // Get All Contractors
    public List<Contractor> getAllContractors() {
        return contractorRepository.findAll();
    }

    // Get Contractor By Id
    public Contractor getContractorById(Long id) {
        return contractorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contractor not found"));
    }

    // Update Contractor
    public Contractor updateContractor(Long id, Contractor contractor) {

        Contractor existingContractor = getContractorById(id);

        existingContractor.setClientName(contractor.getClientName());
        existingContractor.setContractorName(contractor.getContractorName());
        existingContractor.setOwnerName(contractor.getOwnerName());
        existingContractor.setAddress(contractor.getAddress());
        existingContractor.setNatureOfJob(contractor.getNatureOfJob());
        existingContractor.setEngagementDate(contractor.getEngagementDate());
        existingContractor.setAgreementPeriod(contractor.getAgreementPeriod());
        existingContractor.setLicenseNumber(contractor.getLicenseNumber());
        existingContractor.setLicenseStrength(contractor.getLicenseStrength());
        existingContractor.setHeadCount(contractor.getHeadCount());
        existingContractor.setLicenseValidity(contractor.getLicenseValidity());
        existingContractor.setRegistrationCertificateStrength(
                contractor.getRegistrationCertificateStrength());
        existingContractor.setContractValidity(contractor.getContractValidity());
        existingContractor.setEpfCode(contractor.getEpfCode());
        existingContractor.setEsicCode(contractor.getEsicCode());
        existingContractor.setLwfCode(contractor.getLwfCode());
        existingContractor.setPtCodeEstablishment(
                contractor.getPtCodeEstablishment());
        existingContractor.setPtCodeEmployer(
                contractor.getPtCodeEmployer());

        return contractorRepository.save(existingContractor);
    }

    // Delete Contractor
    public void deleteContractor(Long id) {
        contractorRepository.deleteById(id);
    }

}