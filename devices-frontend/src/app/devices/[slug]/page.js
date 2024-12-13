import LocationsSelector from './locations-selector';
import { getDevice, getLocations } from './services';

export default async function DevicePage({ params }){
	const [ device, locations ] = await Promise.all([
		getDevice(params.slug),
		getLocations()
	])
	return (
		<div className = "flex flex-col items-center mt-2">
			<h1 className = "text-4xl mb-12 underline p-2 ">Device: {device.name}</h1>
			<div className = "flex flex-col gap-5">
				<p><b>{ device.name }</b> - <em>{ device.id }</em></p>
				<LocationsSelector
					details 	= { device }
					options 	= { locations }
				>
					<p>Current Location:</p>
				</LocationsSelector>

			</div>
		</div>
		
	)
}