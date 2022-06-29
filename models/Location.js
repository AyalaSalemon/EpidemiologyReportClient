export class Location {
    static counter = 0
    constructor(startDate, endDate, city, location) {
        this.id = Location.counter++,
            this.startDate = startDate,
            this.endDate = endDate,
            this.city = city,
            this.location = location
    }
}