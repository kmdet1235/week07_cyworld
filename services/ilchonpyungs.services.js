const IlchonpyungsRepository = require('../repositories/ilchonpyungs.repositories');

class IlchonpyungsService {
  ilchonpyungsRepository = new IlchonpyungsRepository();
  createBest = async (req, res, next) => {
    const { ilchonpyung } = req.body;
    const { userId } = req.params;
    const { user } = res.locals;

    const existUser = await this.ilchonpyungsRepository.findByUser(userId);
    if (!existUser) throw new Error('미니홈피가 존재하지 않습니다.');

    if (!ilchonpyung) throw new Error('일촌평을 작성해주세요.');
    if (ilchonpyung.length < 3)
      throw new Error('일촌평을 3자이상 입력해주세요.');

    if (+userId === user.userId)
      throw new Error('내 미니홈피에는 일촌평 작성이 불가합니다.');

    const existBest = await this.ilchonpyungsRepository.findByWriter(
      user.userId
    );

    if (existBest) throw new Error('일촌평은 하나만 작성 가능합니다.');

    await this.ilchonpyungsRepository.createBest({
      userId,
      name: user.name,
      writerId: user.userId,
      ilchonpyung,
    });
  };

  getBests = async (req, res, next) => {
    const { userId } = req.params;

    return await this.ilchonpyungsRepository.getBests(userId);
  };

  deleteBest = async (req, res, next) => {
    const { userId, ilchonpyungId } = req.params;
    const { user } = res.locals;

    const best = await this.ilchonpyungsRepository.findByBest(ilchonpyungId);

    if (!best) throw new Error('존재하지 않는 일촌평입니다.');

    if (best.writerId !== user.userId)
      throw new Error('본인이 작성한 일촌평이 아닙니다.');

    await this.ilchonpyungsRepository.deleteBest(userId, ilchonpyungId);
  };
}
module.exports = IlchonpyungsService;
