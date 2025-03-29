package com.se330.ctuong_backend.config;

import dto.response.Game;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Random;


@Configuration
@EnableScheduling
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

    @Bean
    public Random random() {
        return new Random();
    }
}
