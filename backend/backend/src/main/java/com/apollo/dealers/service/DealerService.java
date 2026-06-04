package com.apollo.dealers.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.apollo.dealers.entity.Dealer;
import com.apollo.dealers.repository.DealerRepository;

@Service
public class DealerService {

    private final DealerRepository dealerRepository;

    public DealerService(DealerRepository dealerRepository) {
        this.dealerRepository = dealerRepository;
    }

    public Dealer saveDealer(Dealer dealer) {
        return dealerRepository.save(dealer);
    }

    public List<Dealer> getAllDealers() {
        return dealerRepository.findAll();
    }

}