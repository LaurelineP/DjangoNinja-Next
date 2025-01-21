import Link from "next/link"
import { getDevices } from '../services'
export default async function DevicesPage (){
	const devices = await getDevices()
	return(
		<div className = "flex flex-col items-center">
			<h1>Devices</h1>
			<ul>
				{
					devices.map( device => (
						<li key = {device.id} className = "text-x1 m-2 capitalize">
							<Link href = {`/devices/${device.slug}`}>
								{device.name}
							</Link>	
						</li>
					))
				}
			</ul>
		</div>
	
	)
}
