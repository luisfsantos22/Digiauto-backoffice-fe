type TextProps = {
  text: string
  styles?: string
  header?: string
  required?: boolean
}

const Text = (props: TextProps) => {
  const {
    text = "",
    styles = "text-digiblack1624-normal",
    header,
    required = false
  } = props

  const requiredSpan = () => {
    return <span className="text-red-800">*</span>
  }

  return header === "h1" ? (
    <h1 className={styles}>
      {required && requiredSpan()}
      {text}
    </h1>
  ) : header === "h2" ? (
    <h2 className={styles}>
      {required && requiredSpan()}
      {text}
    </h2>
  ) : header === "h3" ? (
    <h3 className={styles}>
      {required && requiredSpan()}
      {text}
    </h3>
  ) : (
    <p className={styles}>
      {required && requiredSpan()}
      {text}
    </p>
  )
}

export default Text
