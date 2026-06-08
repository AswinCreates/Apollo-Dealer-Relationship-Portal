package com.apollo.dealers.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.entity.Contractor;
import com.apollo.dealers.service.ContractorService;

@RestController
@RequestMapping("/api/contractors")
public class ContractorController {

    private final ContractorService contractorService;

    public ContractorController(ContractorService contractorService) {
        this.contractorService = contractorService;
    }

    // Create Contractor
    @PostMapping
    public Contractor createContractor(@RequestBody Contractor contractor) {
        return contractorService.createContractor(contractor);
    }

    // Get All Contractors
    @GetMapping
    public List<Contractor> getAllContractors() {
        return contractorService.getAllContractors();
    }

    // Get Contractor By Id
    @GetMapping("/{id}")
    public Contractor getContractorById(@PathVariable Long id) {
        return contractorService.getContractorById(id);
    }

    // Update Contractor
    @PutMapping("/{id}")
    public Contractor updateContractor(
            @PathVariable Long id,
            @RequestBody Contractor contractor) {

        return contractorService.updateContractor(id, contractor);
    }

    // Delete Contractor
    @DeleteMapping("/{id}")
    public String deleteContractor(@PathVariable Long id) {

        contractorService.deleteContractor(id);

        return "Contractor deleted successfully.";
    }
}