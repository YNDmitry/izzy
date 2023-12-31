export function IconT10() {
    const isTablet = window.innerWidth <= 1220
    return (
        <>
            {!isTablet ?
                <svg style={{'width': '16vh'}} width="100%" height="100%" viewBox="0 0 160 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.86108 175V22C1.86108 10.9543 10.8154 2 21.8611 2H158.023" stroke="#ffffff"/>
                    <rect width="3.95348" height="4" rx="1.97674" transform="matrix(1 0 0 -1 0 178)" fill="#ffffff"/>
                    <rect width="3.95348" height="4" rx="1.97674" transform="matrix(1 0 0 -1 156.047 4)"
                          fill="#ffffff"/>
                </svg> :
                <svg style={{'width': '13vh'}} width="100%" height="100%" viewBox="0 0 106 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 102 188)" fill="#ffffff"/>
                    <path d="M2 2V89C2 102.255 12.7452 113 26 113H80C93.2548 113 104 123.745 104 137V186"
                          stroke="#ffffff"/>
                </svg>
            }
        </>
    )
}