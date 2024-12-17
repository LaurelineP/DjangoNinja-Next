import { ACTIONS } from "./locations-selector.constants"

/* -------------------------------------------------------------------------- */
/*                      Buttons States Default and Setter                     */
/* -------------------------------------------------------------------------- */
export const duetButtonsToggleState = {
	isEditing: false,
	firstAction: ACTIONS.EDIT,
	firstStyle: 'bg-primary',
	secondAction: ACTIONS.REMOVE,
	secondStyle: 'bg-lastly',
}

export const duetButtonsStateToggleReducer = (state, action) => {
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