export const ERROR_MESSAGES = {
	required: (name?: string, withYour = false, withThe = true, withPlease = true) =>
		`${withPlease ? 'Please enter' : 'Enter'}${withYour ? ' your' : withThe ? ' the' : ' '} ${name ?? 'this field'}`,
	empty_area: (name: string) => `This field cannot be empty ${name ?? 'this field'}`,
	valid_email: () => 'Please enter a valid email',
	password: () =>
		'Must contain at least, 9 characters, one capital letter, one number and one special character(!@#$%^&*-)',

	passwordSignIn: () => 'Password is not correct',
	password_confirmation: () => 'Passwords must match',
	min: (num: number, name: string) => `${name} must be min. ${num} characters `,
	phone: () => 'Please enter a valid phone number',
}
