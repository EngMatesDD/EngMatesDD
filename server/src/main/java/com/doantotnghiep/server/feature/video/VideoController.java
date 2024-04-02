package com.doantotnghiep.server.feature.video;

import com.doantotnghiep.server.config.jwt_config.JwtService;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.repository.tbl_video.Video;
import com.doantotnghiep.server.feature.video.Response.AllVideoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {
    private final VideoService videoService;
    private final ValidateExceptionHandle validateExceptionHandle;
    private final JwtService jwtService;

    @GetMapping("/all")
    public ResponseEntity<AllVideoResponse> getAllVideo(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "10") Integer size) throws ResponseException {
        return videoService.getAllVideo(page, size);
    }

    @GetMapping("")
    public ResponseEntity<Video> getVideoById(@RequestParam String id) throws ResponseException {
        return videoService.getVideoById(id);
    }

}
