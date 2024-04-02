package com.doantotnghiep.server.feature.forum.post.response;

import com.doantotnghiep.server.feature.user.response.UserResponse;
import lombok.Builder;

import java.util.Date;

@Builder
public class PostResponse {
    public String id;
    public String title;
    public String content;
    public String image;
    public UserResponse author;
    public Integer totalComment;
    public Date createdAt;
    public Date updatedAt;
}
