// CRUD - create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description: 'Do the dishes'
    }).then((result) => {
        console.log(result)
        console.log('Deleted successfuly!')
    }).catch((error) => {
        console.log(error)
        console.log('Failed deleting the task')
    })

    // db.collection('users').deleteMany({
    //     age: 21, 
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // const updatePromise = db.collection('tasks').updateMany({
    //     complsdeted: false
    // }, {
    //     $set: {
    //         complsdeted: true
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // })
    // .catch((error) => {
    //     console.log(result)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5e4ff87f0d44802660f0f6b4")
    // }, {
    //     $inc: {
    //         age: -1
    //     }
    // })


    // // $set {} 

    // updatePromise.then((result) => {
    //     console.log(result)
    // })
    // .catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').findOne({'_id': new ObjectID('5e4ffb906dc6d829a03995e2')}, (error, user) => {
    //     if (error) {
    //         console.log('Unable to query user')
    //     }

    //     console.log(user)
    // })

    // cursor = db.collection('users').find({ age: 21 })
    // cursor.forEach(user => {
    //     console.log(user)
    // });

    // db.collection('users').find({ age: 21 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 21 }).count((error, users) => {
    //     console.log(users)
    // })

//     db.collection('tasks').findOne({}, {sort: [['_id', 'descending']]}, (error, result) => {
//         if (error) {
//             console.log('Error getting newest task')
//         }

//         console.log(result)
//     })

//     db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
//         if (error) {
//             console.log('Error getting incompleted tasks')
//         }

//         console.log()
//     })
})



