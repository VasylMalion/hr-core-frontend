import { FunctionComponent, ReactNode } from "react"

const Loading: FunctionComponent = () => {

  return (
    <div className="w-[1rem] h-[1rem] rounded-full border-[3px]	border-current border-l-[#00000000] animate-loading" />
  )
}

export default Loading

// @keyframes load {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

// .loader {
//   border: 4px solid rgba(255, 255, 255, 0.2);
//   border-left: 4px solid;
//   animation: load 1s infinite linear;
//   border-radius: 50%;
//   width: 25px;
//   height: 25px;
// }