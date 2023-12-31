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
                : <svg style={{'width': '6vh'}} width="100%" height="100%" viewBox="0 0 51 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2V82.5C2 91.3366 9.16344 98.5 18 98.5H33C41.8366 98.5 49 105.663 49 114.5V188"
                          stroke="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 47 190)" fill="#ffffff"/>
                </svg>
            }
        </>
    )
}