package com.doantotnghiep.server.repository.tbl_comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    Comment findCommentById(String parentId);
    Comment findCommentByIdAndAuthorId(String id, String authorId);
    Page<Comment> findAllByIdIn(List<String> ids, Pageable pageable);
    void deleteAllByAuthorId(String authorId);
    void deleteAllByPostId(String postId);
    void deleteAllByParentId(String parentId);
}
