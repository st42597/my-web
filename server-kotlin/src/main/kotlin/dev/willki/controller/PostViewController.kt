package dev.willki.controller

import dev.willki.dto.PostViewResponse
import dev.willki.facade.PostViewFacade
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/posts")
class PostViewController(
    private val postViewFacade: PostViewFacade
) {
    @PostMapping("/{slug}/views")
    fun recordView(
        @PathVariable slug: String,
        request: HttpServletRequest
    ): ResponseEntity<PostViewResponse> {
        val ipAddress = resolveClientIp(request)

        if (slug.isBlank() || ipAddress.isBlank()) {
            return ResponseEntity.badRequest().build()
        }

        return ResponseEntity.ok(postViewFacade.recordView(slug, ipAddress))
    }

    private fun resolveClientIp(request: HttpServletRequest): String {
        val xForwardedFor = request.getHeader("X-Forwarded-For")
        return if (!xForwardedFor.isNullOrBlank()) {
            xForwardedFor.split(",").first().trim()
        } else {
            request.remoteAddr ?: ""
        }
    }
}
