package com.doantotnghiep.server.repository.tbl_chatAI;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatAIRepository extends MongoRepository<ChatAI, String> {
    ChatAI findChatAIByUserIdAndId(String userId, String id);

    List<ChatAI> findAllByUserId(String userId);

}
