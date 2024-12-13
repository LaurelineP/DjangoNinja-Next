'use client'
import { useReducer, useRef, useState } from 'react'

const ACTIONS = {
	EDIT: 'edit',
	SAVE: 'save',

	REMOVE: 'remove',
	CANCEL: 'cancel',

	RESET: 'reset'
}


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
		dispatchPrimaryBehavior
	] = useReducer(duetButtonsStateToggleReducer,duetButtonsToggleState)

	/* ---------------------------- SELECTOR RELATED ---------------------------- */
	const onChange = async( e )=> {
		const selectedOption = e.target.selectedOptions?.[0]
		selectedIdRef = getDataAttr( selectedOption, 'id' )
	}


	/* ----------------------------- BUTTONS RELATED ---------------------------- */
	const handleEdition = (actionType) => {
		dispatchPrimaryBehavior({ type: actionType })
	}

	const handleSaving = async (actionType) => {
		try {
			const res = await fetch(`http://localhost:8000/api/devices/`, {
				method: 'put',
				body: JSON.stringify({
					device_slug: details.slug,
					location_id: selectedIdRef // TODO: dynamic value from option selected
				})
			})
			const newData = await res.json()
			console.log('newData:', newData)
			
			// detailsRef.current = newData
			setDetails(newData)
			
			dispatchPrimaryBehavior({ type: actionType })
			dispatchPrimaryBehavior({ type: ACTIONS.RESET })


		} catch( error ){
			console.error('Error', 'Couln\'t update data')
		}
		// dispatchPrimaryBehavior({ type: actionType })
	}

	const handleRemoval = (actionType) => {
		console.log('removal')
	}

	const handleCancel = actionType => {
		console.log('cancel')
	}

	const actionController = {
		[ACTIONS.EDIT]: handleEdition,
		[ACTIONS.SAVE]: handleSaving,
		[ACTIONS.REMOVE]: handleRemoval,
		[ACTIONS.CANCEL]: handleRemoval,
	}
	const onClick = e => {
		const targetAction = getDataAttr(e, 'action')
		if( targetAction ){
			actionController[targetAction](targetAction)
		}
	}

	/* -------------------------- OTHER ELEMENTS EVENTS ------------------------- */
	const onBlur = () => {
		dispatchPrimaryBehavior({ type: ACTIONS.RESET })
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