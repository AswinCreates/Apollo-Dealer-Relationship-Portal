package com.apollo.dealers.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.entity.Contractor;
import com.apollo.dealers.service.ContractorService;

@RestController
@RequestMapping("/api/dealers")
public class ContractorController {

    private final ContractorService dealerService;

    public ContractorController(ContractorService dealerService) {
        this.dealerService = dealerService;
    }

    @PostMapping
    public Contractor createDealer(@RequestBody Contractor dealer) {
        return dealerService.createDealer(dealer);
    }

    @GetMapping
    public List<Contractor> getAllDealers() {
        return dealerService.getAllDealers();
    }

    @GetMapping("/{id}")
    public Contractor getDealerById(@PathVariable Long id) {
        return dealerService.getDealerById(id);
    }

    @PutMapping("/{id}")
    public Contractor updateDealer(
            @PathVariable Long id,
            @RequestBody Contractor dealer) {

        return dealerService.updateDealer(id, dealer);
    }

    @DeleteMapping("/{id}")
    public String deleteDealer(@PathVariable Long id) {

        dealerService.deleteDealer(id);

        return "Dealer deleted successfully.";
    }
}