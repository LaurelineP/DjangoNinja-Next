export async function getDevice(slug){
	const endpoint = `http://localhost:8000/api/devices/${slug}/`;
	const res = await fetch(endpoint, { cache: 'no-store'})
	return res.json()
}


export async function getLocations(){
	const endpoint = `http://localhost:8000/api/locations`;
	const res = await fetch(endpoint, { cache: 'no-store'})
	return res.json()
}

