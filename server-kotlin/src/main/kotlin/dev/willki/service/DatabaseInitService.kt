package dev.willki.service

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class DatabaseInitService(
    private val jdbcTemplate: JdbcTemplate
) {
    fun initializeDatabase() {
        jdbcTemplate.execute(
            """
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                password VARCHAR(100) NOT NULL,
                comment TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """.trimIndent()
        )

        jdbcTemplate.execute(
            """
            CREATE TABLE IF NOT EXISTS post_views (
                id SERIAL PRIMARY KEY,
                slug VARCHAR(255) NOT NULL,
                ip_address VARCHAR(45) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """.trimIndent()
        )

        jdbcTemplate.execute(
            "CREATE UNIQUE INDEX IF NOT EXISTS unique_slug_ip ON post_views (slug, ip_address)"
        )
    }
}
