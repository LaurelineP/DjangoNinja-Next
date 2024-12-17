'use client'
import { Input } from "@/components/ui/input"
import { Selector } from '@/components/location-selector'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { createDevice } from '@/app/services'
export const DeviceForm = ({ locations }) => {
	const { toast } = useToast()

	// react-hook-form methods
	const methods = useForm()
	const { formState, handleSubmit, register, control, watch, setValue } = methods
	const onSubmit = async data => {
		const res = await createDevice({ name: data.deviceName, location_id: data.deviceLocationId })
		toast({
			title: "Creation",
			description: `Device "${ res.name }" allocated to "${ res.location.name }" created successfully`
		})
		methods.reset()
	}

	const dirtyFields = Object.values( formState.dirtyFields )
	const isDisabled =  !(dirtyFields.length === 2 && dirtyFields.every(Boolean))

	return (
		<form onSubmit = { handleSubmit( onSubmit ) } className="flex flex-col">
		{/* DEVICE - creation card */}
			<Input
				{...register('deviceName')}
				className	= "bg-white w-auto text-[#777]"
				type		= "text"
				placeholder	= "device name" />
			<Controller
				name 			= 'deviceLocationId'
				control			= { control }
				defaultValue	= { null }
				render			= {({ field }) => (
					<Selector
						{ ...field }
						options 	= { locations }
						placeholder = { 'Please select a location'}
					/>
				)}
			/>
			
			<Input type = "submit" className="bg-valid p-2" disabled = { isDisabled }/>
		</form>

	)
}