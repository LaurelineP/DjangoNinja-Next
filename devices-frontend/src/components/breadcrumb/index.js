'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function () {
	/** Django x NextJS - device location
	 * In context paths generations for the dynamic breadcrumb segments
	 */
	const pathname = usePathname()
	const nonDuplicates = [...new Set(pathname.split('/'))]
	const pathsDetails = nonDuplicates.reduce((acc, val, idx) => {
		if( !val || idx === 0 ) acc.push(['Home', '/'])
		else {
			acc.push([
				val, // label
				`${acc.at(-1)[1]}/${val}`.replace('//', '/').toLowerCase() // path
			])
		}
		return acc;
	},[])

	return (
		<Breadcrumb className = "p-5 absolute top-0">
			<BreadcrumbList>
					{pathsDetails.map((pathDetails, idx, self ) => (
						<Fragment key = {`${idx}-${pathDetails[0]}`}>
						
							<BreadcrumbItem className = "text-white/90 capitalize">
								<Link href = {pathDetails[1]}>{pathDetails[0]}</Link>
							</BreadcrumbItem>

							{ !(idx === self.length - 1) && <BreadcrumbSeparator />}
						</Fragment>
					))}
				
			</BreadcrumbList>
		</Breadcrumb>
	
	)
}
