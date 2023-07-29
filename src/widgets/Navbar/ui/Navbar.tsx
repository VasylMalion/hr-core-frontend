import { FunctionComponent, useState } from "react"
import rr from "../../../assets/logo.png"
import rr2 from "../../../assets/logo2.png"
import rr3 from "../../../assets/3.png"
import rr4 from "../../../assets/4.png"

import styles from "./Navbar.module.scss" 
import clsx from "clsx"

type NavbarProps = {
  className?: string
}

const Navbar: FunctionComponent = () => {

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return <div className={ clsx(styles.root, isCollapsed && styles.collapsed)} >
    <div className={styles.container}>
      NavbarS
    <img src={rr4} />
    </div>
    <button onClick={() => setIsCollapsed(prev => !prev)}>Click</button>
  </div>
}

export default Navbar
