package dev.willki

import org.junit.jupiter.api.Test
import org.springframework.test.web.servlet.post
import org.springframework.transaction.annotation.Transactional

@Transactional
class PostViewControllerTest : IntegrationTestBase() {

    @Test
    fun `first view from an IP returns count 1`() {
        mockMvc.post("/posts/my-post/views") {
            header("X-Forwarded-For", "10.0.0.1")
        }.andExpect {
            status { isOk() }
            jsonPath("$.slug") { value("my-post") }
            jsonPath("$.viewCount") { value(1) }
        }
    }

    @Test
    fun `same IP viewing twice does not increase count`() {
        repeat(2) {
            mockMvc.post("/posts/dedup-post/views") {
                header("X-Forwarded-For", "10.0.0.2")
            }
        }
        mockMvc.post("/posts/dedup-post/views") {
            header("X-Forwarded-For", "10.0.0.2")
        }.andExpect {
            status { isOk() }
            jsonPath("$.viewCount") { value(1) }
        }
    }

    @Test
    fun `different IPs each count once`() {
        mockMvc.post("/posts/multi-post/views") { header("X-Forwarded-For", "10.0.0.3") }
        mockMvc.post("/posts/multi-post/views") {
            header("X-Forwarded-For", "10.0.0.4")
        }.andExpect {
            status { isOk() }
            jsonPath("$.viewCount") { value(2) }
        }
    }

    @Test
    fun `X-Forwarded-For with multiple hops uses the first client IP`() {
        mockMvc.post("/posts/proxy-post/views") {
            header("X-Forwarded-For", "203.0.113.7, 10.0.0.9")
        }.andExpect {
            status { isOk() }
            jsonPath("$.viewCount") { value(1) }
        }
    }
}
