package dev.willki

import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.get

class DatabaseInitControllerTest : IntegrationTestBase() {

    @Test
    fun `initDB creates tables idempotently and returns success`() {
        // 이미 존재하는 테이블에 대해서도 CREATE TABLE IF NOT EXISTS 라 안전하게 200
        mockMvc.get("/initDB").andExpect {
            status { isOk() }
            content { string("Database initialized successfully.") }
        }
    }
}
