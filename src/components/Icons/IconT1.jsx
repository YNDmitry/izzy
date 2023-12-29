export function IconT1() {
    const isTablet = window.innerWidth <= 1220
    const gradientId = `gradient-${Math.random().toString(16).slice(2)}`
    return (
        <>
            {!isTablet
                ? <svg style={{'width': '47vh'}} width="100%" height="100%" viewBox="0 0 418 156" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id={gradientId} className={'gradient'} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00FFD8"/>
                            <stop offset="0%" stopColor="#4E4E4E"/>
                        </linearGradient>
                    </defs>
                    <path
                        d="M2 2H190.015C201.126 2 210.107 11.0564 210.014 22.167L209.082 133.833C208.989 144.944 217.97 154 229.081 154H416"
                         stroke={`url(#${gradientId})`}/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 414 156)" fill="#4E4E4E"/>
                </svg>
                : <svg style={{'height': '30vh', width: '30vw'}} width="100%" height="100%"
                       viewBox="0 0 129 221"
                       fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2V199C2 210.046 10.9543 219 22 219H127" stroke="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 125 221)" fill="#4E4E4E"/>
                </svg>}
        </>
    )
}