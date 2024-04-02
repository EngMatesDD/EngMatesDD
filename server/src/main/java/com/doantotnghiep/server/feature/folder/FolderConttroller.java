package com.doantotnghiep.server.feature.folder;

import com.doantotnghiep.server.config.jwt_config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.folder.dto.CreateFolderRequest;
import com.doantotnghiep.server.feature.folder.dto.UpdateFolderRequest;
import com.doantotnghiep.server.feature.folder.response.AllFolderResponse;
import com.doantotnghiep.server.repository.tbl_folder.Folder;
import com.doantotnghiep.server.repository.tbl_user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
@RequiredArgsConstructor
public class FolderConttroller {
    private final JwtService jwtService;
    private final FolderService folderService;
    private final ValidateExceptionHandle validateExceptionHandle;

    @PostMapping("")
    public ResponseEntity<Folder> createFolder(HttpServletRequest request, @Valid @RequestBody CreateFolderRequest createFolderRequest, BindingResult bindingResult) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            validateExceptionHandle.handleException(bindingResult);
            return folderService.createFolder(user.getId(), createFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
    @GetMapping("/all")
    public ResponseEntity<AllFolderResponse> getAllFolder(HttpServletRequest request, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return folderService.getAllFolder(user.getId(), page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/all/toAdd")
    public ResponseEntity<List<Folder>> getAllFolderToAdd(HttpServletRequest request) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return folderService.getAllFolderToAdd(user.getId());
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteFolder(HttpServletRequest request, @RequestParam String id) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return folderService.deleteFolder(user.getId(), id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PutMapping("")
    public ResponseEntity<Folder> updateFolder(HttpServletRequest request, @Valid @RequestBody UpdateFolderRequest updateFolderRequest, BindingResult bindingResult) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            validateExceptionHandle.handleException(bindingResult);
            return folderService.updateFolder(user.getId(), updateFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("")
    public ResponseEntity<Folder> getFolder(HttpServletRequest request, @RequestParam String id) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return folderService.getFolderById(user.getId(), id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
}
