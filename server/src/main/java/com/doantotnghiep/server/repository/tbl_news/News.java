package com.doantotnghiep.server.repository.tbl_news;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Data
@Document
public class News {
    @Id
    public String id;
    @Field
    public String title;
    @Field
    public String content;
    @Field
    public Date createdAt;
    @Field
    public Date updatedAt;
    @Field
    public String categoryId;

    public News() {
    }

    public News(String title, String content, Date createdAt, Date updatedAt) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
