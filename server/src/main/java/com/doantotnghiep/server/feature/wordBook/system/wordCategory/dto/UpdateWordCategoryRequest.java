package com.doantotnghiep.server.feature.wordBook.system.wordCategory.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateWordCategoryRequest {
    @Valid
    @NotNull(message = "Id is required")
    @NotEmpty(message = "Id is required")
    public String id;

    @Valid
    @NotEmpty(message = "Name is required")
    @NotNull(message = "Name is required")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    public String name;
}
