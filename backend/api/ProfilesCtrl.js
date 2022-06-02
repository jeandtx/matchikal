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
            const userAppInfo = {
                name: req.body.app.display_name,
                id: req.body.app.id,
                email: req.body.app.email,
                country: req.body.app.country
            }
            const userInfo = {
                name: req.body.name,
                appInfo: userAppInfo
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

    static async apiDeleteProfile(req, res, next) {
        try {
            const profileId = req.body.id;
            const profileName = req.body.name
            console.log(profileId)
            const profileResponse = await ProfilesDAO.deleteProfile(
                profileId,
                profileName,
            )
            // error ? (the returned status is always success for all functions)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetProfileById(req, res, next) {
        try {
            let id = req.params.id || {}
            let profile = await ProfilesDAO.getProfilesById(id)
            if (!profile) {
                res.status(404).json({ error: "Not found in the database" })
                return
            }
            res.json(profile)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e + "Error is here" })
        }
    }
}