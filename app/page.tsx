"use client"

import { useState } from "react"
import Barcode from "@/components/Barcode"

export default function Page() {
  const [codes, setCodes] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [prefix, setPrefix] = useState("")
  const [showText, setShowText] = useState(true)
const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const addCode = () => {
    if (!input.trim()) return

    // Divide por coma o salto de línea
    const newCodes = input
      .split(/[,|\n]/)
      .map(c => c.trim())
      .filter(Boolean)

    // Aplica prefijo solo si está definido
    const prefixed = newCodes.map(c => (prefix ? `${prefix}-${c}` : c))

    setCodes([...codes, ...prefixed])
    setInput("")
  }

  const handlePrint = () => {
    window.print()
  }

  const clearCodes = () => setCodes([])

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Generador de Códigos de Barras</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          addCode()
        }}
        className="flex flex-col gap-3 mb-6 items-center"
      >
        {/* Prefijo opcional */}
        <input
          type="text"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="Prefijo (opcional)"
          className="border p-2 rounded w-80"
        />

        {/* Entrada de códigos */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ejemplo: 12345,67890 o con saltos de línea"
          className="border p-2 rounded w-80 h-32"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showText}
            onChange={() => setShowText(!showText)}
          />
          Mostrar texto debajo
        </label>


        {/* Botones */}
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Agregar
          </button>
          <button type="button" onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded">
            Imprimir
          </button>
          <button type="button" onClick={clearCodes} className="bg-red-600 text-white px-4 py-2 rounded">
            Limpiar
          </button>
        </div>
      </form>

      {/* Área de impresión */}
      <div id="print-area" className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 print:grid-cols-3 print:gap-6">
        {codes.map((code, i) => (
          <div
            key={i}
            onClick={() => setSelectedCode(code)}
            className=" cursor-pointer hover:scale-105 transition flex flex-col items-center justify-center p-2 border rounded-lg shadow-sm bg-white w-[200px] h-[120px] overflow-hidden"
          >
            <Barcode value={code} prefix={prefix} showText={showText} maxHeight={120} />
          </div>



        ))}
         {/* Modal para mostrar en grande */}
      {selectedCode && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          onClick={() => setSelectedCode(null)} // clic afuera para cerrar
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-[90%] max-h-[90%] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // evita que el modal se cierre si haces clic en el código
          >
            <h2 className="text-lg font-semibold mb-2 text-black">Vista ampliada</h2>
            <div className="w-[400px] h-[200px] flex items-center justify-center">
              <Barcode value={selectedCode} prefix={prefix} showText={true} maxHeight={100} />
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:scale-105"
              onClick={() => setSelectedCode(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    
      </div>

    </div>
  )
  
}
