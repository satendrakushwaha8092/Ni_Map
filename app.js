//This files are importing for Api calls
//For call api first start server from runing index.js file
const express = require('express');  //importing express
const router = express.Router();  //imporing router 

//-----------------------------------------------------Declaring arrays------------------------------------------------

//Here array work as Data Base

let users = []  //declaring array for store data of users
let drivers = []  //declaring array for store data of drviers
let rides = []  //declaring array for store data of riders

//------------------------------------------------------Declaring classes----------------------------------------------

class userdata {  // class declaring for storing users data in object form
    constructor(Name, Gender, Age, Location) {
        this.Name = Name
        this.Gender = Gender
        this.Age = Age
        this.Location = Location
    }
}

class driverdata { // class declaring for storing drivers data in object form
    constructor(Name, Gender, Age, Car_name, Car_number, Location, Status, Earn) {
        this.Name = Name
        this.Gender = Gender
        this.Age = Age
        this.Car_name = Car_name
        this.Car_number = Car_number
        this.Location = Location
        this.Status = Status
        this.Earn = Earn
    }
}

class ridedata {  // class declaring for storing ridersdata data in object form
    constructor(User_Name, Distance, Driver_name, Bill) {
        this.User_Name = User_Name
        this.Distance = Distance
        this.Driver_name = Driver_name
        this.Bill = Bill
    }
}

//-------------------------------------------------------------Declaring methods-------------------------------------------

function add_user(name, Gender, age) { //method declaring for adding user data
    const obj = new userdata()  //craeting object
    obj.Name = name  //assigning values
    obj.Gender = Gender
    obj.Age = age
    users.push(obj) //obj push in users array
}


function update_userLocation(name, location) {  //method declaring for updating user data
    for (let i = 0; i < users.length; i++) {  //traverse each index of array
        if (users[i].Name == name) {  //mathing name
            users[i].Location = location  //updating location
        }
    }
}


function add_driver(name, gender, age, car_name, car_number, location) {   //method declaring for adding drivers data
    const obj = new driverdata()  //creating object
    obj.Name = name = name   //method declaring for updating user data
    obj.Gender = gender
    obj.Age = age
    obj.Car_name = car_name
    obj.Car_number = car_number
    obj.Location = location
    obj.Status = true
    obj.Earn = 0
    drivers.push(obj) //obj push in drivers array
}

function find_ride(name, src, des) {
    const obj = new ridedata()
    const distance = Math.sqrt((des[0] - src[0]) * (des[0] - src[0]) + (des[1] - src[1]) * (des[1] - src[1]))  //caculating distance
    if (distance < 5) console.log(" No ride found")  //Since all the driver are more than 5 units away from use
    else {
        for (let i = 0; i < drivers.length; i++) {
            if (drivers[i].Status == true) {
                obj.User_Name = name
                obj.Distance = distance
                rides.push(obj)
                console.log(`${drivers[i].Name} [Available]`)
                break;
            }
        }
    }
}

function choose_ride(user_name, driver_name) {  //method declaring for choose ride
    for (let i = 0; i < rides.length; i++) {
        if (rides[i].User_Name == user_name) {
            rides[i].Driver_name = driver_name
        }
    }
    console.log("ride Started")
}

function calculateBill(user_name) { //method declaring for calculate bill
    let userbill = null
    let rent_per_unit = 10  //let rent pet unit = 10
    for (let i = 0; i < rides.length; i++) {
        if (rides[i].User_Name == user_name) {
            rides[i].Bill = rides[i].Distance * rent_per_unit
            userbill = rides[i].Distance * rent_per_unit
            for (let j = 0; j < drivers.length; j++) {
                if (rides[i].Driver_name == drivers[j].Name) {
                    drivers[j].Earn = userbill  //assigning driver earning
                }

            }
        }
    }

    console.log(`ride Ended bill amount ${userbill}`)  //displaying user bill
}

function update_driverLocation(name, location) {  //method declaring for update driver location 
    for (let i = 0; i < drivers.length; i++) {
        if (drivers[i].Name == name) {
            drivers[i].Location = location
        }
    }
}

function change_driver_status(driver_name, status) {  //method declaring for change driver status
    for (let i = 0; i < drivers.length; i++) {
        if (drivers[i].Name == driver_name) {
            drivers[i].Status = status
        }
    }
}

function find_total_earning() { //method declaring for geting earning of all drivers
    for (let i = 0; i < drivers.length; i++) {
        console.log(`${drivers[i].Name} earn ${drivers[i].Earn}`)
    }
}

//------------------------------------------------------------calling methods---------------------------------------------

add_user("Abhishek", "M", 23)  //calling method for adding user data
add_user("Rahul", "M", 29)
add_user("Nandini", "F", 22)

update_userLocation("Abhishek", [0, 0])  //calling method for updating user data
update_userLocation("Rahul", [10, 0])
update_userLocation("Nandini", [15, 6])

add_driver("Driver1", "M", 22, "Swift", "KA-01-12345", [10, 1]) //calling method for adding drivers data
add_driver("Driver2", "M", 29, "Swift", "KA-01-12345", [11, 10])
add_driver("Driver3", "M", 24, "Swift", "KA-01-12345", [5, 3])

find_ride("Abhishek", [0, 0], [20, 1])  //calling method for find ride
find_ride("Rahul", [10, 0], [15, 3])

choose_ride("Rahul", "Driver1")  //calling method for choose ride

calculateBill("Rahul")  //calling method for calculate user bill

router.get('/updateuserlocation', (req, res) => {  //updateing user location by api 
    update_userLocation("Rahul", [15, 3])  //calling method for update user location
    console.log(users)
    res.status(200).send("successfully updated")
})

router.get('/updatedriverlocation', (req, res) => {  //updateing driver location by api 
    update_driverLocation("Driver1", [15, 3])  //calling method for update driver location
    console.log(drivers)
    res.status(200).send("successfully updated")
})



change_driver_status("Driver1", false)  //calling method for change driver status

find_ride("Nandini", [15, 6], [20, 4])  //calling method for find ride

find_total_earning()  //calling method for get total earning of drivers

module.exports = router;  //exporting router



//________________________________________________________Thank You_____________________________________________________