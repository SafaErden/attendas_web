export const avatarSizes = {
	xs: 'h-6 w-6',
	sm: 'h-8 w-8',
	md: 'h-10 w-10',
	lg: 'h-12 w-12',
	xl: 'h-14 w-14',
}

interface IAvatarProps {
	src?: string
	size?: keyof typeof avatarSizes
}

export const Avatar = ({
	src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	size = 'md',
}: IAvatarProps) => {
	return <img className={`inline-block ${avatarSizes[size]} rounded-full my-auto`} src={src} />
}
