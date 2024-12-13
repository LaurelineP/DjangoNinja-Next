import LocationsSelector from './locations-selector';
import { getDevice, getLocations } from './services';

export default async function DevicePage({ params }){
	const [ device, locations ] = await Promise.all([
		getDevice(params.slug),
		getLocations()
	])
	return (
		<div className = "flex flex-col items-center mt-2">
			<h1 className = "text-4xl">Device: {params.slug}</h1>
			<div className = "flex flex-col">
				<p>{ device.name } -  { device.id }</p>
				<LocationsSelector
					details 	= { device }
					options 	= { locations }
				>
					{
						!!device.location
							?  (<p>Current Location:</p>)
							:  (<p>No Location Assigned</p>)
					}
				</LocationsSelector>

			</div>
		</div>
	)
}