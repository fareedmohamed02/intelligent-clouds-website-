import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { ContactSubmission } from "../models/ContactSubmission";
import { BookingRequest } from "../models/BookingRequest";
import { Ticket } from "../models/Ticket";

export const dashboardAdminRouter = Router();

dashboardAdminRouter.use(requireAuth);

dashboardAdminRouter.get("/", async (_req, res, next) => {
  try {
    const [
      contactsCount,
      bookingsCount,
      openTicketsCount,
      recentContacts,
      recentBookings,
      recentTickets,
    ] = await Promise.all([
      ContactSubmission.countDocuments(),
      BookingRequest.countDocuments(),
      Ticket.countDocuments({ status: { $in: ["new", "in_progress"] } }),
      ContactSubmission.find().sort({ createdAt: -1 }).limit(8).lean(),
      BookingRequest.find().sort({ createdAt: -1 }).limit(8).lean(),
      Ticket.find().sort({ createdAt: -1 }).limit(8).lean(),
    ]);

    type FeedItem = {
      id: string;
      type: "contact" | "booking" | "ticket";
      title: string;
      subtitle: string;
      status: string;
      createdAt: Date | string;
    };

    const feed: FeedItem[] = [
      ...recentContacts.map((item) => ({
        id: String(item._id),
        type: "contact" as const,
        title: item.name,
        subtitle: `${item.company} · ${item.need}`,
        status: item.status,
        createdAt: item.createdAt as Date,
      })),
      ...recentBookings.map((item) => ({
        id: String(item._id),
        type: "booking" as const,
        title: item.name,
        subtitle: `${item.need} · ${item.preferredDate || "flexible"}`,
        status: item.status,
        createdAt: item.createdAt as Date,
      })),
      ...recentTickets.map((item) => ({
        id: String(item._id),
        type: "ticket" as const,
        title: item.subject,
        subtitle: `${item.name} · ${item.tier}`,
        status: item.status,
        createdAt: item.createdAt as Date,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 12);

    res.json({
      success: true,
      data: {
        counts: {
          contacts: contactsCount,
          bookings: bookingsCount,
          openTickets: openTicketsCount,
        },
        recent: feed,
      },
    });
  } catch (err) {
    next(err);
  }
});
