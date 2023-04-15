import manAvatar from "../assets/images/avatar-man.png";
import womanAvatar from "../assets/images/avatar-woman.png";

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

export function formatDate(date) {
  const dateLocal = new Date(date);
  const year = dateLocal.getFullYear();
  const month = (dateLocal.getMonth() + 1).toString().padStart(2, "0");
  const day = dateLocal.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;
  return dateString;
}

const sexTypes = {
  M: { label: "Homme", image: manAvatar },
  F: { label: "Femme", image: womanAvatar },
};

export const buildSexLabel = (sex) => {
  return sexTypes[sex].label;
};

export const buildSexAvatar = (sex) => {
  return sexTypes[sex].image;
};
