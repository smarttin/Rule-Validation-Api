import express from 'express';
import {getData, createDetails} from './controller.js';
import {validate} from './validate.js';

const router = express.Router();

router.get('/', getData);
router.post('/validate-rule', validate(), createDetails);

export default router;
