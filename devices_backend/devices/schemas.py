from ninja import ModelSchema, Schema
from devices.models import Device, Location

# Determine nature of API and structure of what is returned from those endpoints


class LocationSchema(ModelSchema):
    class Meta:
        model = Location
        fields = ('id', 'name')


class LocationCreationSchema(Schema):
    name: str


class DeviceSchema(ModelSchema):
    location: LocationSchema | None = None

    class Meta:
        model = Device
        fields = ('id', 'name', 'slug', 'location')


class DeviceCreationSchema(Schema):
    name: str
    location_id: int | None = None


class Error(Schema):
    message: str


class DeviceLocationPutSchema(Schema):
    device_slug: str
    location_id: int | None = None
