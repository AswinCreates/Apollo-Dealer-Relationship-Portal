package com.apollo.dealers.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.apollo.dealers.entity.Contractor;

public interface ContractorRepository
        extends JpaRepository<Contractor, Long> {

}