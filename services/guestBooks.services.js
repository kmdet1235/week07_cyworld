const GuestBooksRepository = require('../repositories/guestBooks.repositories');

class GuestBooksService {
  guestBooksRepository = new GuestBooksRepository();

  createBook = async (req, res, next) => {
    const { guestbook } = req.body;
    const { userId } = req.params;
    const { user } = res.locals;

    const existUser = await this.guestBooksRepository.findByUser(userId);
    if (!existUser) throw new Error('미니홈피가 존재하지 않습니다.');

    if (!guestbook) throw new Error('방명록을 입력해주세요.');
    if (guestbook.length < 3) throw new Error('방명록은 3자이상 입력해주세요.');

    if (+userId === user.userId)
      throw new Error('내 미니홈피에는 방명록 작성이 불가합니다.');

    await this.guestBooksRepository.createBook({
      writerId: user.userId,
      name: user.name,
      userId,
      guestBook: guestbook,
    });
  };

  getBooks = async (req, res, next) => {
    const { userId } = req.params;
    return await this.guestBooksRepository.getBooks(userId);
  };

  updateBook = async (req, res) => {
    const { userId, guestbookId } = req.params;
    const { guestbook } = req.body;
    const { user } = res.locals;

    if (!guestbook) throw new Error('수정할 방명록을 입력해주세요.');
    const findGuestBook = await this.guestBooksRepository.findByGuestBook(
      guestbookId
    );

    if (!findGuestBook) throw new Error('존재하지 않는 방명록입니다.');

    if (findGuestBook.writerId !== user.userId)
      throw new Error('본인이 작성한 방명록이 아닙니다.');

    await this.guestBooksRepository.updateBook(guestbook, guestbookId);
  };

  deleteBook = async (req, res, next) => {
    const { userId, guestbookId } = req.params;
    const { user } = res.locals;

    const findGuestBook = await this.guestBooksRepository.findByGuestBook(
      guestbookId
    );

    if (!findGuestBook) throw new Error('존재하지 않는 방명록입니다.');

    if (findGuestBook.writerId !== user.userId)
      throw new Error('본인이 작성한 방명록이 아닙니다.');

    await this.guestBooksRepository.deleteBook(guestbookId);
  };
}

module.exports = GuestBooksService;
