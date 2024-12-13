export const updateDeviceLocation = async( payload ) => {
	console.log('payload:', payload)
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
		throw new Error('Update Failed')
	}
}