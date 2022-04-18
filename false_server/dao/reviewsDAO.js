import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async getReviews({
        filters = null,
        page = 0,
        reviewsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            }
        }

        let cursor

        try {
            cursor = await reviews
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { reviewsList: [], totalNumReviews: 0 }
        }

        const displayCursor = cursor.limit(reviewsPerPage).skip(reviewsPerPage * page)

        try {
            const reviewsList = await displayCursor.toArray()
            const totalNumReviews = await reviews.countDocuments(query)

            return { reviewsList, totalNumReviews }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { reviewsList: [], totalNumReviews: 0 }
        }
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            return await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { text: text, date: date } },
            )
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {

        try {
            return await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

}