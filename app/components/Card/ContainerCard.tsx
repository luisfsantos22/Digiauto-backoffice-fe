import { classNames } from "@/utils"

type ContainerCardProps = {
  bg?: string
  padding?: string
  children: any
  onClick?: () => void
  styles?: string
}

export default function ContainerCard(props: ContainerCardProps) {
  const {
    bg = "bg-white",
    padding = "p-[0.625rem]",
    children,
    onClick,
    styles = ""
  } = props
  return (
    <div
      onClick={onClick}
      className={classNames(bg, padding, styles, "rounded-xl")}
    >
      {children}
    </div>
  )
}
