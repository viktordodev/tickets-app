import DeleteBlock from "./DeleteBlock"
import PriorityDisplay from "./PriorityDisplay"
import ProgressDisplay from "./ProgressDisplay"
import StatusDisplay from "./StatusDisplay"
import Link from "next/link"

const TicketCard = ({ ticket }) => {
  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
    const date = new Date(timestamp)
    const formatedDate = date.toLocaleString("en-US", options)

    return formatedDate
  }

  return (
    <div className="mb-4 flex flex-col rounded-md bg-card p-4 hover:bg-card-hover">
      <div className="mb-3 flex ">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto flex space-x-2">
          <a href={`/TicketPage/${ticket._id}`} className="hover:text-black">
            Edit
          </a>
          <span>|</span>
          <DeleteBlock id={ticket._id} />
        </div>
      </div>

      <h4 className="mb-2">{ticket.title}</h4>
      <hr className="border-1 mb-2 h-px border-nav " />
      <div className="whitespace-pre-wrap">{ticket.description}</div>
      <div className="flex-grow"></div>
      <div className="mt-2 flex">
        <div className="flex flex-col">
          <p className="my-1 text-xs">{formatTimestamp(ticket.createdAt)}</p>
          <ProgressDisplay progress={ticket.progress} />
        </div>
        <div className="ml-auto flex items-end">
          <StatusDisplay status={ticket.status} />
        </div>
      </div>
    </div>
  )
}

export default TicketCard
