import Link from "next/link"

async function getDevices(){
	const endpoint = 'http://localhost:8000/api/devices'
	const res = await fetch(endpoint)
	if( !res.ok ){
		throw new Error('Failed to fetch data')
	}
	return res.json()
}

export default async function DevicesPage (){
	const devices = await getDevices()
	return(
		<div className = "flex flex-col items-center mt-2">
			<h1 className = "text-4xl">Devices</h1>
			<ul>
				{
					devices.map( device => (
						<li key = {device.id} className="text-x1">
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
