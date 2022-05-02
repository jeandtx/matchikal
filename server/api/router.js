import express from 'express';
import ProfilesCtrl from './ProfilesCtrl.js';

const router = express.Router();

router.route("/profiles").get(ProfilesCtrl.apiGetProfile);
router.route("/profiles/id/:id").get(ProfilesCtrl.apiGetProfileById);
router.route("/profiles").post(ProfilesCtrl.apiPostProfile);
router.route("/profiles").delete(ProfilesCtrl.apiDeleteProfile);

export default router;