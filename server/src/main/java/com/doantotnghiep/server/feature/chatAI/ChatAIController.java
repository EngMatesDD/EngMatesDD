package com.doantotnghiep.server.feature.chatAI;


import com.doantotnghiep.server.config.current_user_annotation.CurrentUser;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.exception.ValidateExceptionHandle;
import com.doantotnghiep.server.feature.chatAI.dto.ChatAIRequest;
import com.doantotnghiep.server.feature.chatAI.dto.UpdateTitleRequest;
import com.doantotnghiep.server.repository.tbl_chatAI.ChatAI;
import com.doantotnghiep.server.repository.tbl_user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatAIController {
    private final ChatAIService chatAIService;
    private final ValidateExceptionHandle validateExceptionHandle;

    @PostMapping("")
    public String askQuestion(@RequestParam(defaultValue = "") String chatId, @CurrentUser UserDetails userDetails, @Valid @RequestBody ChatAIRequest request, BindingResult bindingResult) throws ResponseException {
        // Call OpenAI API using the OpenAIChatClient
        validateExceptionHandle.handleException(bindingResult);
        User user = (User) userDetails;
        return chatAIService.getOpenAIResponse(user.getId(), chatId ,request.getPrompt());
    }

    @GetMapping("/all")
    public List<ChatAI> getAllChat(@CurrentUser UserDetails userDetails) {
        User user = (User) userDetails;
        return chatAIService.getAllChatAI(user.getId());
    }

    @DeleteMapping("/{id}")
    public ChatAI deleteChat(@PathVariable String id, @CurrentUser UserDetails userDetails) {
        User user = (User) userDetails;
        return chatAIService.deleteChatAI(user.getId(), id);
    }

    @PutMapping("/{id}")
    public ChatAI updateChat(@PathVariable String id, @CurrentUser UserDetails userDetails, @Valid @RequestBody UpdateTitleRequest request, BindingResult bindingResult) throws ResponseException {
        User user = (User) userDetails;
        validateExceptionHandle.handleException(bindingResult);
        return chatAIService.updateTitle(user.getId(), id, request.getTitle());
    }


}