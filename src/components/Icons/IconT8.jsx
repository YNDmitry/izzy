export function IconT8() {
    const isTablet = window.innerWidth <= 1024
    return (
        <>
            {!isTablet ?
                <svg width="92" height="204" viewBox="0 0 92 204" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5395 2L2.05409 181.946C2.02424 193.013 10.9873 202 22.054 202H90" stroke="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0.299805 4)" fill="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 88 204)" fill="#4E4E4E"/>
                </svg> :
                <svg width="50" height="190" viewBox="0 0 50 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="4" width="3.92157" height="4" rx="1.96078" transform="rotate(180 50 4)"
                          fill="#4E4E4E"/>
                    <rect x="3.9209" y="190" width="3.92157" height="4" rx="1.96078" transform="rotate(180 3.9209 190)"
                          fill="#4E4E4E"/>
                    <path
                        d="M48.0391 2V82.5C48.0391 91.3366 40.8756 98.5 32.0391 98.5H17.9606C9.12406 98.5 1.96063 105.663 1.96063 114.5V188"
                        stroke="#4E4E4E"/>
                </svg>
            }
        </>
    )
}