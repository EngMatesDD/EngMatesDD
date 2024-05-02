package com.doantotnghiep.server.feature.user.response;

import com.doantotnghiep.server.repository.tbl_user.Role;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserResponse {
    public String id;
    public String username;
    public String name;
    public String email;
    public String avatar;
    public Role role;

    public UserResponse(String id, String username, String name, String email, String avatar, Role role) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
    }
}
