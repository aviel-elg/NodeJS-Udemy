require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e5035bdf4d4fb57dc13820c').then((result) => {
//     console.log(result)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount("5e500a977563ac2784bc95b4").then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})