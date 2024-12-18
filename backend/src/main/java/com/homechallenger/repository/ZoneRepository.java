package com.homechallenger.repository;

import com.homechallenger.domain.entity.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Integer> {
    boolean existsByName(String name);
}
