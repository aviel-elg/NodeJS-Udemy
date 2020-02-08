// const square = function(x) {
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(3))

// Weird var binding - arrow function dont bind their own value - but they does their parents value
// const event = {
//     name: 'Birthday Party',
//     printGuestList: (guest) => {
//         console.log('Guest list for ' + this.name)
//     }
// }

// Nested this is not working.. Theres is hack
// const event = {
//     name: 'Birthday Party',
//     guestList: ['Aviel', 'Noy', 'Amit'],
//     printGuestList: function() 
//     {   
//         const that = this
//         console.log('Guest list for ' + this.name)
//         this.guestList.forEach(function(guest) {
//             console.log(guest + ' is attending ' + that.name)
//         })
//     }
// }

const event = {
    name: 'Birthday Party',
    guestList: ['Aviel', 'Noy', 'Amit'],
    printGuestList() 
    {   
        console.log('Guest list for ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList()