export const formatLocation = (city: string, state: string, zipCode: string, county: string) => {
	let stateFormat
	if (state && zipCode) {
		stateFormat = `${state} ${zipCode}`
	} else if (state && !zipCode) {
		stateFormat = `${state}`
	} else if (!state && zipCode) {
		stateFormat = `${zipCode}`
	} else {
		stateFormat = undefined
	}
	const currentArr = [city, stateFormat, county].filter((item) => item !== undefined).join(', ')
	return currentArr
}
