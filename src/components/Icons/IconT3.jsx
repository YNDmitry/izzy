export function IconT3() {
    const isTablet = window.innerWidth <= 1220
    return (
        <>
            {!isTablet
                ? <svg style={{'width': '25vh'}} width="100%" height="100%" viewBox="0 0 205 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.99999 2H82.4003C93.5126 2 102.494 11.0585 102.4 22.1704L102.13 53.8296C102.035 64.9415 111.017 74 122.129 74H202"
                        stroke="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 201 76)" fill="#ffffff"/>
                </svg>
                : <svg style={{'width': '7vh', 'marginRight': '3.4rem'}} width="100%" height="100%" viewBox="0 0 50 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="186" width="3.9215" height="4" rx="1.96075" fill="white"/>
                    <rect x="46.0781" width="3.9215" height="4" rx="1.96075" fill="white"/>
                    <path
                        d="M1.96094 188L1.96095 107.5C1.96095 98.6634 9.1244 91.5 17.961 91.5L32.0386 91.5C40.8752 91.5 48.0386 84.3366 48.0386 75.5L48.0387 2.00001"
                        stroke="white"/>
                </svg>
            }
        </>
    )
}