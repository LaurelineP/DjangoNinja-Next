'use client'
import { useReducer, useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { updateDeviceLocation } from '../../app/services'
import { ACTIONS } from './locations-selector.constants'
import { useToast } from '@/hooks/use-toast'
import {
	duetButtonsToggleState,
	duetButtonsStateToggleReducer
} from './locations-selector.states'
/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const getDataAttr = (e, field) => e.target?.dataset?.[field] || e.dataset?.[field]


/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */
export default function({
	details: _details,
	options,
	children: children_preSelector,
	placeholder,
	isWithActions = false,
	isDisabled = true
}){

	/** Location selector details [id, name, location_id ] */
	const [details, setDetails] = useState({
		..._details, location : {
			..._details?.location,
			name: _details?.location?.name
		}
	})

	let selectedIdRef = useRef(null).current
	const { toast } = useToast()
	const [
		{
			isEditing,
			firstAction,
			firstStyle,
			secondAction,
			secondStyle,
		},
		dispatchActionBehavior
	] = useReducer(duetButtonsStateToggleReducer, duetButtonsToggleState)
	

	/* ---------------------------- SELECTOR RELATED ---------------------------- */
	const onChange = selectedValue => {
		selectedIdRef = selectedValue
	}

	const onClick = async (e) => {
		const dataAction 	= getDataAttr(e, 'action')
		const shouldFetch 	= [ ACTIONS.SAVE, ACTIONS.REMOVE ].includes(dataAction)

		// Handles persisting updates
		if( shouldFetch ){
			try {
				// Request - updating db
				const updatedData = await updateDeviceLocation({
					device_slug: details.slug,
					location_id: dataAction === ACTIONS.REMOVE || !selectedIdRef
						? null
						: selectedIdRef
				})

				// Toast notification message & trigger - visual feedback for user
				let toastDescription = 'Device Location successfully '
				toastDescription += updatedData.location?.name 
					? `assigned to: ${updatedData.location?.name}.`
					: 'unassigned.'
				toast({
					title: "Update",
					description: toastDescription
				})

				// State update - updating view
				setDetails(updatedData)
			} catch (error) {
				console.error( error )
				toast({
				 	variant: 'destructive',
					title: 'Device Location Update',
					description: 'Update Failed',
				})
			}
		}
		// Handles UI updates
		dispatchActionBehavior({ type: dataAction })
	}
	return(
		<div className = "flex flex-col">
			{ children_preSelector }
			<div className = "flex content-around w-full ">
				{ !isEditing
					// Span with selected value
					? (
						<span className = "p-1.5 w-full bg-white/80 rounded text-black/40 text-sm  px-3 capitalize">
							{details.location?.name || placeholder || 'no location'}
						</span>
					)
					// Selector
					: <Selector
						onChange 	= { onChange }
						options 	= { options }
						isDisabled = { (!isEditing && isWithActions) }
						placeholder = { details.location?.name ?? (placeholder || '') }
					/>
				}
				{
					isWithActions && (
						<div className = "flex gap-2 mx-2">
							<button onClick = {onClick} data-action = { firstAction } className = { firstStyle + ' uppercase' }>{ firstAction }</button>
							<button onClick = {onClick} data-action = { secondAction } className = { secondStyle + ' uppercase' }>{ secondAction }</button>
						</div>
					)
				}
			</div>
		</div>
	)
}



export const Selector = ({ name, options, isDisabled = false, placeholder, onChange, value, ...props }) => {
	const [ selectedValue, setSelectedValue ] = useState()
	
	const _onChange = newValue => {
		!!onChange && onChange(newValue)
		setSelectedValue( newValue )
		return newValue
	}

	return (
		<Select
			swipeDirection	= "up"
			name			= { name }
			onValueChange	= { _onChange }
			disabled		= { isDisabled }
			value			= { value?.toString() || selectedValue?.toString()}
		>
			<SelectTrigger className="rounded text-muted-foreground bg-white font-normal text-[#777] capitalize">
				<SelectValue placeholder={<i>{placeholder}</i>} />
			</SelectTrigger>

			<SelectContent className="bg-white text-muted-foreground">
				{!!options && options?.map(option => (
					<SelectItem
						className="hover:cursor text-[#777] capitalize"
						key={option.id}
						value={option.id.toString()}
					>
						{option.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}