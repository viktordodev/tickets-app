import TicketCard from "./(components)/TicketCard"

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    })

    return res.json()
  } catch (error) {
    console.log("Failed to get tickets", error)
  }
}

const Dashboard = async () => {
  const { tickets } = await getTickets()
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ]
  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, CategoryIndex) => (
            <div className="mb-4" key={CategoryIndex}>
              <h2>{uniqueCategory}</h2>
              <div className="grid-cols-2 lg:grid lg:space-x-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
export default Dashboard
