package dev.willki

import dev.willki.repository.CommentRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.springframework.transaction.annotation.Transactional

@Transactional
class CommentControllerTest @Autowired constructor(
    private val commentRepository: CommentRepository
) : IntegrationTestBase() {

    private fun createComment(name: String, password: String, comment: String): Long {
        val body = mapOf("name" to name, "password" to password, "comment" to comment)
        val result = mockMvc.post("/comments") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(body)
        }.andReturn()
        val node = objectMapper.readTree(result.response.contentAsString)
        return node.get("id").asLong()
    }

    @Test
    fun `POST creates comment and returns it without password`() {
        val body = mapOf("name" to "kim", "password" to "pw1234", "comment" to "안녕하세요")
        mockMvc.post("/comments") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(body)
        }.andExpect {
            status { isCreated() }
            jsonPath("$.id") { exists() }
            jsonPath("$.name") { value("kim") }
            jsonPath("$.comment") { value("안녕하세요") }
            jsonPath("$.createdAt") { exists() }
            jsonPath("$.password") { doesNotExist() }
        }
    }

    @Test
    fun `GET returns paginated comments ordered by id desc`() {
        createComment("a", "pw", "first")
        createComment("b", "pw", "second")
        createComment("c", "pw", "third")

        // 0-indexed page, 2 per page -> totalPages=2, 첫 페이지는 최신 2개(c, b)
        mockMvc.get("/comments") {
            param("currentPage", "0")
            param("itemsPerPage", "2")
        }.andExpect {
            status { isOk() }
            jsonPath("$.totalPages") { value(2) }
            jsonPath("$.currentItems.length()") { value(2) }
            jsonPath("$.currentItems[0].comment") { value("third") }
            jsonPath("$.currentItems[1].comment") { value("second") }
        }
    }

    @Test
    fun `DELETE with correct password removes comment`() {
        val id = createComment("kim", "secret", "지울 댓글")

        mockMvc.delete("/comments/$id") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(mapOf("password" to "secret"))
        }.andExpect { status { isNoContent() } }

        assert(commentRepository.findById(id).isEmpty) { "댓글이 삭제되어야 한다" }
    }

    @Test
    fun `DELETE with wrong password returns 401`() {
        val id = createComment("kim", "secret", "안 지워질 댓글")

        mockMvc.delete("/comments/$id") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(mapOf("password" to "wrong"))
        }.andExpect { status { isUnauthorized() } }

        assert(commentRepository.findById(id).isPresent) { "댓글이 남아있어야 한다" }
    }

    @Test
    fun `DELETE with admin password removes comment`() {
        val id = createComment("kim", "secret", "관리자가 지움")

        mockMvc.delete("/comments/$id") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(mapOf("password" to "admin-secret"))
        }.andExpect { status { isNoContent() } }

        assert(commentRepository.findById(id).isEmpty)
    }

    @Test
    fun `DELETE non-existent comment returns 404`() {
        mockMvc.delete("/comments/999999") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(mapOf("password" to "whatever"))
        }.andExpect { status { isNotFound() } }
    }
}
