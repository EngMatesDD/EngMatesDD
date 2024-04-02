package com.doantotnghiep.server.feature.forum.post.response;

import lombok.Builder;

import java.util.List;

@Builder
public class AllPostResponse {
    public Integer total;
    public Integer totalPage;
    public List<PostResponse> listPost;
}
