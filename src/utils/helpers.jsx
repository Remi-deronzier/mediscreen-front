export default function buildFullName(firstName, lastName) {
  return `${firstName} ${lastName.toUpperCase()}`;
}

export function getRandomDoctorName() {
  const doctors = [
    "Dr. Jane Smith",
    "Dr. Michael Johnson",
    "Dr. Samantha Lee",
    "Dr. Christopher Chen",
    "Dr. Rachel Kim",
    "Dr. David Wong",
    "Dr. Emily Davis",
    "Dr. Brian Liu",
    "Dr. Jennifer Brown",
    "Dr. Daniel Ng",
  ];
  const randomIndex = Math.floor(Math.random() * doctors.length);
  return doctors[randomIndex];
}
