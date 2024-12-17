'use client'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { createLocation } from '@/app/services'

export const LocationForm = ({ locations }) => {

	const { toast } = useToast()
	const methods = useForm()
	const { handleSubmit, register, watch, formState } = methods
	const onSubmit = async data => {
		await createLocation({ name: data.locationName })
		toast({
			title: "Creation",
			description: `Location "${ data.locationName }" created successfully`
		})
		methods.reset()
	}
	const isDisabled = Object.values(formState.dirtyFields).every( v => !v )
	return (
		<form onSubmit = { handleSubmit( onSubmit ) } >
			{/* Location card content - creation */}
			<Input 
				{...register('locationName')}
				type		= "text"
				placeholder = "new location name"
				className	= "bg-white text-[#777]"
			/>
			<Input type = "submit" className="bg-valid p-2" disabled = {isDisabled}/>
		</form>
	)
}