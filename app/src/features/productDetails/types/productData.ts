export interface ProductDetail {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  brand: string;
  status: 'active' | 'draft' | 'discontinued';
  description: string;

  costPrice: number;
  sellPrice: number;
  discountPercent: number;
  taxPercent: number;
  currency: string;

  inStock: number;
  reserved: number;
  reorderLevel: number;
  unit: string;
  warehouse: string;
  shelf: string;

  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  shippingClass: string;

  supplierName: string;
  supplierPhone: string;
  supplierEmail: string;
  leadTimeDays: number;

  unitsSold: number;
  rating: number;
  reviews: number;
  returnsPercent: number;

  createdAt: string;
  updatedAt: string;
}

export interface SpecEntry {
  label: string;
  value: string;
}

export interface SpecGroup {
  key: string;
  entries: SpecEntry[];
}

export interface ProductVariant {
  id: number;
  sku: string;
  color: string;
  size: string;
  stock: number;
  price: number;
}

export interface PriceHistoryEntry {
  id: number;
  date: string;
  oldPrice: number;
  newPrice: number;
  reason: string;
}

export interface ProductDocument {
  id: number;
  name: string;
  type: string;
  sizeKb: number;
  uploadedAt: string;
}

export interface ProductExtras {
  specGroups: SpecGroup[];
  variants: ProductVariant[];
  priceHistory: PriceHistoryEntry[];
  documents: ProductDocument[];
  certifications: string[];
  warrantyMonths: number;
  warrantyProvider: string;
  countryOfOrigin: string;
  hsCode: string;
  customsDutyPercent: number;
}

export const productDetail: ProductDetail = {
  id: 1042,
  name: 'Aurora 27" 4K Monitor',
  sku: 'MON-AUR-27-4K',
  barcode: '6291041500213',
  category: 'Monitors',
  brand: 'Aurora',
  status: 'active',
  description:
    'A 27-inch 4K IPS display with a 144Hz refresh rate, 95% DCI-P3 coverage and a height-adjustable stand.',

  costPrice: 310000,
  sellPrice: 459000,
  discountPercent: 10,
  taxPercent: 15,
  currency: 'IQD',

  inStock: 148,
  reserved: 23,
  reorderLevel: 40,
  unit: 'piece',
  warehouse: 'Baghdad - Central',
  shelf: 'B-14-3',

  weightKg: 6.4,
  lengthCm: 62,
  widthCm: 24,
  heightCm: 46,
  shippingClass: 'Fragile - oversized',

  supplierName: 'Nova Distribution',
  supplierPhone: '+964 770 123 4567',
  supplierEmail: 'sales@novadist.example',
  leadTimeDays: 12,

  unitsSold: 1863,
  rating: 4.6,
  reviews: 214,
  returnsPercent: 2.1,

  createdAt: '2025-03-18T09:24:00Z',
  updatedAt: '2026-08-30T14:07:00Z',
};
export const productExtras: ProductExtras = {
  specGroups: [
    {
      key: 'display',
      entries: [
        { label: 'panelType', value: 'IPS' },
        { label: 'resolution', value: '3840 x 2160' },
        { label: 'refreshRate', value: '144 Hz' },
        { label: 'responseTime', value: '1 ms (GtG)' },
        { label: 'brightness', value: '400 cd/m2' },
        { label: 'contrastRatio', value: '1000:1' },
        { label: 'colorGamut', value: '95% DCI-P3' },
        { label: 'viewingAngle', value: '178 / 178' },
      ],
    },
    {
      key: 'connectivity',
      entries: [
        { label: 'hdmi', value: '2 x HDMI 2.1' },
        { label: 'displayPort', value: '1 x DisplayPort 1.4' },
        { label: 'usbHub', value: '3 x USB-A 3.2' },
        { label: 'usbC', value: '1 x USB-C (90W PD)' },
        { label: 'audioOut', value: '3.5 mm jack' },
      ],
    },
    {
      key: 'power',
      entries: [
        { label: 'consumptionOn', value: '48 W' },
        { label: 'consumptionStandby', value: '0.4 W' },
        { label: 'voltage', value: '100-240 V' },
        { label: 'energyRating', value: 'E' },
      ],
    },
    {
      key: 'stand',
      entries: [
        { label: 'heightAdjust', value: '130 mm' },
        { label: 'tilt', value: '-5 / +21' },
        { label: 'swivel', value: '-30 / +30' },
        { label: 'pivot', value: '90' },
        { label: 'vesaMount', value: '100 x 100 mm' },
      ],
    },
  ],

  variants: [
    { id: 1, sku: 'MON-AUR-27-4K-BLK', color: 'Black', size: '27"', stock: 86, price: 459000 },
    { id: 2, sku: 'MON-AUR-27-4K-SLV', color: 'Silver', size: '27"', stock: 42, price: 469000 },
    { id: 3, sku: 'MON-AUR-32-4K-BLK', color: 'Black', size: '32"', stock: 20, price: 589000 },
    { id: 4, sku: 'MON-AUR-32-4K-WHT', color: 'White', size: '32"', stock: 0, price: 599000 },
  ],

  priceHistory: [
    { id: 1, date: '2026-08-01T10:00:00Z', oldPrice: 499000, newPrice: 479000, reason: 'seasonalPromo' },
    { id: 2, date: '2026-06-12T10:00:00Z', oldPrice: 479000, newPrice: 499000, reason: 'supplierIncrease' },
    { id: 3, date: '2026-02-20T10:00:00Z', oldPrice: 459000, newPrice: 479000, reason: 'shippingCost' },
    { id: 4, date: '2025-11-05T10:00:00Z', oldPrice: 439000, newPrice: 459000, reason: 'newRevision' },
  ],

  documents: [
    { id: 1, name: 'user-manual-en.pdf', type: 'PDF', sizeKb: 2480, uploadedAt: '2025-03-20T08:00:00Z' },
    { id: 2, name: 'warranty-card.pdf', type: 'PDF', sizeKb: 310, uploadedAt: '2025-03-20T08:02:00Z' },
    { id: 3, name: 'datasheet.xlsx', type: 'XLSX', sizeKb: 96, uploadedAt: '2025-04-02T11:30:00Z' },
    { id: 4, name: 'product-photos.zip', type: 'ZIP', sizeKb: 18440, uploadedAt: '2025-04-02T11:45:00Z' },
  ],

  certifications: ['CE', 'FCC', 'RoHS', 'Energy Star', 'TUV Eye Comfort'],
  warrantyMonths: 36,
  warrantyProvider: 'Nova Distribution',
  countryOfOrigin: 'Taiwan',
  hsCode: '8528.52.00',
  customsDutyPercent: 5,
};
