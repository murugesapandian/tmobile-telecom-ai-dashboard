package com.att.analytics.state.repository;

import com.att.analytics.state.model.StateData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StateDataRepository extends JpaRepository<StateData, String> {

    List<StateData> findByRegion(String region);

    List<StateData> findByMarketLeader(String leader);

    List<StateData> findByTmobileOpportunity(String opportunity);

    @Query("SELECT s FROM StateData s ORDER BY s.tmobileShare DESC")
    List<StateData> findAllOrderByTmobileShareDesc();

    @Query("SELECT s FROM StateData s WHERE s.tmobileShare < :threshold")
    List<StateData> findLowTmobileShareStates(Double threshold);

    @Query("SELECT AVG(s.tmobileShare) FROM StateData s")
    Double findNationalAvgTmobileShare();

    @Query("SELECT s.region, AVG(s.tmobileShare) FROM StateData s GROUP BY s.region")
    List<Object[]> findAvgTmobileShareByRegion();
}
