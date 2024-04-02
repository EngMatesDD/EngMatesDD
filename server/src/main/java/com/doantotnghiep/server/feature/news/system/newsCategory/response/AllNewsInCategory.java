package com.doantotnghiep.server.feature.news.system.newsCategory.response;

import com.doantotnghiep.server.repository.tbl_news.News;
import lombok.Builder;

import java.util.List;
@Builder
public class AllNewsInCategory {
    public String category;
    public Integer total;
    public Integer totalPage;
    public List<News> newsList;
}
