import { Button } from "antd-mobile"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            我是Layout
            <Outlet/>
            <Button color='primary'>antd</Button>
            <div className="purple">
                <Button color='primary'>antd</Button>
            </div>
        </div>
    )
    
}

export default Layout