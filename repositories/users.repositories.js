const { Users, MyHomeCounts } = require('../models');
const { Op } = require('sequelize');
class UsersRepositories {
  createUser = async (email, name, password, gender, birth) => {
    const createUser = await Users.create(email, name, password, gender, birth);
    return createUser;
  };

  findOneId = async (userId) => {
    const findOneId = await Users.findOne({ where: { userId } });
    return findOneId;
  };

  findOneEmail = async ({ email }) => {
    const findOneEmail = await Users.findOne({ where: { email } });
    return findOneEmail;
  };

  findById = async (userId, email) => {
    const findById = await Users.findByPk({
      where: {
        [Op.and]: [{ userId }, { email }],
      },
    });
    return findById;
  };

  updateRefresh = async (refreshToken, user) => {
    await Users.update({ refreshToken }, { where: { userId: user.userId } });
  };

  // ----------------------------------------------------------------

  findMaxUser = async () => {
    return Users.findOne({
      order: [['userId', 'desc']],
    });
  };

  findByUser = async (userId) => {
    return Users.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: { userId },
    });
  };

  todayTotalCheck = async ({ ip, userId }) => {
    return await MyHomeCounts.findOne({ where: { ip, userId } });
  };

  createTodayTotal = async ({ userId, ip, time }) => {
    await MyHomeCounts.create({ userId, ip, time });
    await Users.increment({ today: 1, total: 1 }, { where: { userId } });
  };

  todayTotalCount = async ({ ip, time, userId }) => {
    await MyHomeCounts.update({ time }, { where: { ip, userId } });
    await Users.increment({ today: 1, total: 1 }, { where: { userId } });
  };

  newTodayTotal = async ({ ip, time, userId }) => {
    await MyHomeCounts.update({ time }, { where: { ip, userId } });
    await Users.increment({ total: 1 }, { where: { userId } });
    await Users.update({ today: 1 }, { where: { userId } });
  };

  introUpdate = async(userId,intro)=>{
    const introupdate =  await Users.update(
        {intro:intro},
        {where: {userId}}
    )
    return introupdate;
  }
}
module.exports = UsersRepositories;
