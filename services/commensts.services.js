const CommentRepository = require('../repositories/commensts.repositories');

class CommentService {
  commentService = new CommentRepository();

  findAllComment = async (diaryId) => {
    const allComment = await this.commentService.findAllComment(diaryId);
    return allComment;
  };

  createComment = async (diaryId, userId, comment) => {
    const createCommentData = await this.commentService.createComment(
      diaryId,
      userId,
      comment
    );
    return {
      diaryId: createCommentData.diaryId,
      userId: createCommentData.userId,
      comment: createCommentData.comment,
    };
  };

  updateComment = async (commentId, userId, comment) => {
    const updateCommentData = await this.commentService.updateComment(
      commentId,
      userId,
      comment
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await this.commentService.deleteComment(
      commentId,
      userId
    );
    return deleteCommentData;
  };
}

module.exports = CommentService;
