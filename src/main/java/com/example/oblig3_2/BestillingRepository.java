package com.example.oblig3_2;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BestillingRepository extends JpaRepository<Bestilling, Long> {
}
