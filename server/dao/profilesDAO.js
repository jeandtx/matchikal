import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let profiles

export default class ProfilesDAO {
    static async injectDB(conn) {
        if (profiles) {
            return
        }
        try {
            profiles = await conn.db(process.env.RESTREVIEWS_NS).collection("profiles")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in profilesDAO: ${e}`,
            )
        }
    }

    static async getProfiles({
        filters = null,
        page = 0,
        profilesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            }
        }

        let cursor

        try {
            cursor = await profiles
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { profilesList: [], totalNumProfiles: 0 }
        }

        const displayCursor = cursor.limit(profilesPerPage).skip(profilesPerPage * page)

        try {
            const profilesList = await displayCursor.toArray()
            const totalNumProfiles = await profiles.countDocuments(query)

            return { profilesList, totalNumProfiles }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { profilesList: [], totalNumProfiles: 0 }
        }
    }

    static async addProfile(profile, date) {
        try {
            const reviewDoc = {
                name: profile.name,
                clientId: profile.clientId,
                clientSecret: profile.clientSecret,
                token: profile.token,
                refreshToken: profile.refreshToken,
                date: date,
            }

            return await profiles.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post profile: ${e}`)
            return { error: e }
        }
    }

    static async deleteProfile(profileId, profileName) {
        try {
            return await profiles.deleteOne({
                _id: ObjectId(profileId),
                name: profileName,
            })
        } catch (e) {
            console.error(`Unable to delete profile: ${e}`)
            return { error: e }
        }
    }
}