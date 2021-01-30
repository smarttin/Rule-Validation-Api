import {validationResult} from 'express-validator';
import {isObject, isArray, isString} from './utils.js';

const getData = (req, res, next) => {
  const details = {
    name: 'Oguejiofor Onyekachukwu',
    github: '@smarttin',
    email: 'oguejioforonyeka@gmail.com',
    mobile: '07059905996',
    twitter: '@smarttin77',
  };

  res.status(200).json({
    message: 'My Rule-Validation API.',
    status: 'success',
    data: details,
  });
};

const createDetails = (req, res, next) => {
  const {rule, data} = req.body;

  // check for field validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let validationErrors = {};
    errors.array().forEach((error) => (validationErrors[error.param] = error.msg));

    if (!data) {
      return res.status(400).json({
        message: 'data is required.',
        status: 'error',
        data: null,
      });
    }

    if (!rule) {
      return res.status(400).json({
        message: 'rule is required.',
        status: 'error',
        data: null,
      });
    }

    // check if rule is a valid object
    if (!isObject(rule)) {
      return res.status(400).json({
        message: 'rule should be an object.',
        status: 'error',
        data: null,
      });
    }

    const fieldValue = data?.missions?.count ? data.missions.count : data.missions;

    return res.status(400).json({
      message: `field ${rule.field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field: rule.field,
          field_value: fieldValue,
          condition: rule.condition,
          condition_value: rule.condition_value,
        },
      },
    });
  }

  // check if data is either string / array / object
  if (!(isObject(data) || isString(data) || isArray(data))) {
    return res.status(400).json({
      message: 'Data should be either string, object or array.',
      status: 'error',
      data: null,
    });
  }

  // check if field exist in data
  if (!isObject(data) && rule.field) {
    return res.status(400).json({
      message: `field ${rule.field} is missing from data.`,
      status: 'error',
      data: null,
    });
  }

  const fieldValue = data.missions.count ? data.missions.count : data.missions;

  res.status(200).json({
    message: `field ${rule.field} successfully validated`,
    status: 'success',
    data: {
      validation: {
        error: false,
        field: rule.field,
        field_value: fieldValue,
        condition: rule.condition,
        condition_value: rule.condition_value,
      },
    },
  });
};

export {createDetails, getData};
