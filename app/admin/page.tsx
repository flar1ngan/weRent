import { StatsLoadingContainer } from "@/components/admin/Loading"
import StatsContainer from "@/components/admin/StatsContainer"
import { Suspense } from "react"


function AdminPage() {
  return (
    <>
    <Suspense fallback={<StatsLoadingContainer/>}>
        <StatsContainer />
    </Suspense>
    </>
  )
}

export default AdminPage