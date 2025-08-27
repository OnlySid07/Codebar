"use client"

import { useEffect, useRef } from "react"
import JsBarcode from "jsbarcode"

type Props = {
  value: string
  prefix?: string
  showText?: boolean
  format?: string
  width?: number
  maxHeight?: number
}

export default function Barcode({
  value,
  prefix,
  showText = true,
  format = "CODE128",
  width = 2,
  maxHeight = 120, // 👈 alto máximo (igual al de la tarjeta)
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current) {
      const barWidth = value.length > 15 ? 1 : width
      const barHeight = showText ? maxHeight - 20 : maxHeight // deja espacio para texto

      JsBarcode(svgRef.current, value, {
        format,
        width: barWidth,
        height: barHeight,
        displayValue: showText,
        text: prefix ? `${prefix}${value}` : value,
        fontSize: 12, // texto más compacto
        margin: 0,    //  quita espacio extra alrededor
      })

      svgRef.current.setAttribute("width", "100%")
      svgRef.current.setAttribute("height", "100%")
      svgRef.current.setAttribute("preserveAspectRatio", "xMidYMid meet")
    }
  }, [value, prefix, showText, format, width, maxHeight])

  return (
    <svg
      ref={svgRef}
      className="w-full h-full object-contain"
    ></svg>
  )
}
