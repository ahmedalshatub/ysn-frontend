export type TicketStatus = 'pending' | 'in-progress' | 'approved' | 'rejected' | 'resolved' | 'closed';
export type TicketPriority = 'high' | 'medium' | 'low';
export type TicketCategory = 'bug' | 'feature' | 'support' | 'inquiry';

export interface TicketComment {
  id: number;
  ticketId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface TicketAttachment {
  id: number;
  ticketId: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface TicketHistoryItem {
  id: number;
  ticketId: number;
  action: string;
  description: string;
  performedBy: string;
  performedAt: string;
}

export interface Ticket {
  id: number;
  ticketNumber: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  assignedTo: string;
  assignedToAvatar?: string;
  createdBy: string;
  createdByAvatar?: string;
  createdAt: string;
  updatedAt: string;
  comments: TicketComment[];
  attachments: TicketAttachment[];
  history: TicketHistoryItem[];
}

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000).toISOString();

export const mockTickets: Ticket[] = [
  {
    id: 1,
    ticketNumber: 'TKT-001',
    title: 'Login page not loading on mobile devices',
    description: 'Users report that the login page fails to render correctly on mobile browsers (iOS Safari and Android Chrome). The form fields are overlapping and the submit button is not visible. This issue started after the latest deployment on March 15th.',
    status: 'in-progress',
    priority: 'high',
    category: 'bug',
    assignedTo: 'Ahmed Hassan',
    assignedToAvatar: undefined,
    createdBy: 'Sarah Johnson',
    createdByAvatar: undefined,
    createdAt: daysAgo(5),
    updatedAt: hoursAgo(3),
    comments: [
      {
        id: 1, ticketId: 1, userId: 1,
        userName: 'Sarah Johnson',
        content: 'I have attached a screenshot showing the issue on iPhone 14.',
        imageUrl: 'https://placehold.co/600x400/e2e8f0/64748b?text=Mobile+Bug+Screenshot',
        createdAt: daysAgo(5),
      },
      {
        id: 2, ticketId: 1, userId: 2,
        userName: 'Ahmed Hassan',
        content: 'I can reproduce the issue. It seems related to the CSS viewport changes we made. Working on a fix now.',
        createdAt: daysAgo(4),
      },
      {
        id: 3, ticketId: 1, userId: 3,
        userName: 'Mike Chen',
        content: 'Same issue on Samsung Galaxy S23. The layout breaks at 375px width.',
        imageUrl: 'https://placehold.co/600x400/e2e8f0/64748b?text=Samsung+Screenshot',
        createdAt: daysAgo(3),
      },
    ],
    attachments: [
      {
        id: 1, ticketId: 1,
        fileName: 'mobile-bug-report.pdf',
        fileSize: 245000,
        fileType: 'application/pdf',
        fileUrl: '#',
        uploadedBy: 'Sarah Johnson',
        uploadedAt: daysAgo(5),
      },
      {
        id: 2, ticketId: 1,
        fileName: 'console-errors.log',
        fileSize: 12000,
        fileType: 'text/plain',
        fileUrl: '#',
        uploadedBy: 'Ahmed Hassan',
        uploadedAt: daysAgo(4),
      },
    ],
    history: [
      { id: 1, ticketId: 1, action: 'created', description: 'Ticket created', performedBy: 'Sarah Johnson', performedAt: daysAgo(5) },
      { id: 2, ticketId: 1, action: 'assigned', description: 'Assigned to Ahmed Hassan', performedBy: 'System', performedAt: daysAgo(5) },
      { id: 3, ticketId: 1, action: 'status_changed', description: 'Status changed from Pending to In Progress', performedBy: 'Ahmed Hassan', performedAt: daysAgo(4) },
      { id: 4, ticketId: 1, action: 'comment', description: 'Added a comment', performedBy: 'Mike Chen', performedAt: daysAgo(3) },
    ],
  },
  {
    id: 2,
    ticketNumber: 'TKT-002',
    title: 'Add dark mode support for dashboard',
    description: 'Feature request to implement a dark mode toggle for the main dashboard. Should respect system preferences and persist user choice.',
    status: 'pending',
    priority: 'medium',
    category: 'feature',
    assignedTo: 'Unassigned',
    createdBy: 'John Smith',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
    comments: [
      {
        id: 4, ticketId: 2, userId: 4,
        userName: 'John Smith',
        content: 'This would be a great improvement for users who work at night.',
        createdAt: daysAgo(3),
      },
    ],
    attachments: [
      {
        id: 3, ticketId: 2,
        fileName: 'dark-mode-mockup.png',
        fileSize: 580000,
        fileType: 'image/png',
        fileUrl: '#',
        uploadedBy: 'John Smith',
        uploadedAt: daysAgo(3),
      },
    ],
    history: [
      { id: 5, ticketId: 2, action: 'created', description: 'Ticket created', performedBy: 'John Smith', performedAt: daysAgo(3) },
    ],
  },
  {
    id: 3,
    ticketNumber: 'TKT-003',
    title: 'Export report generates corrupted Excel file',
    description: 'When exporting the monthly report to Excel format, the resulting file is corrupted and cannot be opened in Microsoft Excel 2021.',
    status: 'resolved',
    priority: 'high',
    category: 'bug',
    assignedTo: 'Lisa Wang',
    createdBy: 'Tom Brown',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(1),
    comments: [
      {
        id: 5, ticketId: 3, userId: 5,
        userName: 'Tom Brown',
        content: 'The file downloads but Excel says it is corrupted.',
        createdAt: daysAgo(10),
      },
      {
        id: 6, ticketId: 3, userId: 6,
        userName: 'Lisa Wang',
        content: 'Found the issue — the XLSX library was generating invalid headers. Fix deployed.',
        createdAt: daysAgo(1),
      },
    ],
    attachments: [],
    history: [
      { id: 6, ticketId: 3, action: 'created', description: 'Ticket created', performedBy: 'Tom Brown', performedAt: daysAgo(10) },
      { id: 7, ticketId: 3, action: 'assigned', description: 'Assigned to Lisa Wang', performedBy: 'Admin', performedAt: daysAgo(9) },
      { id: 8, ticketId: 3, action: 'status_changed', description: 'Status changed from Pending to In Progress', performedBy: 'Lisa Wang', performedAt: daysAgo(8) },
      { id: 9, ticketId: 3, action: 'status_changed', description: 'Status changed from In Progress to Resolved', performedBy: 'Lisa Wang', performedAt: daysAgo(1) },
    ],
  },
  {
    id: 4,
    ticketNumber: 'TKT-004',
    title: 'Need help with API integration documentation',
    description: 'Looking for updated documentation on the REST API v2 endpoints. The current docs seem outdated.',
    status: 'closed',
    priority: 'low',
    category: 'inquiry',
    assignedTo: 'Support Team',
    createdBy: 'Emily Davis',
    createdAt: daysAgo(15),
    updatedAt: daysAgo(7),
    comments: [
      {
        id: 7, ticketId: 4, userId: 7,
        userName: 'Support Team',
        content: 'The updated documentation is now available at docs.example.com/api/v2',
        createdAt: daysAgo(7),
      },
    ],
    attachments: [
      {
        id: 4, ticketId: 4,
        fileName: 'api-v2-guide.pdf',
        fileSize: 1200000,
        fileType: 'application/pdf',
        fileUrl: '#',
        uploadedBy: 'Support Team',
        uploadedAt: daysAgo(7),
      },
    ],
    history: [
      { id: 10, ticketId: 4, action: 'created', description: 'Ticket created', performedBy: 'Emily Davis', performedAt: daysAgo(15) },
      { id: 11, ticketId: 4, action: 'assigned', description: 'Assigned to Support Team', performedBy: 'System', performedAt: daysAgo(15) },
      { id: 12, ticketId: 4, action: 'status_changed', description: 'Status changed from Pending to Closed', performedBy: 'Support Team', performedAt: daysAgo(7) },
    ],
  },
  {
    id: 5,
    ticketNumber: 'TKT-005',
    title: 'Password reset emails not being received',
    description: 'Multiple users have reported not receiving password reset emails. The email service logs show delivery failures for Gmail addresses.',
    status: 'approved',
    priority: 'high',
    category: 'support',
    assignedTo: 'DevOps Team',
    createdBy: 'Customer Support',
    createdAt: daysAgo(2),
    updatedAt: hoursAgo(6),
    comments: [
      {
        id: 8, ticketId: 5, userId: 8,
        userName: 'Customer Support',
        content: 'We have received 15 reports in the last 24 hours about this issue.',
        createdAt: daysAgo(2),
      },
      {
        id: 9, ticketId: 5, userId: 9,
        userName: 'DevOps Team',
        content: 'Our SMTP relay IP got blacklisted. We are migrating to a new email provider.',
        createdAt: daysAgo(1),
      },
    ],
    attachments: [
      {
        id: 5, ticketId: 5,
        fileName: 'smtp-error-logs.txt',
        fileSize: 34000,
        fileType: 'text/plain',
        fileUrl: '#',
        uploadedBy: 'DevOps Team',
        uploadedAt: daysAgo(1),
      },
    ],
    history: [
      { id: 13, ticketId: 5, action: 'created', description: 'Ticket created', performedBy: 'Customer Support', performedAt: daysAgo(2) },
      { id: 14, ticketId: 5, action: 'assigned', description: 'Assigned to DevOps Team', performedBy: 'Admin', performedAt: daysAgo(2) },
      { id: 15, ticketId: 5, action: 'priority_changed', description: 'Priority changed from Medium to High', performedBy: 'Admin', performedAt: daysAgo(1) },
      { id: 16, ticketId: 5, action: 'status_changed', description: 'Status changed from Pending to Approved', performedBy: 'Admin', performedAt: hoursAgo(6) },
    ],
  },
  {
    id: 6,
    ticketNumber: 'TKT-006',
    title: 'Add bulk import feature for products',
    description: 'Need the ability to import products via CSV/Excel file upload with validation and error reporting.',
    status: 'rejected',
    priority: 'medium',
    category: 'feature',
    assignedTo: 'Product Team',
    createdBy: 'Alex Turner',
    createdAt: daysAgo(8),
    updatedAt: daysAgo(4),
    comments: [
      {
        id: 10, ticketId: 6, userId: 10,
        userName: 'Product Team',
        content: 'This feature is out of scope for Q1. We will reconsider for Q2 planning.',
        createdAt: daysAgo(4),
      },
    ],
    attachments: [],
    history: [
      { id: 17, ticketId: 6, action: 'created', description: 'Ticket created', performedBy: 'Alex Turner', performedAt: daysAgo(8) },
      { id: 18, ticketId: 6, action: 'assigned', description: 'Assigned to Product Team', performedBy: 'System', performedAt: daysAgo(8) },
      { id: 19, ticketId: 6, action: 'status_changed', description: 'Status changed from Pending to Rejected', performedBy: 'Product Team', performedAt: daysAgo(4) },
    ],
  },
];
