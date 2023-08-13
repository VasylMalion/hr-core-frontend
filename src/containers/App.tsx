import { FunctionComponent, useEffect } from "react";
import AppLayout from "./AppLayout/AppLayout";
import { Navbar } from "ui-components";
import { useTranslation } from "react-i18next";

const App: FunctionComponent = () => {

  const {t} = useTranslation()

    return <div className='grid grid-cols-[auto_1fr] bg-white'>
      <Navbar />
        <div>
          <AppLayout />
        </div>
    </div>
}

export default App
