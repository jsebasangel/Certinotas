import { useEffect, useState } from "react";
import axios from "axios";

import {
  _id,
  _price,
  _times,
  _company,
  _boolean,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
} from './_mock';

const BACKEND_URL = import.meta.env.VITE_BACKEND;

// ----------------------------------------------------------------------
 export const user = localStorage.getItem("usuario");
 export const username = localStorage.getItem("username");
export const _myAccount = {
  displayName: user,
  email: username,
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users =[...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  company: _company(index),
  isVerified: _boolean(index),
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: index % 4 ? 'active' : 'banned',
  role:
    [
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer',
    ][index] || 'UI Designer',
}));

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    priceSale: setIndex % 3 ? null : _price(index),
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5].includes(setIndex) && 'sale') || ([4, 8, 12].includes(setIndex) && 'new') || '',
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------
function Dashboard() {
  const [estudiantesPorAnio, setEstudiantesPorAnio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/cursos/cantidad-estudiantes-por-anio`);
        setEstudiantesPorAnio(res.data); 
      } catch (error) {
        console.error("Error al traer estudiantes por año:", error);
      }
    };

    fetchData();
  }, []);}
// Generador de IDs
const generateId = (index: number) => `reg-${index + 1}`;

// Método para consumir el servicio y formatear datos para el Timeline
export const getTimelineRegistros = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/Registro/`);
    let registros = response.data;

    // Ordenar por fecha (más recientes primero)
    registros.sort(
      (a: any, b: any) =>
        new Date(b.Fecha_creacion).getTime() - new Date(a.Fecha_creacion).getTime()
    );

    // Tomar solo los 5 primeros
    const top5 = registros.slice(0, 5);

    // Convertir al formato esperado por AnalyticsOrderTimeline
    const timeline = top5.map((item: any, index: number) => ({
      id: generateId(index),
      type: `${index + 1}`, // para colores
      title: `${item.Descripcion} - ${item.Nom_estudiante} (Usuario: ${item.nom_Usuario})`,
      time: item.Fecha_creacion,
    }));

    return timeline;
  } catch (error) {
    console.error("Error al obtener timeline de registros:", error);
    return [];
  }
};

export const _traffic = [
  {
    value: 'facebook',
    label: 'Facebook',
    total: 19500,
    href: 'https://www.facebook.com/COLSANTOTO/',
  },
  {
    value: 'google',
    label: 'Colegio Santo Tomas de aquino',
    total: 91200,
    href: 'https://www.santotomas.edu.co/',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    total: 69800,
    href: 'https://www.linkedin.com/company/colegio-santo-tom%C3%A1s-de-aquino/?originalSubdomain=co',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    total: 84900,
    href: 'https://x.com/colsantoto/status/1488150363853185026',
  },
];

export const _tasks = Array.from({ length: 5 }, (_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'Bienvenido a la aplicación certinotas',
    description: 'Generación de certificados academicos y de notas',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
 
];
