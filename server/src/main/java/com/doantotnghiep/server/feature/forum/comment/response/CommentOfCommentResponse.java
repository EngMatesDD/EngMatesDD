package com.doantotnghiep.server.feature.forum.comment.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentOfCommentResponse {
    Integer total;
    Integer totalPage;
    List<CommentResponse> comments;
}
