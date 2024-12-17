import { Card as CardUI, CardHeader, CardTitle, CardDescription, CardContent  } from "@/components/ui/card"

export function Card ({ title, description, children: content, className  }){
	const cardClss = `flex flex-col bg-black/15 border-none shadow-[#0005] shadow-md content-between ${className}`
	return (
		<CardUI className = {cardClss}>
			{ (!!title || !!description ) && (
				<CardHeader>
					{ !!title && (
						<CardTitle className = "text-[#8557e2]"><h2>{title}</h2></CardTitle>
					)}

					{ !!description && (
						<CardDescription className = "text-slate-100">
							{ description }
						</CardDescription>
					)}
				</CardHeader>
			)}
			<CardContent className = "flex flex-col gap-2 h-full justify-evenly">
				{ content }
			</CardContent>
		</CardUI>
	
	)
}