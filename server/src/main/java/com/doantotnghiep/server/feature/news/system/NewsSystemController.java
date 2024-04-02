package com.doantotnghiep.server.feature.news.system;

import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.news.response.AllNewsResponse;
import com.doantotnghiep.server.feature.news.system.dto.CreateNewsRequest;
import com.doantotnghiep.server.feature.news.system.dto.UpdateNewsRequest;
import com.doantotnghiep.server.repository.tbl_news.News;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/system/news")
@RequiredArgsConstructor
public class NewsSystemController {
    private final NewsSystemService newsSystemService;
    private final ValidateExceptionHandle validateExceptionHandle;

    @GetMapping("/all")
    public ResponseEntity<AllNewsResponse> getAllNews(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam(value = "size", defaultValue = "10") Integer size) throws Exception {
        try {
            return newsSystemService.getAllNews(page, size);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<News> getNewsById(@RequestParam("id") String id) throws ResponseException {
        try {
            return newsSystemService.getNewsById(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PostMapping("")
    public ResponseEntity<News> createNews(@RequestBody @Valid CreateNewsRequest request, BindingResult bindingResult) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            return newsSystemService.createNews(request);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }

    @PutMapping("")
    public ResponseEntity<News> updateNews(@RequestBody @Valid UpdateNewsRequest request, BindingResult bindingResult) throws ResponseException {
        try {
            validateExceptionHandle.handleException(bindingResult);
            return newsSystemService.updateNews(request);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
    @DeleteMapping("")
    public ResponseEntity<Boolean> deleteNews(@RequestParam("id") String id) throws ResponseException {
        try {
            return newsSystemService.deleteNews(id);
        } catch (ResponseException e) {
            throw new ResponseException(e.getMessage(), e.getStatus(), e.getStatusCode());
        }
    }
}
