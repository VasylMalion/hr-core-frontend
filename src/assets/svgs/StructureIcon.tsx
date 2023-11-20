import { FunctionComponent, memo } from 'react'

type IconProps = {
  className?: string
  onClick?: () => void
}

const StructureIcon: FunctionComponent<IconProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <path d="M12.5 18.9583C12.275 18.9583 12.0666 18.8333 11.9583 18.6417C11.85 18.45 11.85 18.2083 11.9666 18.0167L12.8416 16.5583C13.0166 16.2583 13.4 16.1667 13.7 16.3417C14 16.5167 14.0916 16.9 13.9166 17.2L13.6916 17.575C15.9916 17.0333 17.7166 14.9667 17.7166 12.5C17.7166 12.1583 18 11.875 18.3416 11.875C18.6833 11.875 18.9666 12.1583 18.9666 12.5C18.9583 16.0583 16.0583 18.9583 12.5 18.9583Z" />
      <path d="M1.66663 8.12484C1.32496 8.12484 1.04163 7.8415 1.04163 7.49984C1.04163 3.9415 3.94163 1.0415 7.49996 1.0415C7.72496 1.0415 7.93329 1.1665 8.04163 1.35817C8.14996 1.54984 8.14996 1.7915 8.03329 1.98317L7.15829 3.44984C6.98329 3.7415 6.59996 3.8415 6.29996 3.65817C6.00829 3.48317 5.90829 3.09984 6.09163 2.79984L6.31663 2.42484C4.00829 2.9665 2.29163 5.03317 2.29163 7.49984C2.29163 7.8415 2.00829 8.12484 1.66663 8.12484Z" />
      <path d="M8.89167 11.5418L6.27501 10.1335C6.00001 9.9835 5.66667 9.9835 5.39167 10.1335L2.77501 11.5418C2.58334 11.6418 2.46667 11.8502 2.46667 12.0752C2.46667 12.3002 2.58334 12.5085 2.77501 12.6085L5.39167 14.0168C5.53334 14.0918 5.68334 14.1252 5.83334 14.1252C5.98334 14.1252 6.13334 14.0918 6.27501 14.0168L8.89167 12.6085C9.08334 12.5085 9.20001 12.3002 9.20001 12.0752C9.20001 11.8502 9.07501 11.6502 8.89167 11.5418Z" />
      <path d="M4.95829 14.5082L2.52496 13.2915C2.34163 13.1999 2.12496 13.2082 1.94163 13.3165C1.77496 13.4249 1.66663 13.6165 1.66663 13.8249V16.1249C1.66663 16.5249 1.88329 16.8832 2.24163 17.0582L4.67496 18.2749C4.75829 18.3082 4.84996 18.3332 4.94163 18.3332C5.04996 18.3332 5.15829 18.2999 5.25829 18.2415C5.43329 18.1332 5.54163 17.9415 5.54163 17.7332V15.4332C5.54163 15.0415 5.31663 14.6832 4.95829 14.5082Z" />
      <path d="M9.71667 13.3165C9.54167 13.2082 9.325 13.1999 9.13333 13.2915L6.7 14.5082C6.34167 14.6832 6.125 15.0415 6.125 15.4415V17.7415C6.125 17.9499 6.23333 18.1415 6.40833 18.2499C6.50833 18.2999 6.61667 18.3332 6.725 18.3332C6.81667 18.3332 6.90833 18.3082 6.99167 18.2665L9.425 17.0499C9.78333 16.8749 10 16.5165 10 16.1165V13.8165C10 13.6165 9.89167 13.4249 9.71667 13.3165Z" />
      <path d="M17.225 3.19173L14.6084 1.7834C14.3334 1.6334 14 1.6334 13.725 1.7834L11.1084 3.19173C10.9167 3.29173 10.8 3.50006 10.8 3.72506C10.8 3.95006 10.9167 4.1584 11.1084 4.2584L13.725 5.66673C13.8667 5.74173 14.0167 5.77506 14.1667 5.77506C14.3167 5.77506 14.4667 5.74173 14.6084 5.66673L17.225 4.2584C17.4167 4.1584 17.5334 3.95006 17.5334 3.72506C17.5334 3.49173 17.4084 3.29173 17.225 3.19173Z" />
      <path d="M13.2917 6.1498L10.8583 4.93314C10.675 4.84147 10.4583 4.8498 10.275 4.95814C10.1083 5.06647 10 5.25814 10 5.46647V7.76647C10 8.16647 10.2167 8.5248 10.575 8.6998L13.0083 9.91647C13.0917 9.95814 13.1833 9.98314 13.275 9.98314C13.3833 9.98314 13.4917 9.9498 13.5917 9.89147C13.7667 9.78314 13.875 9.59147 13.875 9.38314V7.08314C13.875 6.68314 13.65 6.3248 13.2917 6.1498Z" />
      <path d="M18.05 4.95814C17.875 4.8498 17.6584 4.84147 17.4667 4.93314L15.0334 6.1498C14.675 6.3248 14.4584 6.68314 14.4584 7.08314V9.38314C14.4584 9.59147 14.5667 9.78314 14.7417 9.89147C14.8417 9.9498 14.95 9.98314 15.0584 9.98314C15.15 9.98314 15.2417 9.95814 15.325 9.91647L17.7584 8.6998C18.1167 8.51647 18.3334 8.15814 18.3334 7.76647V5.46647C18.3334 5.25814 18.225 5.06647 18.05 4.95814Z" />
    </svg>
  )
}

export default memo(StructureIcon)