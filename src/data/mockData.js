// hna c'est l'exemple des donnee utiliser 
export const mockStats = {
    totalRooms: 450,
    occupancyRate: 82,
    availableBeds: 81,
    ongoingReservations: 369,
  };
  
  export const mockBuildings = [
    { id: 'A', name: 'Bloc A - Sciences', floors: 5 },
    { id: 'B', name: 'Bloc B - Arts & Lettres', floors: 3 },
    { id: 'C', name: 'Bloc C - Ingénierie', floors: 7 },
    {id:'D',name:'Bloc D-Ismail allouch',floors:2},
  ];
  
  export const mockExampleRooms = [
    { id: 1, x: 100, y: 50, status: 'available' },
    { id: 2, x: 170, y: 50, status: 'occupied' },
    { id: 3, x: 240, y: 50, status: 'occupied' },
    { id: 4, x: 310, y: 50, status: 'maintenance' },
    { id: 5, x: 100, y: 120, status: 'available' },
    { id: 6, x: 170, y: 120, status: 'out-of-service' },
    { id: 7, x: 240, y: 120, status: 'occupied' },
    { id: 8, x: 310, y: 120, status: 'available' },
  ];