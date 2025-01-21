
const API_URL = 'http://localhost:8000/api'

export async function getDevices(){
	const endpoint = `${ API_URL }/devices`
	const res = await fetch(endpoint)
	if( !res.ok ){
		throw new Error('Failed to fetch data')
	}
	return res.json()
}


export async function getDevice( slug ){
	const endpoint = `${ API_URL }/devices/${ slug }`;
	const res = await fetch(endpoint, { cache: 'no-store'})
	return res.json()
}


export async function getLocations(){
	const endpoint = `${ API_URL }/locations`;
	const res = await fetch(endpoint, { cache: 'no-store'})
	return res.json()
}


export const updateDeviceLocation = async( payload ) => {
	try {
		const res = await fetch('http://localhost:8000/api/devices', {
			method: 'put',
			body: JSON.stringify({
				device_slug: payload.device_slug,
				location_id: payload.location_id || null,
			})
		})
		return await res.json()
	
	} catch( error ){
		console.error( error )
		throw new Error('Update Failed')
	}
}

export const createDevice = async( payload ) => {
	try {
		const res = await fetch(`${ API_URL }/devices`, {
			method: 'post',
			body: JSON.stringify(payload)
		})
		return res.json()
	} catch( error ){
		throw new Error('Device Creation Failed')
	}
}

export const createLocation = async( payload ) => {
	try {
		const res = await fetch(`${ API_URL }/locations`, {
			method: 'post',
			body: JSON.stringify(payload)
		})
		return res.json()
	} catch( error ){
		throw new Error('Location Creation Failed')
	}
}