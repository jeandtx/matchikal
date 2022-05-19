import SessionsDAO from "../dao/sessionsDAO.js";

export default class SessionsCtrl {

    static async apiGetSessions(req, res) {
        const sessionsPerPage = req.query.sessionsPerPage ? parseInt(req.query.sessionsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        }

        const { sessionsList, totalNumProfiles } = await SessionsDAO.getSessions({
            filters,
            page,
            sessionsPerPage,
        });

        let response = {
            sessions: sessionsList,
            page: page,
            filters: filters,
            entries_per_page: sessionsPerPage,
            total_results: totalNumProfiles,
        };
        res.json(response);
    }

    static async apiGetSessionById(req, res, next) {
        try {
            let id = req.params.id || {}
            let session = await SessionsDAO.getSessionsById(id)
            if (!session) {
                res.status(404).json({ error: "Not found in the database" })
                return
            }
            res.json(session)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e + "Error is here" })
        }
    }

    static async apiPostSession(req, res, next) {
        try {
            const sessionInfo = {
                creator: req.body.creator,
                connected: req.body.creator,
            }
            const date = new Date()
            const ReviewResponse = await SessionsDAO.addSession(
                sessionInfo,
                date,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteSession(req, res, next) {
        try {
            const sessionId = req.body.id;
            const profileResponse = await SessionsDAO.deleteSession(
                sessionId,
            )
            // error ? (the returned status is always success for all functions)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}