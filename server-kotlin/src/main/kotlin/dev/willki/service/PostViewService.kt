package dev.willki.service

import dev.willki.dto.PostViewResponse
import dev.willki.entity.PostView
import dev.willki.repository.PostViewRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class PostViewService(
    private val postViewRepository: PostViewRepository
) {
    @Transactional
    fun recordView(slug: String, ipAddress: String): PostViewResponse {
        if (!postViewRepository.existsBySlugAndIpAddress(slug, ipAddress)) {
            postViewRepository.save(PostView(slug = slug, ipAddress = ipAddress))
        }
        val viewCount = postViewRepository.countBySlug(slug)
        return PostViewResponse(slug = slug, viewCount = viewCount)
    }
}
