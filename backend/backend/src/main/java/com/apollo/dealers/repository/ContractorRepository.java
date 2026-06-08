package com.apollo.dealers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apollo.dealers.entity.Contractor;

@Repository
public interface ContractorRepository extends JpaRepository<Contractor, Long> {

}