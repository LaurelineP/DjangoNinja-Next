# Django Ninja and Next
Exploring Django Ninja with NextJS with server   
and client components into a small project.

## Project
A project managing iot devices: listing devices  
and assigning them to a location.

Code wise: 
- Server Side: creates a REST API  
( create, read, update operations )
- DB Side: db with 2 tables   
( devices and locations )
- Frontend Side: UI to manage / administrate
devices and their locations

## Stack Details
**Stack List**   
Django Ninja, Django Ninja Extra, Next JS, AnimateJS, Shadcn

Django Ninja is a library on top of django adding extra tooling.
It behaves as an opinionated meta-framework like on top of django,   
providing embedded
- SQLite db and ORM
- Admin dashboard
- API documentation with swagger
- JSON response thanks to schema definitions with validation
- and more…

Next is also a framework but for the frontend part on top of react

## Track and Observations
Django Ninja: Provides a boilerplate ready-to-use environment  
embedding a database, a framework to make a server   
and tools to ease the response transfer for the web.  

### Setup
- Installs Django Ninja & complementary tools
`pip install django django-ninja django-extensions`
- Creates boilerplate through the CLI
`django-admin startproject <project-name>`
Generates a folder & files to adjust if necessary - but ready to use
- Setup the minimum
	```sh
	cd <project-name>
	python ./manage.py startapp <database-folder-name>
	./manage.py makemigrations
	./manage.py migrate
	./manage.py createsuperuser
	./manage.py runserver
	```
`Model`s to define DB
`Schema`s to define the API response based on the Models

__The commands aboves__
- creates a database
- creates the migrations ( anchoring the database tables structure )
- applies the migrations to setup the db
- create a super user so we could administrate data to the db
through the admin back-office ( already created for us )
- then we mount the backend server   
( so we could access the Back-Office as admin to administrate the db )


### Create the REST API
The tools coming with django ninja & other extensions, provides an  
easy API to consume to defines our routes.
The JSON response types and validation is easily done thanks to the models
we defined.
- devices endpoint ( read, creates, updates )
- locations endpoints ( creates, updates )

### Setup and init frontend
Using next cli, we created a boilerplate for the frontend.
It has react server component and client component
Embeds tailwindcss
Added ShadCN for UI

- To enable the CORS request between the server & the client,  
we need to enable the server to receive the requests
```py
CORS_ALLOWED_ORIGINS = [
	"http://localhost:3000"
]
```

The rest are development for the UI.

### Polishing API
Adding controller is done using Django Ninja Extra enabling us  
to control the resources access based on an authentications and some  
permissions embeded tools.


## How to run
__Server__
	- setup venv: `python -m venv <venv-folder-name>`
	- make sure to activate your venv interpreter:  
	`source venv/bin/activate`
	- install packages: `pip install -r requirements.txt`
	- run server: `cd devices_backend && python manage.py runserver`
__Frontend__
	- setup frontend environment: `pnpm install`
	- run frontend: `pnpm dev`

## Navigations 
__Server__ 
	- API documentation: `http://localhost:8000/api/docs`
	- Admin Back Office: `http://localhost:8000/admin`
__Frontend__
	- Home: `http://localhost:3000/`
	- Dashboard: `http://localhost:3000/dashboard`
	- Devices: `http://localhost:3000/devices`
	- Devices/<slug>: `http://localhost:3000/devices/<slug>`
	- Locations: `http://localhost:3000/locations`