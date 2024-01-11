export function IconT5() {
    const isTablet = window.innerWidth <= 1220
    const gradientId = `gradient-${Math.random().toString(16).slice(2)}`
    return (
        <>
            {
                !isTablet
                    ?
                    <svg style={{'width': '12vw'}} width="100%" height="100%" viewBox="0 0 207 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M205 2L123.802 2.80394C112.834 2.91253 104 11.8345 104 22.803V187.197C104 198.165 95.1659 207.087 84.198 207.196L3 208"
                            stroke="#ffffff"/>
                        <rect x="207" y="4" width="4" height="4" rx="2" transform="rotate(180 207 4)" fill="#ffffff"/>
                        <rect x="4" y="210" width="4" height="4" rx="2" transform="rotate(180 4 210)" fill="#ffffff"/>
                    </svg>
                    : <svg style={{'width': '5vh'}} width="100%" height="100%" viewBox="0 0 49 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="4" height="4" rx="2" transform="matrix(-1 8.74228e-08 8.74228e-08 1 4 73)"
                              fill="white"/>
                        <rect width="4" height="4" rx="2" transform="matrix(-1 8.74228e-08 8.74228e-08 1 49 0)"
                              fill="white"/>
                        <path d="M2.00001 75L23 75C36.2548 75 47 64.2548 47 51L47 -8.9407e-06" stroke="white"/>
                    </svg>
            }
        </>
    )
}