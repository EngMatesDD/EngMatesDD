package com.doantotnghiep.server.feature.news.system.newsCategory.response;

import com.doantotnghiep.server.repository.tbl_news_category.NewsCategory;
import lombok.Builder;

import java.util.List;
@Builder
public class AllNewsCategory {
    public List<NewsCategory> newsCategories;
    public Integer total;
    public Integer totalPage;
}
