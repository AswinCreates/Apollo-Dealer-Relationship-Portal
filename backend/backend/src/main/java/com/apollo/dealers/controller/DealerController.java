package com.apollo.dealers.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.entity.Dealer;
import com.apollo.dealers.service.DealerService;

@RestController
@RequestMapping("/api/dealers")
public class DealerController {

    private final DealerService dealerService;

    public DealerController(DealerService dealerService) {
        this.dealerService = dealerService;
    }

    @PostMapping
    public Dealer createDealer(@RequestBody Dealer dealer) {
        return dealerService.createDealer(dealer);
    }

    @GetMapping
    public List<Dealer> getAllDealers() {
        return dealerService.getAllDealers();
    }

    @GetMapping("/{id}")
    public Dealer getDealerById(@PathVariable Long id) {
        return dealerService.getDealerById(id);
    }

    @PutMapping("/{id}")
    public Dealer updateDealer(
            @PathVariable Long id,
            @RequestBody Dealer dealer) {

        return dealerService.updateDealer(id, dealer);
    }

    @DeleteMapping("/{id}")
    public String deleteDealer(@PathVariable Long id) {

        dealerService.deleteDealer(id);

        return "Dealer deleted successfully.";
    }
}