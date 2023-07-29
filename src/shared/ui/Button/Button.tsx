import { FunctionComponent } from "react"

import styles from "./Button.module.scss"

type ButtonProps = {
  children: any
}


const Button:FunctionComponent<ButtonProps> = ({ children }) => {

  return <button className={styles.root}>
    {children}
  </button>
}