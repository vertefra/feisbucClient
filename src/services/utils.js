// Date time formatting options

const datetimeOptions = {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}

const createSession = (userId) => {
    sessionStorage['user'] = userId
}



export { datetimeOptions, createSession }