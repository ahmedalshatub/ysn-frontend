export interface Client {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  nameAr: string;
}

export interface Product {
  id: number;
  name: string;
  nameAr: string;
  categoryId: number;
  barcode: string;
  price: number;
  isHotItem: boolean;
}

export interface InvoiceItem {
  key: string;
  productId: number;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  barcode: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

export const mockClients: Client[] = [
  { id: 1, name: 'Ahmad Al-Rashid', phone: '0501234567', address: 'Riyadh, King Fahd Rd' },
  { id: 2, name: 'Sara Mohammed', phone: '0559876543', address: 'Jeddah, Tahlia St' },
  { id: 3, name: 'Khalid Ibrahim', phone: '0541112233', address: 'Dammam, Corniche Rd' },
  { id: 4, name: 'Fatima Ali', phone: '0567778899', address: 'Makkah, Al Aziziyah' },
  { id: 5, name: 'Omar Hassan', phone: '0533445566', address: 'Madinah, Quba Rd' },
];

export const mockCategories: ProductCategory[] = [
  { id: 1, name: 'Electronics', nameAr: 'إلكترونيات' },
  { id: 2, name: 'Accessories', nameAr: 'إكسسوارات' },
  { id: 3, name: 'Office Supplies', nameAr: 'مستلزمات مكتبية' },
  { id: 4, name: 'Furniture', nameAr: 'أثاث' },
];

export const mockProducts: Product[] = [
  { id: 1, name: 'Laptop', nameAr: 'لابتوب', categoryId: 1, barcode: '1001001', price: 3500, isHotItem: true },
  { id: 2, name: 'Monitor', nameAr: 'شاشة', categoryId: 1, barcode: '1001002', price: 1200, isHotItem: true },
  { id: 3, name: 'Keyboard', nameAr: 'لوحة مفاتيح', categoryId: 2, barcode: '1002001', price: 150, isHotItem: true },
  { id: 4, name: 'Mouse', nameAr: 'ماوس', categoryId: 2, barcode: '1002002', price: 80, isHotItem: true },
  { id: 5, name: 'Headset', nameAr: 'سماعة', categoryId: 2, barcode: '1002003', price: 250, isHotItem: true },
  { id: 6, name: 'Printer', nameAr: 'طابعة', categoryId: 1, barcode: '1001003', price: 900, isHotItem: false },
  { id: 7, name: 'USB Cable', nameAr: 'كيبل USB', categoryId: 2, barcode: '1002004', price: 25, isHotItem: false },
  { id: 8, name: 'Desk', nameAr: 'مكتب', categoryId: 4, barcode: '1004001', price: 800, isHotItem: false },
  { id: 9, name: 'Chair', nameAr: 'كرسي', categoryId: 4, barcode: '1004002', price: 650, isHotItem: false },
  { id: 10, name: 'Notebook', nameAr: 'دفتر', categoryId: 3, barcode: '1003001', price: 15, isHotItem: false },
  { id: 11, name: 'Pen Pack', nameAr: 'علبة أقلام', categoryId: 3, barcode: '1003002', price: 10, isHotItem: false },
  { id: 12, name: 'Webcam', nameAr: 'كاميرا ويب', categoryId: 1, barcode: '1001004', price: 350, isHotItem: false },
];
