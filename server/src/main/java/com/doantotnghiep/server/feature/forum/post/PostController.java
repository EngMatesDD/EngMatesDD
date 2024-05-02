package com.doantotnghiep.server.feature.forum.post;

import com.doantotnghiep.server.config.jwt_config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.forum.post.dto.CreatePostRequest;
import com.doantotnghiep.server.feature.forum.post.dto.UpdatePostRequest;
import com.doantotnghiep.server.feature.forum.post.response.AllPostResponse;
import com.doantotnghiep.server.feature.forum.post.response.CommentPostResponse;
import com.doantotnghiep.server.feature.forum.post.response.PostResponse;
import com.doantotnghiep.server.repository.tbl_user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@Transactional(rollbackFor = {Exception.class})
public class PostController {
    private final PostService postService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @PostMapping("")
    public ResponseEntity<PostResponse> createPost(HttpServletRequest request, @Valid @ModelAttribute CreatePostRequest createPostRequest, BindingResult bindingResult) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            validateExceptionHandle.handleException(bindingResult);
            return postService.createPost(user.getId(), createPostRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PutMapping("")
    public ResponseEntity<PostResponse> updatePost(HttpServletRequest request, @ModelAttribute @Valid UpdatePostRequest updatePostRequest, BindingResult bindingResult) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            validateExceptionHandle.handleException(bindingResult);
            return postService.updatePost(user.getId(), updatePostRequest);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("")
    public ResponseEntity<PostResponse> getPostById(HttpServletRequest request, @RequestParam String id) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return postService.getPostById(user.getId(), id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<AllPostResponse> getAllPost(HttpServletRequest request, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return postService.getAllPost(page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @DeleteMapping("")
    public ResponseEntity<Boolean> deletePost(HttpServletRequest request, @RequestParam String id) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return postService.deletePost(user.getId(), id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/all/myPost")
    public ResponseEntity<AllPostResponse> getAllPostByUserId(HttpServletRequest request, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            User user = jwtService.getUserFromHeader(request);
            return postService.getAllPostByUserId(user.getId(), page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @GetMapping("/comments")
    public ResponseEntity<CommentPostResponse> getAllCommentOfPost(@RequestParam String postId, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        try {
            return postService.getCommentOfPost(postId, page, size);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

}
