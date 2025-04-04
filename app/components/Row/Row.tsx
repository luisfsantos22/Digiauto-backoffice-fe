'use client'

import { ReactNode } from 'react'

export default function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex xl:flex-row flex-col xl:justify-between items-center w-full gap-10">
      {children}
    </div>
  )
}
