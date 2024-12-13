# Django Ninja API
from ninja import NinjaAPI
from devices.models import Device, Location
from devices.schemas import (
    DeviceSchema,
    LocationSchema,
    DeviceCreationSchema,
    DeviceLocationPutSchema,
    LocationCreationSchema,
    Error,
)
from django.shortcuts import get_object_or_404


api = NinjaAPI()

# because of response type defined -> this can be converted in JSON
# providing validation of the returned structure and documentation

# ---------------------------------- DEVICES --------------------------------- #

# GET devices


@api.get("/devices", response=list[DeviceSchema])
def get_devices(request):
    return Device.objects.all()  # query set returning with json


# GET devices/<device-slug>


@api.get("/devices/{slug}/", response=DeviceSchema)
def get_one_device(request, slug: str):
    device = get_object_or_404(Device, slug=slug)
    return device


# POST devices/<device-slug>


@api.post("/devices", response={201: DeviceSchema, 404: Error})
def post_one_device(request, device: DeviceCreationSchema):
    # handle error
    if device.location_id:
        location_exists = Location.objects.filter(
            id=device.location_id).exists()
        if not location_exists:
            return 404, {"message": "Location not found"}
    device_data = device.model_dump()  # creates dictionary ( pydantic)
    device_created = Device.objects.create(**device_data)
    return 201, device_created


@api.put('/devices', response={200: DeviceSchema, 404: Error})
def put_one_device_location(request, payload: DeviceLocationPutSchema):

    device = get_object_or_404(Device, slug=payload.device_slug)

    if payload.location_id:
        location_target = get_object_or_404(Location, id=payload.location_id)
        device.location = location_target
    else:
        device.location = None
    device.save()
    return 200, device


# --------------------------------- LOCATIONS -------------------------------- #

# GET locations/
@api.get("/locations", response=list[LocationSchema])
def get_locations(request):
    return Location.objects.all()  # query set returning with json


# GET locations/
@api.post("/locations", response={201: LocationSchema, 404: Error})
def post_one_location(request, location: LocationCreationSchema):
    try:
        location_data = location.model_dump()  # creates dictionary ( pydantic)
        location_created = Location.objects.create(**location_data)
        return 201, location_created  # query set returning with json
    except:
        return 404, {"message": "location not created"}
