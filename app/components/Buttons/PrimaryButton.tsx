import { classNames } from "@/utils/index"

type PrimaryButtonProps = {
  onClick?: () => void
  fullWidth?: boolean
  size?: "small" | "medium" | "large"
  text: string
  type: "submit" | "button"
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { onClick, fullWidth = false, size = "medium", text, type } = props

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        fullWidth && "w-full",
        size === "small"
          ? "px-2 py-1 text-digiblack1212-semibold"
          : size === "medium"
          ? "px-4 py-2 text-digiblack1624-semibold"
          : size === "large" && "px-6 py-3 text-digiblack2025-semibold",
        "flex self-center justify-center items-center cursor-pointer rounded-xl bg-digigold hover:bg-digigold-hover"
      )}
    >
      {text}
    </button>
  )
}

export default PrimaryButton
