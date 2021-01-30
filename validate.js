import {body} from 'express-validator';

const validate = () => {
  return [
    body('rule').notEmpty().withMessage('rule is required.').bail(),
    body('rule.field').notEmpty().withMessage('field is required.').bail(),
    body('rule.condition')
      .notEmpty()
      .withMessage('condition is required.')
      .bail()
      .isIn(['eq', 'neq', 'gt', 'gte', 'contains'])
      .withMessage('condition must be one of  eg - eq, neq, gt, gte, contains.')
      .bail(),
    body('rule.condition_value').notEmpty().withMessage('condition_value is required.').bail(),
    body('data').notEmpty().withMessage('data is required.').bail(),
  ];
};

export {validate};
