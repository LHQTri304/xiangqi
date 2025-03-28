package com.se330.ctuong_backend.config;

import dto.response.Game;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;


@Configuration
public class ApplicationConfiguration {
    public static Game DEFAULT_GAME = Game.builder()
            .whitePlayerId("google-oauth2|107467322953502622934")
            .blackPlayerId("auth0|67e67a37850ac85be855463a")
            .build();

    @Value("${springdoc.oAuthFlow.authorizationUrl}")
    private String authorizationUrl;

    @Value("${springdoc.oAuthFlow.tokenUrl}")
    private String tokenUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList("okta"))
                .components(new Components()
                        .addSecuritySchemes("okta",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.OAUTH2)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .flows(new OAuthFlows()
                                                .authorizationCode(new OAuthFlow()
                                                        .authorizationUrl(authorizationUrl)
                                                        .tokenUrl(tokenUrl)
                                                )
                                        )
                        )
                );
    }
}
