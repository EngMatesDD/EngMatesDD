package com.doantotnghiep.server.feature.forum.comment;

import com.doantotnghiep.server.feature.forum.comment.response.CommentOfCommentResponse;
import com.doantotnghiep.server.feature.forum.comment.response.CommentResponse;
import com.doantotnghiep.server.common.ErrorEnum.AuthErrorEnum;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.repository.tbl_post.Post;
import com.doantotnghiep.server.repository.tbl_post.PostRepository;
import com.doantotnghiep.server.repository.tbl_comment.Comment;
import com.doantotnghiep.server.repository.tbl_comment.CommentRepository;
import com.doantotnghiep.server.feature.user.response.UserResponse;
import com.doantotnghiep.server.repository.tbl_user.User;
import com.doantotnghiep.server.repository.tbl_user.UserRepository;
import com.doantotnghiep.server.feature.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@ControllerAdvice
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PostRepository postRepository;

    public ResponseEntity<CommentResponse> createComment(String userId, String postId, String content, String parentId) throws ResponseException {
        User user = userRepository.findUsersById(userId);
        if (user == null) {
            throw new ResponseException(AuthErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND, 404);
        }

        Post post = postRepository.findPostById(postId);
        if (post == null) {
            throw new ResponseException("Post not found", HttpStatus.NOT_FOUND, 404);
        }

        Comment commentParent = commentRepository.findCommentById(parentId);
        if (parentId != null && commentParent == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }

        if (parentId != null && !commentParent.getIsLevel1()) {
            commentParent = commentRepository.findCommentById(commentParent.getParentId());
            parentId = commentParent.getId();
        }

        Comment comment = Comment.builder()
                .childIds(new ArrayList<>())
                .content(content)
                .authorId(userId)
                .postId(postId)
                .createdAt(new Date())
                .updatedAt(new Date())
                .parentId(parentId)
                .isLevel1(parentId == null)
                .build();

        Comment savedComment = commentRepository.save(comment);

        if (parentId != null) {
            commentParent.getChildIds().add(savedComment.getId());
            commentRepository.save(commentParent);
        } else {
            post.getCommentIds().add(savedComment.getId());
            postRepository.save(post);
        }
        UserResponse userResponse = userService.getUserById(userId).getBody();
        CommentResponse response = CommentResponse.builder()
                .id(savedComment.getId())
                .author(userResponse)
                .createdAt(savedComment.getCreatedAt())
                .authorId(userId)
                .childIds(savedComment.getChildIds())
                .content(savedComment.getContent())
                .isLevel1(savedComment.getIsLevel1())
                .parentId(savedComment.getParentId())
                .postId(savedComment.getPostId())
                .updatedAt(savedComment.getUpdatedAt())
                .build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Comment> deleteCommentOfPost(String userId, String commentId, String postId) throws ResponseException {
        Comment comment = commentRepository.findCommentByIdAndAuthorId(commentId, userId);
        if (comment == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }
        commentRepository.delete(comment);
        this.deleteAllObjectRelatedComment(commentId);

        Post post = postRepository.findPostById(postId);
        if (post == null) {
            throw new ResponseException("Post not found", HttpStatus.NOT_FOUND, 404);
        }
        post.getCommentIds().remove(commentId);
        postRepository.save(post);
        return ResponseEntity.ok(comment);
    }

    public ResponseEntity<Comment> deleteCommentOfComment(String userId,String commentId, String parentId) throws ResponseException {
        Comment comment = commentRepository.findCommentByIdAndAuthorId(commentId, userId);
        if (comment == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }
        commentRepository.delete(comment);

        Comment commentParent = commentRepository.findCommentById(parentId);
        if (commentParent == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }

        commentParent.getChildIds().remove(commentId);
        commentRepository.save(commentParent);

        return ResponseEntity.ok(comment);
    }

    public ResponseEntity<CommentOfCommentResponse> getCommentOfComment(String commentId, Integer page, Integer size) throws ResponseException {
        Comment comment = commentRepository.findCommentById(commentId);
        if (comment == null) {
            throw new ResponseException("Comment not found", HttpStatus.NOT_FOUND, 404);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Comment> commentPage = commentRepository.findAllByIdIn(comment.getChildIds(), pageable);

        List<Comment> comments = commentPage.getContent();
        List<CommentResponse> commentResponses = new ArrayList<>();
        for (Comment cmt : comments) {
            UserResponse user = userService.getUserById(cmt.getAuthorId()).getBody();
            CommentResponse commentResponse = CommentResponse.builder()
                    .id(cmt.getId())
                    .author(user)
                    .createdAt(cmt.getCreatedAt())
                    .authorId(cmt.getAuthorId())
                    .childIds(cmt.getChildIds())
                    .content(cmt.getContent())
                    .isLevel1(cmt.getIsLevel1())
                    .parentId(cmt.getParentId())
                    .postId(cmt.getPostId())
                    .updatedAt(cmt.getUpdatedAt())
                    .build();
            commentResponses.add(commentResponse);
        }

        CommentOfCommentResponse response = CommentOfCommentResponse.builder()
                .comments(commentResponses)
                .totalPage(commentPage.getTotalPages())
                .total(comments.size())
                .build();

        return ResponseEntity.ok(response);
    }

    public void deleteAllObjectRelatedComment(String parentCommentId) {
        commentRepository.deleteAllByParentId(parentCommentId);
    }
}
