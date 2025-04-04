'use client'

import { mainPageActiveTab } from '@/app/atoms'
import { useAtom } from 'jotai'
import WorkshopDashboard from './WorkshopDashboard'

export default function DashboardContent() {
  const [tabActive, setTabActive] = useAtom(mainPageActiveTab)

  return (
    <>
      {tabActive === 'workshop' ? <WorkshopDashboard /> : null}
      {/* Add tab switchers or other UI controls here */}
    </>
  )
}
