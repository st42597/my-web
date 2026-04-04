package dev.willki.facade

import dev.willki.dto.PostViewResponse
import dev.willki.service.PostViewService
import org.springframework.stereotype.Component

@Component
class PostViewFacade(
    private val postViewService: PostViewService
) {
    fun recordView(slug: String, ipAddress: String): PostViewResponse =
        postViewService.recordView(slug, ipAddress)
}
