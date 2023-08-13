import { FunctionComponent } from "react";
import AppRouter from "containers/AppRouter";
import Header from "./Header/Header";

const AppLayout: FunctionComponent = () => {
    return (
        <div>
            <Header />
            <div className='p-8 bg-purpleLight min-h-[calc(100vh_-_80px)]'>
                <AppRouter />
            </div>
        </div>
    )
}

export default AppLayout
