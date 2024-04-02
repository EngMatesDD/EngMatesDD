package com.doantotnghiep.server.feature.user.system;

import com.doantotnghiep.server.config.admin_access_annotation.CheckAdminAccess;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.feature.user.system.Response.AllUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/system/user")
@RequiredArgsConstructor
public class UserSystemController {
    private final UserSystemService userSystemService;

    @GetMapping("/all")
    @CheckAdminAccess
    public ResponseEntity<AllUserResponse> getAllUser(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            return userSystemService.getAllUser(page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("")
    @CheckAdminAccess
    public ResponseEntity<Boolean> deleteUser(@RequestParam String id) throws ResponseException {
        try {
            return userSystemService.deleteUser(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
