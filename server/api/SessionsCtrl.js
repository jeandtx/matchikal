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
}