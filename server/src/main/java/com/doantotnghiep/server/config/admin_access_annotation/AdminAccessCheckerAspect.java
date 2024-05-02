package com.doantotnghiep.server.config.admin_access_annotation;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class AdminAccessCheckerAspect {

    @Before("@annotation(com.doantotnghiep.server.config.admin_access_annotation.CheckAdminAccess)")
    public void checkAccess() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            throw new AccessDeniedException("No execution permission, you are not admin.");
        }
    }
}

