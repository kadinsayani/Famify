import { ObjectId } from "mongodb";

// models
import User from "../models/User.model.js"
import Notification from "../models/Notification.model.js"

/**
 * Create notifications that the user will GET on their notification page.
 * Example: {subject} {content}
 * @constructor
 * @param {ObjectId} subject - ObjectID of the user that has caused the notification
 * @param {String} content - Message
 * @param {[ObjectId]} users - an array of ObjectIDs of the users the notification is for.
 */
function notify(subject, content, users) {

    const notification = new Notification({
        subject: subject,
        content: content,
        users: users,
        date: new Date()
    })

    notification.save()

}

export default notify;