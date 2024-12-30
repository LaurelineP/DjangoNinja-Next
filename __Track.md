Create virtual env and select current interpreter
`python -m venv ./venv-devices`
`source venv-devices/bin/activate`

Update pip and install dependencies
`pip install -U pip`
`pip install django django-ninja django-extensions`

Keep track of tools
`pip freeze > requirements.txt`

Boilerplate for the project
`django-admin startproject device_backend`

Navigates to project for the development
`cd ./device_backend`

Create a project devices
`python ./manage.py startapp devices`

In `./backend_project/devices/models.py`
Define model - here for IOT device
```py
#./backend_project/devices/models.py
import uuid
from django.db import models
from django_extensions.db.fields import AutoSlugField

# Create your models here.


class Location(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Device(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    slug = AutoSlugField(populate_from='name')  # Ex: C02 Sensor -> co2-sensor
    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.name} - {self.id}"
```


In `./backend_project/devices-backend/settings.py`
```py

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
	"devices", # added this 
	"django_extensions" # added this
]
```


DB (SQlite) being defined with model, Create migrations( changes )
In terminal `./manage.py makemigrations`
Once run it outputed: 
```txt
 devices/migrations/0001_initial.py
    + Create model Location
    + Create model Device
```


DB migrations setup -> apply migrations
Add new tables in db
`./manage.py migrate`
```txt
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, devices, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying devices.0001_initial... OK
  Applying sessions.0001_initial... OK
  ```

  # Add devices in django admin - init data
  ./devices_backend/devices/admin.py
  ```py
	from django.contrib import admin
	from devices.models import Device, Location

	# Register your models here.
	admin.site.register(Device)
	admin.site.register(Location)

  ```

  --> need to add a super admin to populate tables
  Creating super admin using command in terminal: 
  ` ./manage.py createsuperuser`
  	```
	Username (leave blank to use 'laurelineparis'): admin
		Email address:
		Password: 123
	Superuser created successfully.
	```

Start server
`./manage.py runserver`
-> navigate to your api to /admin ( http://127.0.0.1:8000/admin/ )

Add data
- add 3 locations first
	- provide name: office / garage / greenhouse

- add 3 devices name ( CO2 Sensor, Temperature Sensor, Proximity Sensor )
- navigate to  http://127.0.0.1:8000/devices page and add devices
	- No need for location


# Build API around these data ( django ninja )   
at ./devices_backend/devices/schemas.py
- need to do schema ~ alike models inherithance with model.Schema
	- create schemas.py
	- import from ninja the `ModelSchema`
	```from ninja import ModelSchema```
```
from ninja import ModelSchema
from devices.models import Device, Location


class LocationSchema(ModelSchema):
    class Meta:
        model = Location
        fields = ('id', 'name')


class DeviceSchema(ModelSchema):
    location: LocationSchema | None = None

    class Meta:
        model = Device
        fields = ('id', 'name', 'slug', 'location')
```

# Create API
- add file backend_devices/devices/api.py
this enables urls for our app ( next step -> devices_backend/devices_backend/urls.py to expose them )
```py
# Django Ninja API
from ninja import NinjaAPI
from devices.models import Device, Location
from devices.schemas import DeviceSchema, LocationSchema


app = NinjaAPI()

# because of response type defined -> this can be converted in JSON
# providing validation of the returned structure and documentation


@api.get("devices/", response=list[DeviceSchema])
def get_devices(request):
    return Device.objects.all()  # query set returning with json


@api.get("locations/", response=list[LocationSchema])
def get_locations(request):
    return Location.objects.all()  # query set returning with json

```


# Expose API
devices_backend/devices_backend/urls.py to expose them 


# continue implementing API
- post device
- post location ( extra )
- patch/put device location

# Install `black` to format our devices folder
`pip install black`
`black ./devices/api.py`



# Prep API for client requests
- `pip install django-cors-headers`
> go to settings and add in installed app
	"corsheaders"
> go to settings and add in middlewares
	"corsheaders.middleware.CorsModdleware",
> go to settings and add ```CORS_ALLOWED_ORIGINS = [
	"http://localhost:3000"
]```



# Frontend with Next
- set nextjs: `npx create-next-app@latest`
- added app router page devices
- run the code `pnpm run dev`
- reminder next
	- server rendering ( default ) > api request possible with caching revalidation fetch
	- client rendering

# Frontend with component tailwind ui
- Install daisyUI
- Config tailwind.config.js
	- plugins to add






	TODO: always unalias python to use only the python from the venv
	- remove temporarily: `unalias python` `unalias python3`




Backend refacto - Controller for BE route
With Django Ninja Extra package 
- with api controller class with route ( leaner )