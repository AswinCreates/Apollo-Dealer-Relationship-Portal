package com.apollo.dealers.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.apollo.dealers.entity.Contractor;
import com.apollo.dealers.repository.ContractorRepository;

@Service
public class ContractorService {

    private final ContractorRepository dealerRepository;

    public ContractorService(ContractorRepository dealerRepository) {
        this.dealerRepository = dealerRepository;
    }

    public Contractor createDealer(Contractor dealer) {
        return dealerRepository.save(dealer);
    }

    public List<Contractor> getAllDealers() {
        return dealerRepository.findAll();
    }

    public Contractor getDealerById(Long id) {
        return dealerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dealer not found"));
    }

    public Contractor updateDealer(Long id, Contractor dealer) {

        Contractor existingDealer = getDealerById(id);

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