export interface EmployeeCard {
  id: string;
  name: string;
  position: string;
  department: string;
  employeeId: string;
  email: string;
  phone: string;
  joinDate: string;
  avatar: string;
}

export const mockEmployees: Record<string, EmployeeCard> = {
  '1': {
    id: '1',
    name: 'Ahmed Al-Rashid',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    employeeId: 'EMP-2024-001',
    email: 'ahmed.rashid@company.com',
    phone: '+966 55 123 4567',
    joinDate: '2021-06-15',
    avatar: '',
  },
  '2': {
    id: '2',
    name: 'Sara Al-Fahad',
    position: 'Product Manager',
    department: 'Product',
    employeeId: 'EMP-2024-002',
    email: 'sara.fahad@company.com',
    phone: '+966 55 987 6543',
    joinDate: '2022-01-10',
    avatar: '',
  },
  '3': {
    id: '3',
    name: 'Omar Hassan',
    position: 'UI/UX Designer',
    department: 'Design',
    employeeId: 'EMP-2024-003',
    email: 'omar.hassan@company.com',
    phone: '+966 55 456 7890',
    joinDate: '2023-03-20',
    avatar: '',
  },
};
