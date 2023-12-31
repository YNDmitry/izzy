export function IconT9() {
    const isTablet = window.innerWidth <= 1220
    return (
        <>
            {!isTablet ?
                <svg style={{'width': '16vh'}} width="100%" height="100%" viewBox="0 0 136 265" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M133.191 263L133.938 22.062C133.972 10.9921 125.008 2 113.938 2H2" stroke="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(-1 0 0 1 135.7 261)" fill="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(-1 0 0 1 4 0)" fill="#ffffff"/>
                </svg> :
                <svg width="62" height="227" viewBox="0 0 62 227" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 58 227)" fill="#ffffff"/>
                    <path d="M60 225V87C60 73.7452 49.2548 63 36 63H26C12.7452 63 2 52.2548 2 39V2" stroke="#ffffff"/>
                </svg>
            }
        </>
    )
}