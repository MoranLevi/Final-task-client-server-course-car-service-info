const USERS_TABLE = {
    name: "Users",
    columns: {
        email:     "email",
        firstName: "firstName",
        lastName:  "lastName",
        password:  "password",
        connected: "connected"
    }
}

const CARS_TABLE = {
    name: "Cars",
    columns: {
        treatmentNumber: "treatmentNumber",
        treatmentInfo:   "treatmentInfo",
        dateT:           "dateT",
        workerEmail:     "workerEmail",
        carNumber:       "carNumber"
    }
}

module.exports = {
    USERS_TABLE, CARS_TABLE
}