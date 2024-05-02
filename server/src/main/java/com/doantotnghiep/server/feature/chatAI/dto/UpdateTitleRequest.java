package com.doantotnghiep.server.feature.chatAI.dto;

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
public class UpdateTitleRequest {
    @Valid
    @NotNull
    @NotEmpty
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
    private String title;
}
