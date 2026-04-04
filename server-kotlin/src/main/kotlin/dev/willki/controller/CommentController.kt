package dev.willki.controller

import dev.willki.dto.CommentPageResponse
import dev.willki.dto.CommentResponse
import dev.willki.dto.CreateCommentRequest
import dev.willki.dto.DeleteCommentRequest
import dev.willki.facade.CommentFacade
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/comments")
class CommentController(
    private val commentFacade: CommentFacade
) {
    @GetMapping
    fun getComments(
        @RequestParam currentPage: Int,
        @RequestParam itemsPerPage: Int
    ): ResponseEntity<CommentPageResponse> =
        ResponseEntity.ok(commentFacade.getComments(currentPage, itemsPerPage))

    @PostMapping
    fun createComment(
        @RequestBody request: CreateCommentRequest
    ): ResponseEntity<CommentResponse> =
        ResponseEntity.status(HttpStatus.CREATED).body(commentFacade.createComment(request))

    @DeleteMapping("/{id}")
    fun deleteComment(
        @PathVariable id: Long,
        @RequestBody request: DeleteCommentRequest
    ): ResponseEntity<Void> {
        return try {
            commentFacade.deleteComment(id, request.password)
            ResponseEntity.noContent().build()
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }
}
