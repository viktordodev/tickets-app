import TicketForm from "@/app/(components)/TicketForm"
const getTicketById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/Tickets/${id}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to get client1")
  }

  return res.json()
}
const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true
  let updateTicketData = {}
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id)
    updateTicketData = updateTicketData.foundTicket
  } else {
    updateTicketData = {
      _id: "new",
    }
  }
  return (
    <div>
      <TicketForm ticket={updateTicketData} />
    </div>
  )
}

export default TicketPage
