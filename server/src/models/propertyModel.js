class PropertyModel {
  constructor(property) {
    this.name = property.name;
    this.location = property.location;
    this.price = property.price;
    this.bedrooms = property.bedrooms;
    this.bathrooms = property.bathrooms;
    this.area = property.area;
    this.image = property.image;
    this.description = property.description;
    this.property_type = property.property_type;
    this.status = property.status;
    this.furnishing = property.furnishing;
    this.year_built = property.year_built;
    this.floor_number = property.floor_number;
    this.total_floors = property.total_floors;
    this.parking_spaces = property.parking_spaces;
  }
}

export default PropertyModel;
