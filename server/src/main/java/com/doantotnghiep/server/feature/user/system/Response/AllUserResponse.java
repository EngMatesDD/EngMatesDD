package com.doantotnghiep.server.feature.user.system.Response;

import com.doantotnghiep.server.feature.user.response.UserResponse;
import lombok.Builder;

import java.util.List;
@Builder
public class AllUserResponse {
    public long total;
    public Integer totalPage;
    public List<UserResponse> users;
}
