
export interface Student {
    name: string;
    image: string;
    roll: string;
    id: string;
    courseCategory: string;
    registrationDate: string;
    credits: number;
  }
  
  const students: Student[] = [
    {
      name: "Amina Rahman",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      roll: "A101",
      id: "20241001",
      courseCategory: "Computer Science",
      registrationDate: "2023-09-15",
      credits: 24,
    },
    {
      name: "Kabir Ahmed",
      image: "https://randomuser.me/api/portraits/men/31.jpg",
      roll: "B102",
      id: "20241002",
      courseCategory: "Physics",
      registrationDate: "2023-08-10",
      credits: 18,
    },
    {
      name: "Maya Khan",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      roll: "C103",
      id: "20241003",
      courseCategory: "Mathematics",
      registrationDate: "2023-07-20",
      credits: 22,
    },
    {
      name: "Asif Islam",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      roll: "D104",
      id: "20241004",
      courseCategory: "Chemistry",
      registrationDate: "2023-06-30",
      credits: 20,
    },
    {
      name: "Nusrat Jahan",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      roll: "E105",
      id: "20241005",
      courseCategory: "Biology",
      registrationDate: "2023-05-25",
      credits: 19,
    },
    {
      name: "Rashed Chowdhury",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      roll: "F106",
      id: "20241006",
      courseCategory: "English Literature",
      registrationDate: "2023-04-15",
      credits: 15,
    },
  ];
  
  export default students;
  