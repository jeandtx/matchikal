import { ObjectId } from "bson";
import ProfilesDAO from "../dao/profilesDAO.js";

export default class ProfilesCtrl {
    static async apiGetProfile(req, res) {
        const profilesPerPage = req.query.profilesPerPage ? parseInt(req.query.profilesPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        }

        const { profilesList, totalNumProfiles } = await ProfilesDAO.getProfiles({
            filters,
            page,
            profilesPerPage,
        });

        let response = {
            profiles: profilesList,
            page: page,
            filters: filters,
            entries_per_page: profilesPerPage,
            total_results: totalNumProfiles,
        };
        res.json(response);
    }

    static async apiPostProfile(req, res, next) {
        try {
            const userInfo = {
                name: req.body.name,
            }
            const date = new Date()

            const ReviewResponse = await ProfilesDAO.addProfile(
                userInfo,
                date,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}