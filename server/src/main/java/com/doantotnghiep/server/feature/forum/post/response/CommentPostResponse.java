package com.doantotnghiep.server.feature.forum.post.response;

import com.doantotnghiep.server.feature.forum.comment.response.CommentResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentPostResponse {
    Integer total;
    Integer totalPage;
    List<CommentResponse> comments;
}
