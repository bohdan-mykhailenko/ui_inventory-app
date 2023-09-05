export const orders = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products; }
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products; }
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products; },
  },
  {
    id: 4,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products; },
  },
  {
    id: 5,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() { return products; },
  }
];

export const products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: false,
    isRepairing: false,
    photo: 'pathToFile.jpg',
    title: 'Product 7651',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-12-29 12:09:33'
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 }
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 2,
    serialNumber: 2345,
    isNew: false,
    isRepairing: true,
    photo: 'pathToFile.jpg',
    title: 'Product 221',
    type: 'Phones',
    specification: 'Specification 2',
    guarantee: {
      start: '2018-07-01 10:00:00',
      end: '2019-01-01 10:00:00'
    },
    price: [
      { value: 200, symbol: 'USD', isDefault: 0 },
      { value: 3500, symbol: 'UAH', isDefault: 1 }
    ],
    order: 2,
    date: '2018-07-01 10:00:00'
  },
  {
    id: 3,
    serialNumber: 3456,
    isNew: true,
    isRepairing: false,
    photo: 'pathToFile.jpg',
    title: 'Product With Damage 612',
    type: 'Phones',
    specification: 'Specification 3',
    guarantee: {
      start: '2019-08-15 08:30:00',
      end: '2020-02-15 08:30:00'
    },
    price: [
      { value: 50, symbol: 'USD', isDefault: 0 },
      { value: 1200, symbol: 'UAH', isDefault: 1 }
    ],
    order: 3,
    date: '2019-08-15 08:30:00'
  },
  {
    id: 4,
    serialNumber: 4567,
    isNew: false,
    isRepairing: true,
    photo: 'pathToFile.jpg',
    title: 'Product 423',
    type: 'Laptops',
    specification: 'Specification 4',
    guarantee: {
      start: '2020-03-20 14:45:00',
      end: '2021-03-20 14:45:00'
    },
    price: [
      { value: 800, symbol: 'USD', isDefault: 0 },
      { value: 18000, symbol: 'UAH', isDefault: 1 }
    ],
    order: 4,
    date: '2020-03-20 14:45:00'
  },
  {
    id: 5,
    serialNumber: 5678,
    isNew: true,
    isRepairing: false,
    photo: 'pathToFile.jpg',
    title: 'Product 987',
    type: 'Tablets',
    specification: 'Specification 5',
    guarantee: {
      start: '2021-04-12 09:15:00',
      end: '2022-04-12 09:15:00'
    },
    price: [
      { value: 300, symbol: 'USD', isDefault: 0 },
      { value: 7500, symbol: 'UAH', isDefault: 1 }
    ],
    order: 5,
    date: '2021-04-12 09:15:00'
  },
  {
    id: 6,
    serialNumber: 6789,
    isNew: false,
    isRepairing: false,
    photo: 'pathToFile.jpg',
    title: 'Product 123',
    type: 'Phones',
    specification: 'Specification 6',
    guarantee: {
      start: '2022-05-25 18:30:00',
      end: '2023-05-25 18:30:00'
    },
    price: [
      { value: 400, symbol: 'USD', isDefault: 0 },
      { value: 9500, symbol: 'UAH', isDefault: 1 }
    ],
    order: 6,
    date: '2022-05-25 18:30:00'
  },
  {
    id: 7,
    serialNumber: 7890,
    isNew: false,
    isRepairing: true,
    photo: 'pathToFile.jpg',
    title: 'Product Too Old 789',
    type: 'Monitors',
    specification: 'Specification 7',
    guarantee: {
      start: '2023-06-10 12:00:00',
      end: '2024-06-10 12:00:00'
    },
    price: [
      { value: 20, symbol: 'USD', isDefault: 0 },
      { value: 500, symbol: 'UAH', isDefault: 1 }
    ],
    order: 2,
    date: '2023-06-10 12:00:00'
  },
  {
    id: 8,
    serialNumber: 8901,
    isNew: true,
    isRepairing: false,
    photo: 'pathToFile.jpg',
    title: 'Product Very New 555',
    type: 'Phones',
    specification: 'Specification 8',
    guarantee: {
      start: '2024-07-20 15:30:00',
      end: '2025-07-20 15:30:00'
    },
    price: [
      { value: 600, symbol: 'USD', isDefault: 0 },
      { value: 14000, symbol: 'UAH', isDefault: 1 }
    ],
    order: 8,
    date: '2024-07-20 15:30:00'
  },
  {
    id: 9,
    serialNumber: 9012,
    isNew: false,
    isRepairing: false,
    photo: 'pathToFile.jpg',
    title: 'Product New 333',
    type: 'Tablets',
    specification: 'Specification 9',
    guarantee: {
      start: '2025-08-05 09:00:00',
      end: '2026-08-05 09:00:00'
    },
    price: [
      { value: 150, symbol: 'USD', isDefault: 0 },
      { value: 3600, symbol: 'UAH', isDefault: 1 }
    ],
    order: 9,
    date: '2025-08-05 09:00:00'
  },
  {
    id: 10,
    serialNumber: 1012,
    isNew: true,
    isRepairing: true,
    photo: 'pathToFile.jpg',
    title: 'Product Old 777',
    type: 'Phones',
    specification: 'Specification 10',
    guarantee: {
      start: '2026-09-15 20:00:00',
      end: '2027-09-15 20:00:00'
    },
    price: [
      { value: 700, symbol: 'USD', isDefault: 0 },
      { value: 19000, symbol: 'UAH', isDefault: 1 }
    ],
    order: 10,
    date: '2026-09-15 20:00:00'
  },
];
