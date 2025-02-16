package com.homechallenger.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;

@Configuration
public class OpenApiConfig {

    @Value("${home-challenger.openapi.dev-url}")
    private String devUrl;

    @Value("${home-challenger.openapi.prod-url}")
    private String prodUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        // Creación de servidores
        Server devServer = new Server();
        devServer.setUrl(devUrl);
        devServer.setDescription("Development server");

        Server prodServer = new Server();
        prodServer.setUrl(prodUrl);
        prodServer.setDescription("Production server");

        // Configuración del contacto
        Contact contact = new Contact();
        contact.setName("HomeChallenger");
        contact.setEmail("2YyYb@example.com");

        // Información de la API
        Info info = new Info()
                .title("HomeChallenger API")
                .version("1.0")
                .description("API for HomeChallenger")
                .termsOfService("http://swagger.io/terms/")
                .contact(contact);

        // Configuración de seguridad (JWT Bearer)
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");

        Components components = new Components().addSecuritySchemes("bearerAuth", securityScheme);

        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("bearerAuth");

        // Retorna la configuración final
        return new OpenAPI()
                .info(info)
                .addServersItem(devServer)   // Servidor de desarrollo
                .addServersItem(prodServer)  // Servidor de producción
                .components(components)
                .addSecurityItem(securityRequirement);
    }
}
