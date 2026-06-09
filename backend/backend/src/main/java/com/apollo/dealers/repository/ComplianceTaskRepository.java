package com.apollo.dealers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.apollo.dealers.entity.ComplianceTask;

@Repository
public interface ComplianceTaskRepository
        extends JpaRepository<ComplianceTask, Long> {
}