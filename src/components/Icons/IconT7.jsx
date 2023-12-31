export function IconT7() {
    const isTablet = window.innerWidth <= 1220
    return (
        <>
            {!isTablet ?
                <svg style={{'width': '28vh'}} width="100%" height="100%" viewBox="0 0 324 169" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M322 2H181.205C170.113 2 161.139 11.027 161.205 22.1189L161.947 146.881C162.013 157.973 153.04 167 141.948 167H2"
                        stroke="#ffffff"/>
                    <rect x="324" y="4" width="4" height="4" rx="2" transform="rotate(180 324 4)" fill="#ffffff"/>
                    <rect x="4.5" y="169" width="4" height="4" rx="2" transform="rotate(180 4.5 169)" fill="#ffffff"/>
                </svg> :
                <svg width="139" height="78" viewBox="0 0 139 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 135 4)" fill="#ffffff"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 78)" fill="#ffffff"/>
                    <path d="M137 2H26C12.7452 2 2 12.7452 2 26V77" stroke="#ffffff"/>
                </svg>

            }
        </>
    )
}