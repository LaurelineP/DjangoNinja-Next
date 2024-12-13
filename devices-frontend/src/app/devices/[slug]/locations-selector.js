'use client'
import { useReducer, useRef, useState } from 'react'
import { updateDeviceLocation } from './locations-selector.services'
import { ACTIONS } from './locations-selector.constants'

/* -------------------------------------------------------------------------- */
/*                      Buttons States Default and Setter                     */
/* -------------------------------------------------------------------------- */
const duetButtonsToggleState = {
	isEditing: false,
	firstAction: ACTIONS.EDIT,
	firstStyle: 'bg-primary',
	secondAction: ACTIONS.REMOVE,
	secondStyle: 'bg-lastly'
}

const duetButtonsStateToggleReducer = (state, action) => {
	switch(action.type){
		case ACTIONS.EDIT:
			return {
				isEditing: true,
				firstAction: ACTIONS.SAVE, firstStyle: 'bg-valid',
				secondAction: ACTIONS.CANCEL, secondStyle: 'bg-lastly',
			}
		case ACTIONS.SAVE:
			return {
				isEditing: false,
				firstAction: ACTIONS.EDIT, firstStyle: 'bg-primary',
				secondAction: ACTIONS.REMOVE, secondStyle: 'bg-lastly',
			}
		case ACTIONS.RESET:
			return duetButtonsToggleState
		case ACTIONS.CANCEL:
			return duetButtonsToggleState
		default:
			return {...state}
	}

}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const getDataAttr = (e, field) => e.target?.dataset?.[field] || e.dataset?.[field]

export default function({ details: _details, options, children: children_preSelector }){
	const [details, setDetails] = useState(_details)
	let selectedIdRef = useRef(null).current

	const [
		{
			isEditing,
			firstAction,
			firstStyle,
			secondAction,
			secondStyle
		},
		dispatchActionBehavior
	] = useReducer(duetButtonsStateToggleReducer,duetButtonsToggleState)

	/* ---------------------------- SELECTOR RELATED ---------------------------- */
	const onChange = async( e )=> {
		const selectedOption = e.target.selectedOptions?.[0]
		selectedIdRef = getDataAttr( selectedOption, 'id' )
	}

	const onClick = async (e) => {
		const dataAction = getDataAttr(e, 'action')
		const shouldFetch = dataAction in [ ACTIONS.SAVE, ACTIONS.REMOVE ]

		// Handles persisting updates
		if( shouldFetch ){
			try {
				const updatedData = await updateDeviceLocation({
					device_slug: details.slug,
					location_id: dataAction === ACTIONS.REMOVE
						? null
						: selectedIdRef
				})

				if( updatedData ) setDetails( updatedData )

			} catch (error) { console.error( error )}
		}
		// Handles UI updates
		dispatchActionBehavior({ type: dataAction })
	}
	return(
		<div className = "flex flex-col">
			{ children_preSelector }
			<div className = "flex content-around w-full ">
				{ !isEditing 
				? ( <span className = "p-2.5 text-gray-400 rounded w-[250px] bg-gray-300 cursor-not-allowed">
					{ details.location?.name || 'No location assigned' }</span>
				) : (
				
					<select
						className 		= "p-3 text-black rounded w-[250px]"
						defaultValue	= { details.location?.name || 'Select a location'}
						onChange 		= { onChange }
					>
						{ options.map( option => (
							<option
								key 	= { option.id }
								value 	= { option.name }
								data-id = { option.id }

							>
								{ option.name }
							</option>
						))}
					</select>
				)}
				<div className = "flex gap-2 mx-2">
					<button onClick = {onClick} data-action = { firstAction } className = { firstStyle }>{ firstAction }</button>
					<button onClick = {onClick} data-action = { secondAction } className = { secondStyle }>{ secondAction }</button>
				</div>
			</div>
		</div>
	)
}