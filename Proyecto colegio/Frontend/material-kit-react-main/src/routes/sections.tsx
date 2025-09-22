import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ResetPasswordPage = lazy(() => import('src/pages/ResetPasswordView'));
export const ActaDeGradoPage = lazy(() => import('src/pages/ActagradoPage'));
export const CertificadoNotas = lazy(() => import('src/pages/CertificadoNotas'));
export const GraduacionCurso = lazy(() => import('src/pages/GraduacionCurso'));
export const CargaMasiva = lazy(() => import('src/pages/CargaMasiva'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

// ----------------------------------------------------------------------

export const routesSection: RouteObject[] = [
  // 👉 Ahora la raíz "/" abre el login con AuthLayout
  {
    path: '/',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  // 👉 Ahora la raíz "/" abre el login con AuthLayout
  {
    path: '/ResetPassword',
    element: (
      <AuthLayout>
        <ResetPasswordPage />
      </AuthLayout>
    ),
  },
  // 👉 El dashboard queda en /dashboard
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'Gestion_de_certificados', element: <UserPage /> },
      { path: 'Generacion_Manual', element: <ActaDeGradoPage /> },
      { path: 'CertificadoNotas', element: <CertificadoNotas /> },
      { path: 'GraduacionCurso', element: <GraduacionCurso/> },
      { path: 'CargaMasiva', element: <CargaMasiva/> },
      
    ],
  },
  // 👉 Página 404
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
