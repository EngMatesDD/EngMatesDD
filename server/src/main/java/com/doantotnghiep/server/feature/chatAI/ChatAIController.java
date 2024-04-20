package com.doantotnghiep.server.feature.chatAI;


import com.doantotnghiep.server.config.current_user_annotation.CurrentUser;
import com.doantotnghiep.server.exception.ResponseException;
import com.doantotnghiep.server.feature.chatAI.dto.ChatAIRequest;
import com.doantotnghiep.server.repository.tbl_chatAI.ChatAI;
import com.doantotnghiep.server.repository.tbl_user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatAIController {
    private final ChatAIService chatAIService;

    @PostMapping("")
    public String askQuestion(@RequestParam(defaultValue = "") String chatId,  @CurrentUser UserDetails userDetails, @RequestBody ChatAIRequest request) throws ResponseException {
        // Call OpenAI API using the OpenAIChatClient
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


}