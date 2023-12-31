export function IconT4() {
    const isTablet = window.innerWidth <= 1220
    return (
        <>
            {!isTablet
                ? <svg style={{'width': '13vh'}} width="100%" height="100%" viewBox="0 0 106 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M104 102V22C104 10.9543 95.0457 2 84 2H2" stroke="#ffffff"/>
                    <rect x="4" y="4" width="4" height="4" rx="2" transform="rotate(180 4 4)" fill="#ffffff"/>
                    <rect x="106" y="104" width="4" height="4" rx="2" transform="rotate(180 106 104)" fill="#ffffff"/>
                </svg>
                : <svg width="50" height="190" viewBox="0 0 50 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="4" width="3.92157" height="4" rx="1.96078" transform="rotate(180 50 4)"
                          fill="#ffffff"/>
                    <rect x="3.9209" y="190" width="3.92157" height="4" rx="1.96078" transform="rotate(180 3.9209 190)"
                          fill="#ffffff"/>
                    <path
                        d="M48.0391 2V82.5C48.0391 91.3366 40.8756 98.5 32.0391 98.5H17.9606C9.12406 98.5 1.96063 105.663 1.96063 114.5V188"
                        stroke="#ffffff"/>
                </svg>

            }
        </>
    )
}