package dev.willki.repository

import dev.willki.entity.PostView
import org.springframework.data.jpa.repository.JpaRepository

interface PostViewRepository : JpaRepository<PostView, Long> {
    fun countBySlug(slug: String): Long
    fun existsBySlugAndIpAddress(slug: String, ipAddress: String): Boolean
}
