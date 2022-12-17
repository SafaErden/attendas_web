export const parsePhone = (phone?: string) => (phone ? phone.replace(/[^A-Z0-9+]/gi, '') : '-')
