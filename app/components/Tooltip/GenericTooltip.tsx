"use client"

import { classNames } from "@/utils"
import { PlacesType, Tooltip } from "react-tooltip"

type GenericTooltipProps = {
  text: string
  width?: string
  styles?: string
  position?: PlacesType
  hidden?: boolean
  anchorSelect: string
  withArrow?: boolean
}

export default function GenericTooltip(props: GenericTooltipProps) {
  const {
    text,
    styles = "text-digiwhite1624-semibold",
    position = "top",
    hidden = false,
    anchorSelect,
    withArrow = true
  } = props

  console.log(hidden, anchorSelect)

  return (
    <Tooltip
      place={position}
      content={text}
      border={"border border-gray-500"}
      className={classNames(styles, "!rounded-xl")}
      hidden={hidden}
      anchorSelect={`#${anchorSelect}`}
      noArrow={!withArrow}
    />
  )
}
