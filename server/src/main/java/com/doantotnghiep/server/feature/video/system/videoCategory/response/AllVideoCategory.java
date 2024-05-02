package com.doantotnghiep.server.feature.video.system.videoCategory.response;

import com.doantotnghiep.server.repository.tbl_video_category.VideoCategory;
import lombok.Builder;

import java.util.List;
@Builder
public class AllVideoCategory {
    public List<VideoCategory> videoCategories;
    public Integer total;
    public Integer totalPage;
}
