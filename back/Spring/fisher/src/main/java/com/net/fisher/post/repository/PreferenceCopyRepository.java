package com.net.fisher.post.repository;

import com.net.fisher.post.entity.PreferenceCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PreferenceCopyRepository extends JpaRepository<PreferenceCopy, Long> {

    @Modifying
    @Query(value = "truncate table preferences_copy", nativeQuery = true)
    void truncatePreferenceCopy();
}
