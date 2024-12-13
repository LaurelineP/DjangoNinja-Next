	import Link from "next/link"
export default async function DevicePageLayout({ children }){
	return (
		<>
			<Link href="/devices">
				<button className = "m-5 text-3xl font-bold text-gray-700 bold  bg-[#EEE] rounded-full h-20 hover:shadow-md absolute top-0 left-0">
					←
				</button>
			</Link>
			<div className = "">
				{ children }
			</div>
		</>
	)
}