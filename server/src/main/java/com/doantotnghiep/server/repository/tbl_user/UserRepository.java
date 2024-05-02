package com.doantotnghiep.server.repository.tbl_user;

import jakarta.annotation.Nonnull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserByUsername(String username);
    User findUserByEmail(String email);
    User findUsersById(String id);
    @Nonnull
    Page<User> findAll(@Nonnull Pageable pageable);
    long count();
    void deleteUserById(String id);

}
