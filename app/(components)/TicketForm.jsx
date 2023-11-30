"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "aplication/json",
      })

      if (!res.ok) {
        throw new Error("Failed to update Ticket")
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "aplication/json",
      })

      if (!res.ok) {
        throw new Error(`${res.statusText} ${await res.text()}`)
      }
    }

    router.refresh()
    router.push("/")
  }
  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const startingTicketData = {
    title: "",
    description: "",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
    status: "not started",
  }

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title
    startingTicketData["description"] = ticket.description
    startingTicketData["priority"] = ticket.priority
    startingTicketData["progress"] = ticket.progress
    startingTicketData["status"] = ticket.status
    startingTicketData["category"] = ticket.category
  }
  const [formData, setFormData] = useState(startingTicketData)
  return (
    <div>
      <div className="flex justify-center">
        <form
          className="pretsdt flex flex-col space-y-2 p-2 pt-2"
          action="post"
          onSubmit={handleSubmit}
        >
          <h3>{EDITMODE ? "Update your ticket" : "Create Your Ticket"}</h3>
          <label className=" text-white" htmlFor="Title">
            Title
          </label>
          <input
            id="title"
            name="title"
            onChange={handleChange}
            value={formData.title}
            required={true}
            type="text"
          />
          <label className="text-white">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={formData.description}
            required={true}
            type="text"
            rows="5"
          />
          <label className="text-white">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Hardware Problem">Hardware Problem</option>
            <option value="Software Problem">Software Problem</option>
            <option value="Project">Project</option>
          </select>
          <div className="flex flex-row space-x-2">
            <label>Priority</label>
            <input
              type="radio"
              id="priority-1"
              name="priority"
              checked={formData.priority == 1}
              value={1}
              onChange={handleChange}
            />
            <input
              type="radio"
              id="priority-2"
              name="priority"
              checked={formData.priority == 2}
              value={2}
              onChange={handleChange}
            />
            <input
              type="radio"
              id="priority-3"
              name="priority"
              checked={formData.priority == 3}
              value={3}
              onChange={handleChange}
            />
            <input
              type="radio"
              id="priority-4"
              name="priority"
              checked={formData.priority == 4}
              value={4}
              onChange={handleChange}
            />
            <input
              type="radio"
              id="priority-5"
              name="priority"
              checked={formData.priority == 5}
              value={5}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="">Progress</label>
          <input
            type="range"
            id="progress"
            name="progress"
            value={formData.progress}
            min="0"
            max="100"
            onChange={handleChange}
          />
          <label htmlFor="">Status</label>
          <select name="status" onChange={handleChange} value={formData.status}>
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>

          <button className="btn" type="submit">
            {EDITMODE ? "Update ticket" : "Create Your Ticket"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TicketForm
