import lodash from "lodash"

const holidays = [
  { name: "New Year", date: new Date("2025-01-01") },
  { name: "Good Friday", date: new Date("2025-04-18") },
  { name: "Easter Monday", date: new Date("2025-04-21") },
  { name: "Victoria Day", date: new Date("2025-05-19") },
  { name: "Saint-Jean-Baptiste Day", date: new Date("2025-06-24") },
  { name: "Canada Day", date: new Date("2025-07-01") },
  { name: "Civic Holiday", date: new Date("2025-08-04") },
  { name: "Labour Day", date: new Date("2025-09-01") },
  {
    name: "National Day for Truth and Reconciliation",
    date: new Date("2025-09-30"),
  },
  { name: "Thanksgiving Day", date: new Date("2025-10-13") },
  { name: "Remembrance Day", date: new Date("2025-11-11") },
  { name: "Christmas Day", date: new Date("2025-12-25") },
  { name: "Boxing Day", date: new Date("2025-12-26") },
]

let today = new Date()

// Iterate through array
holidays.forEach((holiday) => {
  let dateDifference = holiday.date - today

  //TODO: if holiday is passed:
  if (dateDifference < 0) {
    // Add one year in the date
    let nextYearDate = new Date(holiday.date)
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1)

    // Change dateDifference
    dateDifference = nextYearDate - today

    // print
    console.log(
      `${holiday.name} has passed. Number of days until next occurrence: ${Math.ceil(
        dateDifference / (1000 * 60 * 60 * 24)
      )}`
    )
  } else {
    console.log(
      `Number of days from today for ${holiday.name} : ${Math.ceil(dateDifference / (1000 * 60 * 60 * 24))}`
    )
  }
})

let random_holiday = lodash.sample(holidays)
console.log(random_holiday)

console.log(
  `Index for Christmas Day : ${lodash.findIndex(holidays, { name: "Christmas Day" })}`
)
console.log(
  `Index for Canada Day : ${lodash.findIndex(holidays, { name: "Canada Day" })}`
)
