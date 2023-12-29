export function IconT5() {
    const isTablet = window.innerWidth <= 1220
    const gradientId = `gradient-${Math.random().toString(16).slice(2)}`
    return (
        <>
            {
                !isTablet
                    ?
                    <svg width="224" height="210" viewBox="0 0 224 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id={gradientId} className={'gradient'} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00FFD8"/>
                                <stop offset="0%" stopColor="#4E4E4E"/>
                            </linearGradient>
                        </defs>
                        <path
                            d="M205 2L123.802 2.80394C112.834 2.91253 104 11.8345 104 22.803V187.197C104 198.165 95.1659 207.087 84.198 207.196L3 208"
                            stroke={`url(#${gradientId})`}/>
                        <rect x="224" y="4" width="4" height="4" rx="2" transform="rotate(180 224 4)" fill="#4E4E4E"/>
                        <rect x="4" y="210" width="4" height="4" rx="2" transform="rotate(180 4 210)" fill="#4E4E4E"/>
                    </svg>
                    : <svg width="139" height="78" viewBox="0 0 139 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="4" height="4" rx="2" transform="matrix(-1 8.74228e-08 8.74228e-08 1 4 74)"
                              fill="#4E4E4E"/>
                        <rect width="4" height="4" rx="2" transform="matrix(-1 8.74228e-08 8.74228e-08 1 139 0)"
                              fill="#4E4E4E"/>
                        <path d="M2 76L113 76C126.255 76 137 65.2548 137 52L137 1" stroke="#4E4E4E"/>
                    </svg>
            }
        </>
    )
}