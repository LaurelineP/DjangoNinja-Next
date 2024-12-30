
from ninja_extra import NinjaExtraAPI, api_controller, route, permissions, throttle
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


api = NinjaExtraAPI()

# ---------------------------------- DEVICES --------------------------------- #
@api.get("/", response=list[DeviceSchema])




@api_controller("/devices", tags = ['Devices'] )
class DeviceController():

	# GET /devices - Gets all devices
	@route.get('/', response = list[DeviceSchema],  permissions = [ permissions.IsAuthenticatedOrReadOnly ])
	@throttle
	def get_devices(self):
		return Device.objects.all()


	# POST /devices - Create a device
	@route.post('/', response={ 201: DeviceSchema, 404: Error })
	def create_one_device(self, request, device: DeviceCreationSchema):
    	# handle error
		if device.location_id:
			location_exists = Location.objects.filter(
				id=device.location_id).exists()
			if not location_exists:
				return 404, {"message": "Location not found"}
		device_data = device.model_dump()  # creates dictionary ( pydantic)
		device_created = Device.objects.create(**device_data)
		return 201, device_created


	# PUT devices/<device-slug>
	@route.put('/', response={200: DeviceSchema, 404: Error})
	def update_one_device(self, request, payload: DeviceLocationPutSchema):
		device = get_object_or_404(Device, slug=payload.device_slug)

		if payload.location_id:
			location_target = get_object_or_404(Location, id=payload.location_id)
			device.location = location_target
		else:
			device.location = None
		device.save()
		return 200, device


	# @route.get('/{slug}', response=list[DeviceSchema])
	# def get_one_device(self, request, slug: str):
	# 	device = get_object_or_404(Device, slug=slug)
	# 	return device


# GET devices/<device-slug>
@api.get("/devices/{slug}/", response=DeviceSchema)
def get_one_device(request, slug: str):
    device = get_object_or_404(Device, slug=slug)
    return device


# --------------------------------- LOCATIONS -------------------------------- #
@api_controller("/locations", tags = ['Locations'], permissions = [])
class LocationController():

	# GET locations/
	@route.get("/", response = list[ LocationSchema ])
	def get_locations(self, request):
		return Location.objects.all()

	# POST locations/
	@route.post("/locations", response = list[ LocationSchema ])
	def create_one_location(self, request, location: LocationCreationSchema):
		try:
			location_data = location.model_dump()  # creates dictionary ( pydantic)
			location_created = Location.objects.create(**location_data)
			return 201, location_created  # query set returning with json
		except:
			return 404, {"message": "location not created"}



api.register_controllers(
	DeviceController,
	LocationController
)