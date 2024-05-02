package com.doantotnghiep.server.feature.forum.comment.response;

import com.doantotnghiep.server.feature.user.response.UserResponse;
import lombok.Builder;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Builder
@Data
public class CommentResponse {
    public String id;
    public UserResponse author;
    public String content;
    public String authorId;
    public String postId;
    public Date createdAt;
    public Date updatedAt;
    public String parentId;
    public Boolean isLevel1;
    public List<String> childIds;
}
