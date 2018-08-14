/**
 * Created by henry on 2018/8/14.
 */
const ErrorCode = require('../tools/ErrorCode');
const utils = require('../tools/utils');
const dao = require('../dao/shipment');

const controller = {};

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
    if (!req.body.address || !req.body.project) {
      return res.json(ErrorCode.INVALID_PARA);
    }
    let params = {
      address: req.body.address,
      project: req.body.project,
      label: req.body.label,
      pouringType: req.body.pouringType,
      infomation1: req.body.infomation1,
      infomation2: req.body.infomation2,
      codeNum: req.body.codeNum,
      mixRatio: req.body.mixRatio,
      infomation3: req.body.infomation3,
      CarNum: req.body.CarNum,
      infomation4: req.body.infomation4,
      driver: req.body.driver,
      dateTime: req.body.dateTime,
      infomation5: req.body.infomation5,
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
    if (!id || !req.body.address || !req.body.project) {
      return res.json(ErrorCode.INVALID_PARA);
    }
    let params = {
      address: req.body.address,
      project: req.body.project,
      label: req.body.label,
      pouringType: req.body.pouringType,
      infomation1: req.body.infomation1,
      infomation2: req.body.infomation2,
      codeNum: req.body.codeNum,
      mixRatio: req.body.mixRatio,
      infomation3: req.body.infomation3,
      CarNum: req.body.CarNum,
      infomation4: req.body.infomation4,
      driver: req.body.driver,
      dateTime: req.body.dateTime,
      infomation5: req.body.infomation5,
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
