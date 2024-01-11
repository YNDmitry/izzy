export function IconT4() {
    const isTablet = window.innerWidth <= 1220
    return (
        <>
            {!isTablet
                ? <svg style={{'width': '13vh'}} width="100%" height="100%" viewBox="0 0 106 104" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M104 102V22C104 10.9543 95.0457 2 84 2H2" stroke="#ffffff"/>
                    <rect x="4" y="4" width="4" height="4" rx="2" transform="rotate(180 4 4)" fill="#ffffff"/>
                    <rect x="106" y="104" width="4" height="4" rx="2" transform="rotate(180 106 104)" fill="#ffffff"/>
                </svg>
                : <svg style={{'width': '0.35vh', 'marginLeft': '1rem'}} width="100%" height="100%" viewBox="0 0 4 164" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="white"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 164)" fill="white"/>
                    <path d="M2 2V163.5" stroke="white"/>
                </svg>
            }
        </>
    )
}