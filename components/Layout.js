import 'semantic-ui-css/semantic.min.css'

import NavBar from "./Navbar"

const Layout=({children})=>{
    return(
        <>
            <NavBar />
            {children}
        </>
    )
}

export default Layout