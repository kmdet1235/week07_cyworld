const CommentService = require('../services/commensts.services');

class CommentController {
  commentController = new CommentService();

  getComment = async (req, res) => {
    const { diaryId } = req.params;
    const comments = await this.commentController.findAllComment(diaryId);
    res.status(200).json({ data: comments });
  };

  createComment = async (req, res) => {
    const { diaryId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    console.log(res.locals.user);

    const createCommentData = await this.commentController.createComment(
      diaryId,
      userId,
      comment
    );
    res.status(200).json({ data: createCommentData });
  };

  updataComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;

    const updateCommentData = await this.commentController.updateComment(
      commentId,
      userId,
      comment
    );
    res.status(200).json({ data: updateCommentData });
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    const deleteCommentData = await this.commentController.deleteComment(
      commentId,
      userId
    );
    res.status(200).json({ data: deleteCommentData });
  };
}

module.exports = CommentController;
