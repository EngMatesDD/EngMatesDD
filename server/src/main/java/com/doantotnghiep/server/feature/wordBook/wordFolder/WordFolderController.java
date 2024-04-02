package com.doantotnghiep.server.feature.wordBook.wordFolder;

import com.doantotnghiep.server.config.jwt_config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.wordBook.wordFolder.dto.AddWordToFolderRequest;
import com.doantotnghiep.server.feature.wordBook.wordFolder.Response.AllWordByFolder;
import com.doantotnghiep.server.repository.tbl_user.User;
import com.doantotnghiep.server.repository.tbl_word_folder.WordFolder;
import com.doantotnghiep.server.feature.word.dto.RemoveWordFromFolderRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wordFolder")
public class WordFolderController {
    private final WordFolderService wordFolderService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/folder")
    public ResponseEntity<AllWordByFolder> getAllWordByFolderId(
            HttpServletRequest request,
            @RequestParam String folderId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "10") Integer size
    ) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return wordFolderService.getAllWordByFolderId(user.getId(), folderId, page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<WordFolder> getWordById(@PathVariable String id) throws ResponseException {
        try {
            return wordFolderService.getWordById(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("/folder")
    public ResponseEntity<Boolean> deleteWordFromFolder(
            HttpServletRequest request,
            @Valid @RequestBody RemoveWordFromFolderRequest removeWordFromFolderRequest,
            BindingResult bindingResult
    ) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            User user = jwtService.getUserFromHeader(request);
            return wordFolderService.removeWordFromFolder(user.getId(), removeWordFromFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PostMapping("/folder")
    public ResponseEntity<Boolean> addWordToFolder(
            HttpServletRequest request,
            @Valid @RequestBody AddWordToFolderRequest addWordToFolderRequest,
            BindingResult bindingResult
    ) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            User user = jwtService.getUserFromHeader(request);
            return wordFolderService.addWordToFolder(user.getId(), addWordToFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PutMapping("/folder")
    public ResponseEntity<WordFolder> updateWordInFolder(
            HttpServletRequest request,
            @Valid @RequestBody WordFolder updateWordInFolderRequest,
            BindingResult bindingResult
    ) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            User user = jwtService.getUserFromHeader(request);
            return wordFolderService.updateWordInFolder(user.getId(), updateWordInFolderRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
