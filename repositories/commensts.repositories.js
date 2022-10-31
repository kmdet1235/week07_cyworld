const { Comments } = require('../models');

class CommentRepository {
  findAllComment = async (diaryId) => {
    const comments = Comments.findAll(
      { where: { diaryId } },
      { order: [['createdAt', 'DESC']] }
    );
    return comments;
  };

  createComment = async (diaryId, userId, comment) => {
    const createCommentData = await Comments.create({
      diaryId,
      userId,
      comment,
    });
    return createCommentData;
  };

  updateComment = async (commentId, userId, comment) => {
    const updateCommentData = await Comments.update(
      { comment: comment },
      { where: { commentId, userId } }
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await Comments.destroy({
      where: { commentId, userId },
    });
    return deleteCommentData;
  };
}
module.exports = CommentRepository;
