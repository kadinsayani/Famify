import { ObjectId } from "mongodb";

// models
import User from "../models/User.model.js"
import Notification from "../models/Notification.model.js"
import Family from "../models/Family.model.js";

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

/**
 * Create notifications that the user will GET on their notification page.
 * Example: {subject} {content}
 * @constructor
 * @param {ObjectId} userID - ObjectID of the user that has caused the notification
 * @param {String} content - Message
 * @param {[ObjectId]} _familyMembersIDs - an array of ObjectIDs of the user's family members
 */
function notifyFamily(userID, content) {

    User.findById(userID.toString(), (err, user) => {

        if (err) console.log(err)
        if (!user) console.log("User not found.")

        Family.findById(user.family.toString(), (err, family) => {

            if (err) console.log(err)
            if (!family) return
    
            const toNotify = [...family.members].filter(member => member._id.toString() !== userID.toString())
            notify(userID, content, toNotify)
    
        })

    })

}

export {notify, notifyFamily};