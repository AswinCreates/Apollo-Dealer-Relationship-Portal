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

    public Dealer createDealer(Dealer dealer) {
        return dealerRepository.save(dealer);
    }

    public List<Dealer> getAllDealers() {
        return dealerRepository.findAll();
    }

    public Dealer getDealerById(Long id) {
        return dealerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dealer not found"));
    }

    public Dealer updateDealer(Long id, Dealer dealer) {

        Dealer existingDealer = getDealerById(id);

        existingDealer.setDealerName(dealer.getDealerName());
        existingDealer.setShopName(dealer.getShopName());
        existingDealer.setPhone(dealer.getPhone());
        existingDealer.setEmail(dealer.getEmail());
        existingDealer.setAddress(dealer.getAddress());
        existingDealer.setCity(dealer.getCity());
        existingDealer.setState(dealer.getState());
        existingDealer.setGstNumber(dealer.getGstNumber());
        existingDealer.setEmployeeCount(dealer.getEmployeeCount());

        return dealerRepository.save(existingDealer);
    }

    public void deleteDealer(Long id) {
        dealerRepository.deleteById(id);
    }

}