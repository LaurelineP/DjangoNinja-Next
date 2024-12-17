
import { Card } from "@/components/card"
import { getDevices, getLocations } from '../services';
import { DeviceForm } from "./device-form";
import { LocationForm } from "./location-form";
export default async function DashboardPage(){
	const [ device, locations ] = await Promise.all([
		getDevices(),
		getLocations()
	])


	return (
		<main className = "flex flex-col items-center align-center justify-center">
			<div className = "flex flex-wrap justify-center gap-10 p-10 content-center">
				
				{/* DEVICE - creation card */}
				<Card title = "Device" description = "Add a new device" className = "w-[250px] h-[300px]">
					<DeviceForm  locations = {locations}/>
				</Card>

				{/* LOCATION - creation card */}
				<Card title = "Location" description = "Add a new location for devices locations options" className = "w-[250px]">
					<LocationForm />
				</Card>

			</div>
		</main>
	)
}