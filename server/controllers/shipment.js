/**
 * Created by henry on 2018/8/14.
 */
const ErrorCode = require('../tools/ErrorCode');
const utils = require('../tools/utils');
const dao = require('../dao/shipment');

const controller = {};

/**
 * 获取出料单图表json
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
controller.getChartResult = async function (req, res) {
  try {
    let beginTime = req.query.beginTime;
    let endTime = req.query.endTime;
    let data = await dao.getChartResult(beginTime, endTime);
    res.success(data);
  } catch (ex) {
    console.log(ex);
    res.json(ErrorCode.SERVER_ERROR);
  }
};

/**
 * 获取出料单列表
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
controller.findList = async function (req, res) {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let sname = req.query.sname;
    let data = await dao.findList(sname, page, limit);
    res.success(data);
  } catch (ex) {
    console.log(ex);
    res.json(ErrorCode.SERVER_ERROR);
  }
};

controller.findById = async function (req, res) {
  try {
    let bookId = req.params.id;
    if (!bookId) {
      return res.json(ErrorCode.INVALID_PARA);
    }
    let book = await dao.findById(bookId, req.query.hasCategory);
    res.success(book);
  } catch (ex) {
    console.log(ex);
    res.json(ErrorCode.SERVER_ERROR);
  }
};

controller.add = async function (req, res) {
  try {
    if (!req.body.address || !req.body.supplyUnit) {
      return res.json(ErrorCode.INVALID_PARA);
    }
    let params = {
      address: req.body.address,
      supplyUnit: req.body.supplyUnit,
      label: req.body.label,
      pouringType: req.body.pouringType,
      supply: req.body.supply,
      planSlump: req.body.planSlump,
      mixRatioNum: req.body.mixRatioNum,
      mixRatio: req.body.mixRatio,
      distance: req.body.distance,
      carNum: req.body.carNum,
      infomation1: req.body.infomation1,
      driver: req.body.driver,
      dateTime: req.body.dateTime,
      infomation2: req.body.infomation2,
      manager: req.body.manager
    };
    let result = await dao.add(params);
    if (result && result.stmt && result.stmt.changes > 0) {
      let id = result.stmt.lastID;
      res.success({id: id});
    } else {
      res.fail();
    }
  } catch (ex) {
    console.log(ex);
    res.json(ErrorCode.SERVER_ERROR);
  }
};

controller.update = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id || !req.body.address || !req.body.supplyUnit) {
      return res.json(ErrorCode.INVALID_PARA);
    }
    let params = {
      address: req.body.address,
      supplyUnit: req.body.supplyUnit,
      label: req.body.label,
      pouringType: req.body.pouringType,
      supply: req.body.supply,
      planSlump: req.body.planSlump,
      mixRatioNum: req.body.mixRatioNum,
      mixRatio: req.body.mixRatio,
      distance: req.body.distance,
      carNum: req.body.carNum,
      infomation1: req.body.infomation1,
      driver: req.body.driver,
      dateTime: req.body.dateTime,
      infomation2: req.body.infomation2,
      manager: req.body.manager
    };
    let result = await dao.update(id, params);
    if (result && result.stmt && result.stmt.changes > 0) {
      res.success(Object.assign({id: result.stmt.lastID}, params));
    } else {
      res.fail();
    }
  } catch (ex) {
    console.log(ex);
    res.json(ErrorCode.SERVER_ERROR);
  }
};

controller.delete = async function (req, res) {
  try {
    let id = req.params.id;
    if (!utils.isPositive(id)) {
      return res.json(ErrorCode.INVALID_PARA);
    }
    await dao.deleteById(id);
    res.success({id: id});
  } catch (ex) {
    console.log(ex);
    res.json(ErrorCode.SERVER_ERROR);
  }
};

module.exports = controller;
