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
        return dealerService.saveDealer(dealer);
    }

    @GetMapping
    public List<Dealer> getAllDealers() {
        return dealerService.getAllDealers();
    }
}