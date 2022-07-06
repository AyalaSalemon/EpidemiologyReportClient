export class Patient {
    constructor(id, location) {
        this.id = id
        this.locations = []
        if (location)
            this.locations.push(location)
    }
    addLocation(location) {
        this.locations.push(location)
    }
    deleteLocation(id) {
        this.locations = this.locations.filter(rep => rep.id == id)
    }
}