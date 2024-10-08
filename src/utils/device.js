export const detectDeviceType = () =>
    /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)
        ? 'Mobile'
        : 'Desktop';