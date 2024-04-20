package com.doantotnghiep.server.repository.tbl_chatAI;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Document
@Builder
public class ChatAI {
    @Id
    private String id;

    @Field
    private String userId;

    @Field
    private String title;

    @Field
    private List<ChatHistory> histories;
}
