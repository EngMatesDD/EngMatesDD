package com.doantotnghiep.server.feature.video.system;

import com.doantotnghiep.server.config.jwt_config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.video.Response.AllVideoResponse;
import com.doantotnghiep.server.feature.video.system.dto.CreateVideoRequest;
import com.doantotnghiep.server.feature.video.system.dto.UpdateVideoRequest;
import com.doantotnghiep.server.repository.tbl_video.Video;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/system/videos")
@RequiredArgsConstructor
@Transactional(rollbackFor = {Exception.class})
public class VideoSystemController {
    private final VideoSystemService videoSystemService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/all")
    public ResponseEntity<AllVideoResponse> getAllVideo(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        return videoSystemService.getAllVideo(page, size);
    }

    @GetMapping("")
    public ResponseEntity<Video> getVideoById(@RequestParam String id) throws ResponseException {
        return videoSystemService.getVideoById(id);
    }

    @PostMapping("")
    public ResponseEntity<Video> createVideo(@Valid @ModelAttribute CreateVideoRequest request, BindingResult bindingResult) throws ResponseException, IOException {
        validateExceptionHandle.handleException(bindingResult);
        return videoSystemService.createVideo(request);
    }

    @PutMapping("")
    public ResponseEntity<Video> updateVideo(@RequestParam String id, @Valid @ModelAttribute UpdateVideoRequest request, BindingResult bindingResult) throws ResponseException {
        validateExceptionHandle.handleException(bindingResult);
        return videoSystemService.updateVideo(id, request);
    }

    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteVideo(@RequestParam String id) throws ResponseException {
        return videoSystemService.deleteVideo(id);
    }

}
