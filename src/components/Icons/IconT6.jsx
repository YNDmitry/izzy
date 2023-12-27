export function IconT6() {
    const isTablet = window.innerWidth <= 1024
    return (
        <>
            {!isTablet ?
                <svg width="102" height="134" viewBox="0 0 102 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 2H30.2337C41.2975 2 50.2592 10.9825 50.2337 22.0462L50.0258 111.954C50.0002 123.017 58.962 132 70.0258 132H99"
                        stroke="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 0 4)" fill="#4E4E4E"/>
                    <rect width="4" height="4" rx="2" transform="matrix(1 0 0 -1 98 134)" fill="#4E4E4E"/>
                </svg> :
                <svg width="51" height="190" viewBox="0 0 51 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="186" width="4" height="4" rx="2" fill="#4E4E4E"/>
                    <rect x="47" width="4" height="4" rx="2" fill="#4E4E4E"/>
                    <path d="M2 188V107.5C2 98.6634 9.16344 91.5 18 91.5H33C41.8366 91.5 49 84.3366 49 75.5V2"
                          stroke="#4E4E4E"/>
                </svg>
            }
        </>

    )
}