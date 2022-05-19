import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let sessions

export default class SessionsDAO {
    static async injectDB(conn) {
        if (sessions) {
            return
        }
        try {
            sessions = await conn.db(process.env.RESTREVIEWS_NS).collection("sessions")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in sessionsDAO: ${e}`,
            )
        }
    }

    static async getSessions({
        filters = null,
        page = 0,
        sessionsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            }
        }

        let cursor

        try {
            cursor = await sessions
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { sessionsList: [], totalNumSessions: 0 }
        }

        const displayCursor = cursor.limit(sessionsPerPage).skip(sessionsPerPage * page)

        try {
            const sessionsList = await displayCursor.toArray()
            const totalNumSessions = await sessions.countDocuments(query)

            return { sessionsList, totalNumSessions }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { sessionsList: [], totalNumSessions: 0 }
        }
    }

    static async getSessionsById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "sessions",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$session_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "sessions",
                    },
                },
                {
                    $addFields: {
                        sessions: "$sessions",
                    },
                },
            ]
            return await sessions.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getSessionsByID: ${e}`)
            throw e
        }
    }

    static async addSession(session, date) {
        try {
            const reviewDoc = {
                creator: session.creator,
                connected: [session.connected],
                date: date,
            }

            return await sessions.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post session: ${e}`)
            return { error: e }
        }
    }
}