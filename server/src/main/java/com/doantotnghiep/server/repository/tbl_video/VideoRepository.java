package com.doantotnghiep.server.repository.tbl_video;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {
    Page<Video> findAll(Pageable pageable);

    Integer countAllBy();

    Page<Video> findAllByIdIn(List<String> videoIds, Pageable paging);
}
