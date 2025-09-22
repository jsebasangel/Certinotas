import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
  children?: NavItem[]; // 🔹 Se agrega para permitir submenús
};

export const navData: NavItem[] = [
  {
    title: 'Datos analiticos',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Gestión de certificados',
    path: '/dashboard/Gestion_de_certificados',
    icon: icon('ic-user'),
  },
  {
    title: 'Cargue Masivo',
    path: '/dashboard/CargaMasiva',
    icon: icon('ic-user'),
  },
  {
    title: 'Generación manual de certificados',
    icon: icon('ic-lock'),
    children: [
      {
        title: 'Certificado de Notas',
        path: '/dashboard/CertificadoNotas',
        icon: icon('ic-user'),
      },
      {
        title: 'Certificado de Graduación',
        path: '/dashboard/GraduacionCurso',
        icon: icon('ic-user'),
      },
      {
        title: 'Acta de Grado',
        path: '/dashboard/Generacion_Manual',
        icon: icon('ic-user'),
      }
    ],
  },
];
