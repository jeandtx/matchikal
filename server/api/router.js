import express from 'express';
import ProfilesCtrl from './ProfilesCtrl.js';
import SessionsCtrl from './SessionsCtrl.js';

const router = express.Router();

router.route("/profiles").get(ProfilesCtrl.apiGetProfile);
router.route("/profiles/id/:id").get(ProfilesCtrl.apiGetProfileById);
router.route("/profiles").post(ProfilesCtrl.apiPostProfile);
router.route("/profiles").delete(ProfilesCtrl.apiDeleteProfile);
router.route("/sessions").get(SessionsCtrl.apiGetSessions);

export default router;