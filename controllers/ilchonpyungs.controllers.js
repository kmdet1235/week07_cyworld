const IlchonpyungsService = require('../services/ilchonpyungs.services');

class IlchonpyungsController {
  ilchonpyungsService = new IlchonpyungsService();

  createBest = async (req, res, next) => {
    try {
      await this.ilchonpyungsService.createBest(req, res);
      res.status(200).send({ msg: '일촌평이 작성되었습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };

  getBests = async (req, res, next) => {
    try {
      const result = await this.ilchonpyungsService.getBests(req, res);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };

  deleteBest = async (req, res, next) => {
    try {
      await this.ilchonpyungsService.deleteBest(req, res);
      res.status(200).send({ msg: '일촌평이 삭제되었습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };
}

module.exports = IlchonpyungsController;
