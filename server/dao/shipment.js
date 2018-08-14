/**
 * Created by jerry on 2018/5/30.
 */

const base = require('./base');
const utils = require('../tools/utils');
const tableName = 'shipment';
const dao = {};

dao.findList = async function (sname, page, limit) {
  sname = utils.trimSqlchar(sname);
  let where = `where address like '%${sname}%'`;
  let sorts = 'order by address';
  return await base.findList(tableName, null, where, sorts, page, limit);
};

dao.findById = async function (id, hasCategory) {
  if (hasCategory) {
    let sqlQuery = `select * from shipment a where a.id = ${id}`;
    return await base.get(sqlQuery, null);
  } else {
    return await base.findById(tableName, id);
  }

};

dao.add = async function (data) {
  let fields = {
    address: data.address,
    project: data.project,
    label: data.label,
    pouringType: data.pouringType,
    infomation1: data.infomation1,
    infomation2: data.infomation2,
    codeNum: data.codeNum,
    mixRatio: data.mixRatio,
    infomation3: data.infomation3,
    CarNum: data.CarNum,
    infomation4: data.infomation4,
    driver: data.driver,
    dateTime: data.dateTime,
    infomation5: data.infomation5,
    manager: data.manager
  };
  return await base.insert(tableName, fields);
};

dao.update = async function (id, data) {
  return await base.updateById(tableName, id, data);
};

dao.deleteById = async function (id) {
  return await base.deleteById(tableName, id);
};

module.exports = dao;
