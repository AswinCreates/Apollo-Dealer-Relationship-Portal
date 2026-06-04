package com.apollo.dealers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apollo.dealers.entity.Dealer;

@Repository
public interface DealerRepository extends JpaRepository<Dealer, Long> {

}