export function IconT10() {
    const isTablet = window.innerWidth <= 1220
    return (
        <>
            {!isTablet ?
                <svg style={{'width': '16vh'}} width="100%" height="100%" viewBox="0 0 160 178" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.86108 175V22C1.86108 10.9543 10.8154 2 21.8611 2H158.023" stroke="#ffffff"/>
                    <rect width="3.95348" height="4" rx="1.97674" transform="matrix(1 0 0 -1 0 178)" fill="#ffffff"/>
                    <rect width="3.95348" height="4" rx="1.97674" transform="matrix(1 0 0 -1 156.047 4)"
                          fill="#ffffff"/>
                </svg> :
                <svg style={{'width': '10vh', 'marginLeft': '2.5rem'}} width="100%" height="100%" viewBox="0 0 49 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" rx="2" transform="matrix(1 1.74846e-07 1.74846e-07 -1 45 4)"
                          fill="white"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 1.74846e-07 1.74846e-07 -1 0 77)"
                          fill="white"/>
                    <path d="M47 2.00001L26 2C12.7452 2 2 12.7452 2 26L1.99999 77" stroke="white"/>
                </svg>
            }
        </>
    )
}