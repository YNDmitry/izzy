export function IconT10() {
    const isTablet = window.innerWidth <= 1220
    const gradientId = `gradient-${Math.random().toString(16).slice(2)}`
    return (
        <>
            {!isTablet ?
                <svg width="160" height="178" viewBox="0 0 160 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id={gradientId} className={'gradient'} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00FFD8"/>
                            <stop offset="0%" stopColor="#4E4E4E"/>
                        </linearGradient>
                    </defs>
                    <path d="M1.86108 175V22C1.86108 10.9543 10.8154 2 21.8611 2H158.023" stroke={`url(#${gradientId})`}/>
                    <rect width="3.95348" height="4" rx="1.97674" transform="matrix(1 0 0 -1 0 178)" fill="#4E4E4E"/>
                    <rect width="3.95348" height="4" rx="1.97674" transform="matrix(1 0 0 -1 156.047 4)"
                          fill="#4E4E4E"/>
                </svg> :
                <svg width="106" height="188" viewBox="0 0 106 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 102 188)" fill="#4E4E4E"/>
                    <path d="M2 2V89C2 102.255 12.7452 113 26 113H80C93.2548 113 104 123.745 104 137V186"
                          stroke="#4E4E4E"/>
                </svg>
            }
        </>
    )
}