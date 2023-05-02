exports.generateApartmentNumbers =  (floorNumber, apartmentsPerFloor) => {
    try {
        const arrayNumberApartment = [];
        for (let i = 1; i <= apartmentsPerFloor; i++) {
            const apartmentNumber = `${floorNumber}${i.toString().padStart(2, "0")}`;
            arrayNumberApartment.push(parseInt(apartmentNumber));
        }
        return arrayNumberApartment;
    }
    catch (error) {
        return error
    }
}
