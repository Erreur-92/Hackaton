// Types
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  roomId: string;
  admissionDate: string;
  diagnosis: string;
  treatments: Treatment[];
}

export interface Treatment {
  id: string;
  productId: string;
  productName: string;
  dosage: string;
  frequency: string;
  dailyQuantity: number;
  startDate: string;
  endDate?: string;
}

export interface Room {
  id: string;
  number: string;
  floor: 1 | 2 | 3;
  type: 'standard' | 'double' | 'icu' | 'isolation';
  service: string;
  capacity: number;
  patients: string[];
  position: { x: number; y: number; width: number; height: number };
}

export interface StockForecast {
  productId: string;
  productName: string;
  currentStock: number;
  dailyConsumption: number;
  forecast1Day: number;
  forecast3Days: number;
  forecast1Week: number;
  forecast1Month: number;
  status1Day: 'normal' | 'low' | 'critical';
  status3Days: 'normal' | 'low' | 'critical';
  status1Week: 'normal' | 'low' | 'critical';
  status1Month: 'normal' | 'low' | 'critical';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pharmacien' | 'logisticien' | 'coursier' | 'soins' | 'direction';
  avatar?: string;
  service?: string;
}

export interface Service {
  id: string;
  name: string;
  location: string;
  responsible: string;
  phone: string;
  hours: string;
  deliveryCount: number;
}

export interface Product {
  id: string;
  name: string;
  type: 'medicament' | 'dispositif_medical' | 'produit_sensible';
  lotNumber: string;
  expirationDate: string;
  quantity: number;
  minThreshold: number;
  criticalThreshold: number;
  unit: string;
  status: 'normal' | 'low' | 'critical';
}

export interface Delivery {
  id: string;
  products: { productId: string; productName: string; quantity: number }[];
  packageCount: number;
  temperaturePickup: number;
  temperatureDelivery: number | null;
  pickupTime: string;
  deliveryTime: string | null;
  courier: User;
  recipient: string | null;
  recipientRole: string | null;
  destinationService: Service;
  status: 'pending' | 'in_preparation' | 'in_transit' | 'delivered' | 'incident';
  urgency: 'normal' | 'urgent' | 'critical';
  signature: boolean;
  photoUrl?: string;
  incidentReason?: string;
}

export interface DeliveryRequest {
  id: string;
  requestingService: Service;
  products: { productId: string; productName: string; quantity: number }[];
  urgency: 'normal' | 'urgent' | 'critical';
  status: 'pending' | 'approved' | 'in_preparation' | 'in_transit' | 'delivered' | 'rejected';
  requestedAt: string;
  requestedBy: string;
  assignedCourier?: User;
  notes?: string;
}

export interface Alert {
  id: string;
  type: 'stock_low' | 'temperature' | 'delivery_late' | 'delivery_incomplete';
  message: string;
  severity: 'warning' | 'critical';
  status: 'new' | 'acknowledged' | 'resolved';
  createdAt: string;
  relatedId?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  category: 'delivery' | 'stock' | 'user' | 'request' | 'system';
}

// Mock Users
export const mockUsers: User[] = [
  { id: 'u1', name: 'Dr. Marie Dupont', email: 'marie.dupont@hopital.fr', role: 'pharmacien', service: 'Pharmacie' },
  { id: 'u2', name: 'Jean Martin', email: 'jean.martin@hopital.fr', role: 'logisticien', service: 'Logistique' },
  { id: 'u3', name: 'Pierre Dubois', email: 'pierre.dubois@hopital.fr', role: 'coursier', service: 'Logistique' },
  { id: 'u4', name: 'Sophie Bernard', email: 'sophie.bernard@hopital.fr', role: 'coursier', service: 'Logistique' },
  { id: 'u5', name: 'Anne Lefebvre', email: 'anne.lefebvre@hopital.fr', role: 'soins', service: 'Cardiologie' },
  { id: 'u6', name: 'Luc Moreau', email: 'luc.moreau@hopital.fr', role: 'admin', service: 'Administration' },
  { id: 'u7', name: 'Claire Richard', email: 'claire.richard@hopital.fr', role: 'direction', service: 'Direction Qualité' },
];

// Mock Services
export const mockServices: Service[] = [
  { id: 's1', name: 'Cardiologie', location: 'Bâtiment A, Étage 3', responsible: 'Dr. Laurent', phone: '01 23 45 67 89', hours: '24h/24', deliveryCount: 156 },
  { id: 's2', name: 'Oncologie', location: 'Bâtiment B, Étage 2', responsible: 'Dr. Mercier', phone: '01 23 45 67 90', hours: '24h/24', deliveryCount: 234 },
  { id: 's3', name: 'Urgences', location: 'Bâtiment A, RDC', responsible: 'Dr. Petit', phone: '01 23 45 67 91', hours: '24h/24', deliveryCount: 412 },
  { id: 's4', name: 'Pédiatrie', location: 'Bâtiment C, Étage 1', responsible: 'Dr. Blanc', phone: '01 23 45 67 92', hours: '08h-20h', deliveryCount: 89 },
  { id: 's5', name: 'Neurologie', location: 'Bâtiment B, Étage 4', responsible: 'Dr. Garnier', phone: '01 23 45 67 93', hours: '24h/24', deliveryCount: 123 },
  { id: 's6', name: 'Réanimation', location: 'Bâtiment A, Étage 1', responsible: 'Dr. Faure', phone: '01 23 45 67 94', hours: '24h/24', deliveryCount: 287 },
];

// Mock Products
export const mockProducts: Product[] = [
  { id: 'p1', name: 'Paracétamol 500mg', type: 'medicament', lotNumber: 'LOT2024-001', expirationDate: '2025-12-31', quantity: 1500, minThreshold: 200, criticalThreshold: 50, unit: 'comprimés', status: 'normal' },
  { id: 'p2', name: 'Insuline Rapide', type: 'produit_sensible', lotNumber: 'LOT2024-002', expirationDate: '2025-06-15', quantity: 45, minThreshold: 30, criticalThreshold: 10, unit: 'flacons', status: 'low' },
  { id: 'p3', name: 'Morphine 10mg', type: 'produit_sensible', lotNumber: 'LOT2024-003', expirationDate: '2025-08-20', quantity: 8, minThreshold: 20, criticalThreshold: 5, unit: 'ampoules', status: 'critical' },
  { id: 'p4', name: 'Seringues 5ml', type: 'dispositif_medical', lotNumber: 'LOT2024-004', expirationDate: '2026-03-10', quantity: 2500, minThreshold: 500, criticalThreshold: 100, unit: 'unités', status: 'normal' },
  { id: 'p5', name: 'Amoxicilline 1g', type: 'medicament', lotNumber: 'LOT2024-005', expirationDate: '2025-09-30', quantity: 320, minThreshold: 100, criticalThreshold: 25, unit: 'comprimés', status: 'normal' },
  { id: 'p6', name: 'Héparine 5000UI', type: 'medicament', lotNumber: 'LOT2024-006', expirationDate: '2025-04-15', quantity: 18, minThreshold: 30, criticalThreshold: 10, unit: 'ampoules', status: 'low' },
  { id: 'p7', name: 'Cathéters IV', type: 'dispositif_medical', lotNumber: 'LOT2024-007', expirationDate: '2026-01-20', quantity: 890, minThreshold: 200, criticalThreshold: 50, unit: 'unités', status: 'normal' },
  { id: 'p8', name: 'Vaccin Grippe', type: 'produit_sensible', lotNumber: 'LOT2024-008', expirationDate: '2025-02-28', quantity: 5, minThreshold: 50, criticalThreshold: 10, unit: 'doses', status: 'critical' },
];

// Mock Deliveries
export const mockDeliveries: Delivery[] = [
  {
    id: 'DEL-2024-001',
    products: [{ productId: 'p1', productName: 'Paracétamol 500mg', quantity: 200 }],
    packageCount: 2,
    temperaturePickup: 22,
    temperatureDelivery: 21,
    pickupTime: '2024-01-15T08:30:00',
    deliveryTime: '2024-01-15T08:45:00',
    courier: mockUsers[2],
    recipient: 'Infirmière Durand',
    recipientRole: 'IDE',
    destinationService: mockServices[0],
    status: 'delivered',
    urgency: 'normal',
    signature: true,
  },
  {
    id: 'DEL-2024-002',
    products: [{ productId: 'p2', productName: 'Insuline Rapide', quantity: 10 }, { productId: 'p4', productName: 'Seringues 5ml', quantity: 50 }],
    packageCount: 1,
    temperaturePickup: 5,
    temperatureDelivery: null,
    pickupTime: '2024-01-15T09:15:00',
    deliveryTime: null,
    courier: mockUsers[3],
    recipient: null,
    recipientRole: null,
    destinationService: mockServices[1],
    status: 'in_transit',
    urgency: 'urgent',
    signature: false,
  },
  {
    id: 'DEL-2024-003',
    products: [{ productId: 'p3', productName: 'Morphine 10mg', quantity: 5 }],
    packageCount: 1,
    temperaturePickup: 20,
    temperatureDelivery: null,
    pickupTime: '2024-01-15T09:30:00',
    deliveryTime: null,
    courier: mockUsers[2],
    recipient: null,
    recipientRole: null,
    destinationService: mockServices[2],
    status: 'in_preparation',
    urgency: 'critical',
    signature: false,
  },
  {
    id: 'DEL-2024-004',
    products: [{ productId: 'p5', productName: 'Amoxicilline 1g', quantity: 50 }],
    packageCount: 1,
    temperaturePickup: 21,
    temperatureDelivery: 22,
    pickupTime: '2024-01-15T07:00:00',
    deliveryTime: '2024-01-15T07:25:00',
    courier: mockUsers[3],
    recipient: 'Dr. Martin',
    recipientRole: 'Pharmacien',
    destinationService: mockServices[3],
    status: 'delivered',
    urgency: 'normal',
    signature: true,
  },
  {
    id: 'DEL-2024-005',
    products: [{ productId: 'p6', productName: 'Héparine 5000UI', quantity: 20 }],
    packageCount: 1,
    temperaturePickup: 6,
    temperatureDelivery: 12,
    pickupTime: '2024-01-15T06:30:00',
    deliveryTime: '2024-01-15T07:15:00',
    courier: mockUsers[2],
    recipient: 'Infirmière Leroy',
    recipientRole: 'IDE',
    destinationService: mockServices[5],
    status: 'incident',
    urgency: 'urgent',
    signature: true,
    incidentReason: 'Température hors plage à la livraison (12°C au lieu de 2-8°C)',
  },
];

// Mock Delivery Requests
export const mockDeliveryRequests: DeliveryRequest[] = [
  {
    id: 'REQ-2024-001',
    requestingService: mockServices[0],
    products: [{ productId: 'p1', productName: 'Paracétamol 500mg', quantity: 100 }],
    urgency: 'normal',
    status: 'pending',
    requestedAt: '2024-01-15T10:00:00',
    requestedBy: 'Infirmière Durand',
    notes: 'Réapprovisionnement hebdomadaire',
  },
  {
    id: 'REQ-2024-002',
    requestingService: mockServices[2],
    products: [{ productId: 'p3', productName: 'Morphine 10mg', quantity: 10 }, { productId: 'p4', productName: 'Seringues 5ml', quantity: 20 }],
    urgency: 'critical',
    status: 'approved',
    requestedAt: '2024-01-15T09:45:00',
    requestedBy: 'Dr. Petit',
    assignedCourier: mockUsers[2],
    notes: 'Urgence - Patient en soins palliatifs',
  },
  {
    id: 'REQ-2024-003',
    requestingService: mockServices[4],
    products: [{ productId: 'p7', productName: 'Cathéters IV', quantity: 50 }],
    urgency: 'normal',
    status: 'in_preparation',
    requestedAt: '2024-01-15T08:30:00',
    requestedBy: 'Cadre de santé',
    assignedCourier: mockUsers[3],
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  { id: 'a1', type: 'stock_low', message: 'Stock critique : Morphine 10mg (8 ampoules restantes)', severity: 'critical', status: 'new', createdAt: '2024-01-15T09:00:00', relatedId: 'p3' },
  { id: 'a2', type: 'temperature', message: 'Température hors plage détectée pour livraison DEL-2024-005', severity: 'critical', status: 'acknowledged', createdAt: '2024-01-15T07:15:00', relatedId: 'DEL-2024-005' },
  { id: 'a3', type: 'stock_low', message: 'Stock faible : Insuline Rapide (45 flacons)', severity: 'warning', status: 'new', createdAt: '2024-01-15T08:00:00', relatedId: 'p2' },
  { id: 'a4', type: 'stock_low', message: 'Stock critique : Vaccin Grippe (5 doses restantes)', severity: 'critical', status: 'new', createdAt: '2024-01-15T08:30:00', relatedId: 'p8' },
  { id: 'a5', type: 'delivery_late', message: 'Livraison en retard : DEL-2024-002 (délai dépassé de 15min)', severity: 'warning', status: 'new', createdAt: '2024-01-15T09:45:00', relatedId: 'DEL-2024-002' },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  { id: 'log1', userId: 'u3', userName: 'Pierre Dubois', action: 'Livraison effectuée', details: 'DEL-2024-001 livrée au service Cardiologie', timestamp: '2024-01-15T08:45:00', category: 'delivery' },
  { id: 'log2', userId: 'u1', userName: 'Dr. Marie Dupont', action: 'Validation demande', details: 'REQ-2024-002 validée pour Urgences', timestamp: '2024-01-15T09:50:00', category: 'request' },
  { id: 'log3', userId: 'u2', userName: 'Jean Martin', action: 'Ajustement stock', details: 'Réception de 100 flacons Insuline Rapide', timestamp: '2024-01-15T07:30:00', category: 'stock' },
  { id: 'log4', userId: 'u6', userName: 'Luc Moreau', action: 'Création utilisateur', details: 'Nouveau coursier ajouté : Thomas Lefevre', timestamp: '2024-01-14T16:00:00', category: 'user' },
  { id: 'log5', userId: 'u3', userName: 'Pierre Dubois', action: 'Incident signalé', details: 'Température non conforme pour DEL-2024-005', timestamp: '2024-01-15T07:15:00', category: 'delivery' },
];

// Mock Rooms
export const mockRooms: Room[] = [
  // Étage 1 - Réanimation
  { id: 'r101', number: '101', floor: 1, type: 'icu', service: 'Réanimation', capacity: 1, patients: ['pat1'], position: { x: 10, y: 20, width: 80, height: 60 } },
  { id: 'r102', number: '102', floor: 1, type: 'icu', service: 'Réanimation', capacity: 1, patients: ['pat2'], position: { x: 100, y: 20, width: 80, height: 60 } },
  { id: 'r103', number: '103', floor: 1, type: 'icu', service: 'Réanimation', capacity: 1, patients: ['pat3'], position: { x: 190, y: 20, width: 80, height: 60 } },
  { id: 'r104', number: '104', floor: 1, type: 'icu', service: 'Réanimation', capacity: 1, patients: [], position: { x: 280, y: 20, width: 80, height: 60 } },
  { id: 'r105', number: '105', floor: 1, type: 'standard', service: 'Pédiatrie', capacity: 2, patients: ['pat4', 'pat5'], position: { x: 10, y: 100, width: 80, height: 60 } },
  { id: 'r106', number: '106', floor: 1, type: 'standard', service: 'Pédiatrie', capacity: 2, patients: ['pat6'], position: { x: 100, y: 100, width: 80, height: 60 } },
  { id: 'r107', number: '107', floor: 1, type: 'double', service: 'Pédiatrie', capacity: 2, patients: [], position: { x: 190, y: 100, width: 80, height: 60 } },
  { id: 'r108', number: '108', floor: 1, type: 'isolation', service: 'Pédiatrie', capacity: 1, patients: ['pat7'], position: { x: 280, y: 100, width: 80, height: 60 } },
  
  // Étage 2 - Oncologie
  { id: 'r201', number: '201', floor: 2, type: 'standard', service: 'Oncologie', capacity: 1, patients: ['pat8'], position: { x: 10, y: 20, width: 80, height: 60 } },
  { id: 'r202', number: '202', floor: 2, type: 'standard', service: 'Oncologie', capacity: 1, patients: ['pat9'], position: { x: 100, y: 20, width: 80, height: 60 } },
  { id: 'r203', number: '203', floor: 2, type: 'standard', service: 'Oncologie', capacity: 1, patients: ['pat10'], position: { x: 190, y: 20, width: 80, height: 60 } },
  { id: 'r204', number: '204', floor: 2, type: 'double', service: 'Oncologie', capacity: 2, patients: ['pat11', 'pat12'], position: { x: 280, y: 20, width: 80, height: 60 } },
  { id: 'r205', number: '205', floor: 2, type: 'standard', service: 'Neurologie', capacity: 1, patients: ['pat13'], position: { x: 10, y: 100, width: 80, height: 60 } },
  { id: 'r206', number: '206', floor: 2, type: 'standard', service: 'Neurologie', capacity: 1, patients: ['pat14'], position: { x: 100, y: 100, width: 80, height: 60 } },
  { id: 'r207', number: '207', floor: 2, type: 'double', service: 'Neurologie', capacity: 2, patients: [], position: { x: 190, y: 100, width: 80, height: 60 } },
  { id: 'r208', number: '208', floor: 2, type: 'isolation', service: 'Neurologie', capacity: 1, patients: ['pat15'], position: { x: 280, y: 100, width: 80, height: 60 } },
  
  // Étage 3 - Cardiologie
  { id: 'r301', number: '301', floor: 3, type: 'standard', service: 'Cardiologie', capacity: 1, patients: ['pat16'], position: { x: 10, y: 20, width: 80, height: 60 } },
  { id: 'r302', number: '302', floor: 3, type: 'standard', service: 'Cardiologie', capacity: 1, patients: ['pat17'], position: { x: 100, y: 20, width: 80, height: 60 } },
  { id: 'r303', number: '303', floor: 3, type: 'icu', service: 'Cardiologie', capacity: 1, patients: ['pat18'], position: { x: 190, y: 20, width: 80, height: 60 } },
  { id: 'r304', number: '304', floor: 3, type: 'icu', service: 'Cardiologie', capacity: 1, patients: ['pat19'], position: { x: 280, y: 20, width: 80, height: 60 } },
  { id: 'r305', number: '305', floor: 3, type: 'double', service: 'Cardiologie', capacity: 2, patients: ['pat20', 'pat21'], position: { x: 10, y: 100, width: 80, height: 60 } },
  { id: 'r306', number: '306', floor: 3, type: 'standard', service: 'Cardiologie', capacity: 1, patients: [], position: { x: 100, y: 100, width: 80, height: 60 } },
  { id: 'r307', number: '307', floor: 3, type: 'standard', service: 'Cardiologie', capacity: 1, patients: ['pat22'], position: { x: 190, y: 100, width: 80, height: 60 } },
  { id: 'r308', number: '308', floor: 3, type: 'isolation', service: 'Cardiologie', capacity: 1, patients: [], position: { x: 280, y: 100, width: 80, height: 60 } },
];

// Mock Patients
export const mockPatients: Patient[] = [
  // Réanimation patients
  { id: 'pat1', name: 'Jean Dupont', age: 67, gender: 'M', roomId: 'r101', admissionDate: '2024-01-10', diagnosis: 'Insuffisance respiratoire aiguë', treatments: [
    { id: 't1', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '3x/jour', dailyQuantity: 6, startDate: '2024-01-10' },
    { id: 't2', productId: 'p3', productName: 'Morphine 10mg', dosage: '5mg', frequency: '2x/jour', dailyQuantity: 1, startDate: '2024-01-10' },
  ]},
  { id: 'pat2', name: 'Marie Laurent', age: 72, gender: 'F', roomId: 'r102', admissionDate: '2024-01-12', diagnosis: 'Choc septique', treatments: [
    { id: 't3', productId: 'p5', productName: 'Amoxicilline 1g', dosage: '1g', frequency: '3x/jour', dailyQuantity: 3, startDate: '2024-01-12' },
    { id: 't4', productId: 'p6', productName: 'Héparine 5000UI', dosage: '5000UI', frequency: '2x/jour', dailyQuantity: 2, startDate: '2024-01-12' },
  ]},
  { id: 'pat3', name: 'Pierre Martin', age: 58, gender: 'M', roomId: 'r103', admissionDate: '2024-01-14', diagnosis: 'Post-opératoire cardiaque', treatments: [
    { id: 't5', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '4x/jour', dailyQuantity: 8, startDate: '2024-01-14' },
    { id: 't6', productId: 'p3', productName: 'Morphine 10mg', dosage: '10mg', frequency: '3x/jour', dailyQuantity: 3, startDate: '2024-01-14' },
    { id: 't7', productId: 'p6', productName: 'Héparine 5000UI', dosage: '5000UI', frequency: '1x/jour', dailyQuantity: 1, startDate: '2024-01-14' },
  ]},
  
  // Pédiatrie patients
  { id: 'pat4', name: 'Lucas Petit', age: 8, gender: 'M', roomId: 'r105', admissionDate: '2024-01-13', diagnosis: 'Appendicectomie', treatments: [
    { id: 't8', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '500mg', frequency: '3x/jour', dailyQuantity: 3, startDate: '2024-01-13' },
  ]},
  { id: 'pat5', name: 'Emma Leroy', age: 6, gender: 'F', roomId: 'r105', admissionDate: '2024-01-14', diagnosis: 'Pneumonie', treatments: [
    { id: 't9', productId: 'p5', productName: 'Amoxicilline 1g', dosage: '500mg', frequency: '2x/jour', dailyQuantity: 1, startDate: '2024-01-14' },
    { id: 't10', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '250mg', frequency: '4x/jour', dailyQuantity: 2, startDate: '2024-01-14' },
  ]},
  { id: 'pat6', name: 'Tom Bernard', age: 12, gender: 'M', roomId: 'r106', admissionDate: '2024-01-15', diagnosis: 'Fracture du tibia', treatments: [
    { id: 't11', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '500mg', frequency: '3x/jour', dailyQuantity: 3, startDate: '2024-01-15' },
  ]},
  { id: 'pat7', name: 'Léa Dubois', age: 4, gender: 'F', roomId: 'r108', admissionDate: '2024-01-11', diagnosis: 'Varicelle (isolement)', treatments: [
    { id: 't12', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '200mg', frequency: '3x/jour', dailyQuantity: 2, startDate: '2024-01-11' },
  ]},
  
  // Oncologie patients
  { id: 'pat8', name: 'François Moreau', age: 62, gender: 'M', roomId: 'r201', admissionDate: '2024-01-08', diagnosis: 'Cancer du poumon - chimiothérapie', treatments: [
    { id: 't13', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '4x/jour', dailyQuantity: 8, startDate: '2024-01-08' },
    { id: 't14', productId: 'p3', productName: 'Morphine 10mg', dosage: '10mg', frequency: '4x/jour', dailyQuantity: 4, startDate: '2024-01-08' },
  ]},
  { id: 'pat9', name: 'Isabelle Roux', age: 55, gender: 'F', roomId: 'r202', admissionDate: '2024-01-09', diagnosis: 'Lymphome - traitement', treatments: [
    { id: 't15', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '3x/jour', dailyQuantity: 6, startDate: '2024-01-09' },
  ]},
  { id: 'pat10', name: 'Michel Simon', age: 70, gender: 'M', roomId: 'r203', admissionDate: '2024-01-10', diagnosis: 'Cancer colorectal', treatments: [
    { id: 't16', productId: 'p3', productName: 'Morphine 10mg', dosage: '15mg', frequency: '3x/jour', dailyQuantity: 5, startDate: '2024-01-10' },
    { id: 't17', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '4x/jour', dailyQuantity: 8, startDate: '2024-01-10' },
  ]},
  { id: 'pat11', name: 'Catherine Blanc', age: 48, gender: 'F', roomId: 'r204', admissionDate: '2024-01-12', diagnosis: 'Cancer du sein', treatments: [
    { id: 't18', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '3x/jour', dailyQuantity: 6, startDate: '2024-01-12' },
  ]},
  { id: 'pat12', name: 'Anne Girard', age: 52, gender: 'F', roomId: 'r204', admissionDate: '2024-01-13', diagnosis: 'Cancer du sein', treatments: [
    { id: 't19', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '3x/jour', dailyQuantity: 6, startDate: '2024-01-13' },
  ]},
  
  // Neurologie patients
  { id: 'pat13', name: 'Robert Lefebvre', age: 75, gender: 'M', roomId: 'r205', admissionDate: '2024-01-07', diagnosis: 'AVC ischémique', treatments: [
    { id: 't20', productId: 'p6', productName: 'Héparine 5000UI', dosage: '5000UI', frequency: '2x/jour', dailyQuantity: 2, startDate: '2024-01-07' },
    { id: 't21', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '3x/jour', dailyQuantity: 6, startDate: '2024-01-07' },
  ]},
  { id: 'pat14', name: 'Monique Faure', age: 68, gender: 'F', roomId: 'r206', admissionDate: '2024-01-11', diagnosis: 'Épilepsie', treatments: [
    { id: 't22', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '500mg', frequency: '2x/jour', dailyQuantity: 2, startDate: '2024-01-11' },
  ]},
  { id: 'pat15', name: 'Georges Mercier', age: 80, gender: 'M', roomId: 'r208', admissionDate: '2024-01-06', diagnosis: 'Méningite (isolement)', treatments: [
    { id: 't23', productId: 'p5', productName: 'Amoxicilline 1g', dosage: '2g', frequency: '4x/jour', dailyQuantity: 8, startDate: '2024-01-06' },
    { id: 't24', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '4x/jour', dailyQuantity: 8, startDate: '2024-01-06' },
  ]},
  
  // Cardiologie patients
  { id: 'pat16', name: 'André Rousseau', age: 65, gender: 'M', roomId: 'r301', admissionDate: '2024-01-09', diagnosis: 'Infarctus du myocarde', treatments: [
    { id: 't25', productId: 'p6', productName: 'Héparine 5000UI', dosage: '5000UI', frequency: '2x/jour', dailyQuantity: 2, startDate: '2024-01-09' },
    { id: 't26', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '2x/jour', dailyQuantity: 4, startDate: '2024-01-09' },
  ]},
  { id: 'pat17', name: 'Jeanne Petit', age: 78, gender: 'F', roomId: 'r302', admissionDate: '2024-01-10', diagnosis: 'Insuffisance cardiaque', treatments: [
    { id: 't27', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '500mg', frequency: '3x/jour', dailyQuantity: 3, startDate: '2024-01-10' },
  ]},
  { id: 'pat18', name: 'Paul Richard', age: 71, gender: 'M', roomId: 'r303', admissionDate: '2024-01-14', diagnosis: 'Post-opératoire pontage', treatments: [
    { id: 't28', productId: 'p3', productName: 'Morphine 10mg', dosage: '10mg', frequency: '4x/jour', dailyQuantity: 4, startDate: '2024-01-14' },
    { id: 't29', productId: 'p6', productName: 'Héparine 5000UI', dosage: '5000UI', frequency: '2x/jour', dailyQuantity: 2, startDate: '2024-01-14' },
    { id: 't30', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '4x/jour', dailyQuantity: 8, startDate: '2024-01-14' },
  ]},
  { id: 'pat19', name: 'Sylvie Garnier', age: 63, gender: 'F', roomId: 'r304', admissionDate: '2024-01-15', diagnosis: 'Arythmie sévère', treatments: [
    { id: 't31', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '2x/jour', dailyQuantity: 4, startDate: '2024-01-15' },
  ]},
  { id: 'pat20', name: 'Henri Bonnet', age: 69, gender: 'M', roomId: 'r305', admissionDate: '2024-01-11', diagnosis: 'Angine de poitrine', treatments: [
    { id: 't32', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '3x/jour', dailyQuantity: 6, startDate: '2024-01-11' },
  ]},
  { id: 'pat21', name: 'Lucienne Martin', age: 74, gender: 'F', roomId: 'r305', admissionDate: '2024-01-12', diagnosis: 'Hypertension sévère', treatments: [
    { id: 't33', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '500mg', frequency: '2x/jour', dailyQuantity: 2, startDate: '2024-01-12' },
  ]},
  { id: 'pat22', name: 'Jacques Durand', age: 82, gender: 'M', roomId: 'r307', admissionDate: '2024-01-08', diagnosis: 'Fibrillation auriculaire', treatments: [
    { id: 't34', productId: 'p6', productName: 'Héparine 5000UI', dosage: '5000UI', frequency: '1x/jour', dailyQuantity: 1, startDate: '2024-01-08' },
    { id: 't35', productId: 'p1', productName: 'Paracétamol 500mg', dosage: '1g', frequency: '3x/jour', dailyQuantity: 6, startDate: '2024-01-08' },
  ]},
];

// Calculate stock forecasts based on patient treatments
export function calculateStockForecasts(): StockForecast[] {
  const productConsumption: Record<string, { productName: string; dailyTotal: number }> = {};
  
  mockPatients.forEach(patient => {
    patient.treatments.forEach(treatment => {
      if (!productConsumption[treatment.productId]) {
        productConsumption[treatment.productId] = { productName: treatment.productName, dailyTotal: 0 };
      }
      productConsumption[treatment.productId].dailyTotal += treatment.dailyQuantity;
    });
  });
  
  const getStatus = (stock: number, product: Product): 'normal' | 'low' | 'critical' => {
    if (stock <= product.criticalThreshold) return 'critical';
    if (stock <= product.minThreshold) return 'low';
    return 'normal';
  };
  
  return mockProducts.map(product => {
    const consumption = productConsumption[product.id]?.dailyTotal || 0;
    const current = product.quantity;
    
    const forecast1Day = Math.max(0, current - consumption * 1);
    const forecast3Days = Math.max(0, current - consumption * 3);
    const forecast1Week = Math.max(0, current - consumption * 7);
    const forecast1Month = Math.max(0, current - consumption * 30);
    
    return {
      productId: product.id,
      productName: product.name,
      currentStock: current,
      dailyConsumption: consumption,
      forecast1Day,
      forecast3Days,
      forecast1Week,
      forecast1Month,
      status1Day: getStatus(forecast1Day, product),
      status3Days: getStatus(forecast3Days, product),
      status1Week: getStatus(forecast1Week, product),
      status1Month: getStatus(forecast1Month, product),
    };
  });
}

// Dashboard Stats
export const dashboardStats = {
  deliveriesInProgress: 2,
  deliveriesCompleted: 156,
  incidents: 3,
  criticalStocks: 2,
  complianceRate: 97.5,
  avgDeliveryTime: 18,
  dailyPackages: 45,
  activeAlerts: 5,
};

// Chart data for deliveries per day
export const deliveryChartData = [
  { date: 'Lun', deliveries: 42, incidents: 1 },
  { date: 'Mar', deliveries: 38, incidents: 0 },
  { date: 'Mer', deliveries: 45, incidents: 2 },
  { date: 'Jeu', deliveries: 51, incidents: 1 },
  { date: 'Ven', deliveries: 48, incidents: 0 },
  { date: 'Sam', deliveries: 22, incidents: 0 },
  { date: 'Dim', deliveries: 15, incidents: 1 },
];

// Chart data for stock levels
export const stockChartData = [
  { name: 'Paracétamol', current: 1500, min: 200, critical: 50 },
  { name: 'Insuline', current: 45, min: 30, critical: 10 },
  { name: 'Morphine', current: 8, min: 20, critical: 5 },
  { name: 'Seringues', current: 2500, min: 500, critical: 100 },
  { name: 'Amoxicilline', current: 320, min: 100, critical: 25 },
];
