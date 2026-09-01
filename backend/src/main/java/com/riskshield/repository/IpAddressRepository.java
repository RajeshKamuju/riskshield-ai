package com.riskshield.repository;

import com.riskshield.entity.IpAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IpAddressRepository extends JpaRepository<IpAddress, Long> {
    Optional<IpAddress> findByIpAddress(String ipAddress);
}
