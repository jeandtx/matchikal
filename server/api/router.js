import express from 'express';
import ProfilesCtrl from './ProfilesCtrl.js';

const router = express.Router();

router.route("/profiles").get(ProfilesCtrl.apiGetProfile);
router.route("/profiles").post(ProfilesCtrl.apiPostProfile);

export default router;