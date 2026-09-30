export interface ClientProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  company: string;
  position: string;
  address: string;
  city: string;
  country: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  items: number;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface Attachment {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

export interface Quotation {
  id: number;
  quotationNumber: string;
  date: string;
  validUntil: string;
  items: number;
  amount: number;
  status: 'accepted' | 'pending' | 'rejected' | 'expired';
}

export interface ReportItem {
  id: number;
  title: string;
  date: string;
  type: 'purchase' | 'payment' | 'refund' | 'note';
  description: string;
  amount?: number;
}

export const mockClient: ClientProfile = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  phone: '+1 (555) 234-5678',
  avatar: '',
  company: 'TechVision Inc.',
  position: 'Chief Technology Officer',
  address: '1234 Innovation Drive, Suite 500',
  city: 'San Francisco',
  country: 'United States',
  joinDate: '2021-03-15',
  totalOrders: 156,
  totalSpent: 48750.00,
  status: 'active',
};

export const mockInvoices: Invoice[] = [
  { id: 1, invoiceNumber: 'INV-2024-001', date: '2024-01-15', items: 5, amount: 2450.00, status: 'paid' },
  { id: 2, invoiceNumber: 'INV-2024-002', date: '2024-02-20', items: 3, amount: 1280.00, status: 'paid' },
  { id: 3, invoiceNumber: 'INV-2024-003', date: '2024-03-10', items: 8, amount: 4500.00, status: 'pending' },
  { id: 4, invoiceNumber: 'INV-2024-004', date: '2024-04-05', items: 2, amount: 890.00, status: 'overdue' },
  { id: 5, invoiceNumber: 'INV-2024-005', date: '2024-05-18', items: 6, amount: 3200.00, status: 'paid' },
  { id: 6, invoiceNumber: 'INV-2024-006', date: '2024-06-22', items: 4, amount: 1750.00, status: 'pending' },
  { id: 7, invoiceNumber: 'INV-2024-007', date: '2024-07-30', items: 10, amount: 5600.00, status: 'paid' },
  { id: 8, invoiceNumber: 'INV-2024-008', date: '2024-08-12', items: 1, amount: 450.00, status: 'overdue' },
];

export const mockAttachments: Attachment[] = [
  { id: 1, name: 'Contract_2024.pdf', type: 'pdf', size: '2.4 MB', uploadedAt: '2024-01-10' },
  { id: 2, name: 'ID_Verification.jpg', type: 'image', size: '1.1 MB', uploadedAt: '2024-01-12' },
  { id: 3, name: 'Tax_Certificate.pdf', type: 'pdf', size: '890 KB', uploadedAt: '2024-02-05' },
  { id: 4, name: 'Company_Logo.png', type: 'image', size: '340 KB', uploadedAt: '2024-03-01' },
  { id: 5, name: 'Purchase_Agreement.docx', type: 'doc', size: '1.8 MB', uploadedAt: '2024-04-15' },
  { id: 6, name: 'Financial_Report_Q1.xlsx', type: 'excel', size: '3.2 MB', uploadedAt: '2024-05-20' },
];

export const mockQuotations: Quotation[] = [
  { id: 1, quotationNumber: 'QT-2024-001', date: '2024-01-05', validUntil: '2024-02-05', items: 4, amount: 3200.00, status: 'accepted' },
  { id: 2, quotationNumber: 'QT-2024-002', date: '2024-02-14', validUntil: '2024-03-14', items: 7, amount: 5800.00, status: 'accepted' },
  { id: 3, quotationNumber: 'QT-2024-003', date: '2024-03-20', validUntil: '2024-04-20', items: 2, amount: 1400.00, status: 'rejected' },
  { id: 4, quotationNumber: 'QT-2024-004', date: '2024-05-10', validUntil: '2024-06-10', items: 5, amount: 4100.00, status: 'pending' },
  { id: 5, quotationNumber: 'QT-2024-005', date: '2024-06-25', validUntil: '2024-07-25', items: 3, amount: 2750.00, status: 'expired' },
  { id: 6, quotationNumber: 'QT-2024-006', date: '2024-08-01', validUntil: '2024-09-01', items: 6, amount: 4900.00, status: 'pending' },
];

export const mockReports: ReportItem[] = [
  { id: 1, title: 'Annual Contract Renewal', date: '2024-08-15', type: 'purchase', description: 'Renewed annual service contract for premium support', amount: 12000.00 },
  { id: 2, title: 'Payment Received', date: '2024-07-30', type: 'payment', description: 'Payment for INV-2024-007', amount: 5600.00 },
  { id: 3, title: 'Partial Refund Issued', date: '2024-06-18', type: 'refund', description: 'Refund for returned items from order #1042', amount: -350.00 },
  { id: 4, title: 'Account Note', date: '2024-05-22', type: 'note', description: 'Customer requested priority shipping for all future orders' },
  { id: 5, title: 'Bulk Purchase', date: '2024-04-10', type: 'purchase', description: 'Bulk order for Q2 inventory restocking', amount: 8500.00 },
  { id: 6, title: 'Payment Received', date: '2024-03-15', type: 'payment', description: 'Payment for INV-2024-002 and INV-2024-001', amount: 3730.00 },
  { id: 7, title: 'Credit Note', date: '2024-02-28', type: 'refund', description: 'Credit note issued for pricing adjustment', amount: -200.00 },
  { id: 8, title: 'Onboarding Complete', date: '2024-01-20', type: 'note', description: 'Customer onboarding and training completed successfully' },
];

export const mockGalleryImages = [
  { src: 'https://picsum.photos/seed/profile1/600/400', alt: 'Product Showcase 1', title: 'Product A' },
  { src: 'https://picsum.photos/seed/profile2/600/400', alt: 'Product Showcase 2', title: 'Product B' },
  { src: 'https://picsum.photos/seed/profile3/600/400', alt: 'Office Visit', title: 'Office' },
  { src: 'https://picsum.photos/seed/profile4/600/400', alt: 'Team Meeting', title: 'Meeting' },
  { src: 'https://picsum.photos/seed/profile5/600/400', alt: 'Warehouse', title: 'Warehouse' },
  { src: 'https://picsum.photos/seed/profile6/600/400', alt: 'Delivery', title: 'Delivery' },
  { src: 'https://picsum.photos/seed/profile7/600/400', alt: 'Event', title: 'Annual Event' },
  { src: 'https://picsum.photos/seed/profile8/600/400', alt: 'Product Launch', title: 'Launch' },
  { src: 'https://picsum.photos/seed/profile9/600/400', alt: 'Conference', title: 'Conference' },
];

export const mockCarouselSlides = [
  { key: 'slide1', image: 'https://picsum.photos/seed/carousel1/1200/500', title: 'Premium Partnership', description: 'Celebrating 3 years of successful collaboration' },
  { key: 'slide2', image: 'https://picsum.photos/seed/carousel2/1200/500', title: 'Product Launch 2024', description: 'Exclusive preview of upcoming product line' },
  { key: 'slide3', image: 'https://picsum.photos/seed/carousel3/1200/500', title: 'Annual Review', description: 'Outstanding performance metrics for the year' },
  { key: 'slide4', image: 'https://picsum.photos/seed/carousel4/1200/500', title: 'Innovation Award', description: 'Recognized as top innovative partner of the year' },
];

export const monthlySalesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [2450, 1280, 4500, 890, 3200, 1750, 5600, 450, 3100, 2800, 4200, 3600],
};

export const monthlyOrdersData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [12, 8, 18, 5, 14, 9, 22, 3, 16, 11, 19, 15],
};

export const ordersCategoryData = [
  { label: 'Electronics', value: 45 },
  { label: 'Software', value: 30 },
  { label: 'Services', value: 15 },
  { label: 'Hardware', value: 10 },
];

export const salesTrendData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  current: [8230, 5840, 9150, 10600],
  previous: [6500, 4900, 7800, 8200],
};
