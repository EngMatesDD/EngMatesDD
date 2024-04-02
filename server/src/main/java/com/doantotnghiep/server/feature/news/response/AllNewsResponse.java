package com.doantotnghiep.server.feature.news.response;

import com.doantotnghiep.server.repository.tbl_news.News;
import lombok.Builder;

import java.util.List;

@Builder
public class AllNewsResponse {
    public Integer total;
    public Integer totalPage;
    public List<News> listNews;

    public AllNewsResponse(Integer total, Integer totalPage, List<News> listNews) {
        this.total = total;
        this.totalPage = totalPage;
        this.listNews = listNews;
    }
}
