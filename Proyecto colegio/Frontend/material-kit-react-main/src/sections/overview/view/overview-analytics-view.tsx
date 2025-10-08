import { useEffect, useState } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _traffic } from 'src/_mock';

import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';

import { getTimelineRegistros } from 'src/_mock/_data'; // <--- tu servicio

// ----------------------------------------------------------------------
interface EstudiantesPorAnio {
  year: number;
  cantidad_estudiantes: number;
}
interface CertificadosPorAnio {
  anio: number;
  cantidad_certificados: number;
}

export function OverviewAnalyticsView() {
  const [estudiantesPorAnio, setEstudiantesPorAnio] = useState<EstudiantesPorAnio[]>([]);
  const [Certificadosporanio, setCertificadosPoranio] = useState<CertificadosPorAnio[]>([]);
  const [dataPromedios, setDataPromedios] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 📊 Traer estudiantes por año
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<EstudiantesPorAnio[]>(
          "http://localhost:3000/api/cursos/cantidad/estudiantes"
        );
        setEstudiantesPorAnio(res.data);
      } catch (error) {
        console.error("Error al traer estudiantes por año:", error);
      }
    };
    fetchData();
  }, []);

  // 📊 Traer certificados por año
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resc = await axios.get<CertificadosPorAnio[]>(
          "http://localhost:3000/api/certificados/cantidad/certificados/"
        );
        setCertificadosPoranio(resc.data);
      } catch (error) {
        console.error("Error al traer certificados por año:", error);
      }
    };
    fetchData();
  }, []);

  // 📊 Traer promedio de notas por año
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/materias/promedio/promedio");
        const sortedData = res.data.sort((a, b) => a.Año - b.Año);
        setDataPromedios(sortedData);
      } catch (error) {
        console.error("Error al obtener promedios:", error);
      }
    };
    fetchData();
  }, []);

  // 📊 Timeline de registros
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const data = await getTimelineRegistros();
        setTimeline(data);
      } catch (error) {
        console.error('Error al cargar timeline:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  // 📊 Preparar datos para gráfico de promedio
  const categoriasPromedio = dataPromedios
    .slice(-8)
    .map(item => item.Año.toString());

  const valoresPromedio = dataPromedios
    .slice(-8)
    .map(item => parseFloat(item.Promedio_Nota.toFixed(2)));

  // 📈 Datos estudiantes
  const categorias = estudiantesPorAnio.map((item) => item.year.toString());
  const valores = estudiantesPorAnio.map((item) => item.cantidad_estudiantes);

  // 📈 Datos certificados
  const categoriasC = Certificadosporanio.map((item) => item.anio.toString());
  const valoresc = Certificadosporanio.map((item) => item.cantidad_certificados);

  // 📊 Porcentajes de cambio
  let percent = 0;
  let percentc = 0;
  if (valores.length >= 2) {
    const ultimo = valores[valores.length - 1];
    const penultimo = valores[valores.length - 2];
    percent = penultimo > 0 ? ((ultimo - penultimo) / penultimo) * 100 : 0;
    const ultimoc = valoresc[valoresc.length - 1];
    const penultimoc = valoresc[valoresc.length - 2];
    percentc = penultimoc > 0 ? ((ultimoc - penultimoc) / penultimoc) * 100 : 0;
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Bienvenido a la aplicación Certinotas 👋
      </Typography>

      <Grid container spacing={3}>

        {/* 📊 Promedio de notas dinámico */}
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Comparativo de promedio de notas por año"
            subheader="Datos históricos de los últimos 8 años"
            chart={{
              categories: categoriasPromedio.length > 0 ? categoriasPromedio : ['Cargando...'],
              series: [
                {
                  name: 'Promedio General',
                  data: valoresPromedio.length > 0 ? valoresPromedio : [0, 0, 0, 0, 0, 0, 0, 0],
                }
              ]
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Redes sociales del colegio Santo Tomas" list={_traffic} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline
            title="Historial de descargas"
            list={timeline}
          />
        </Grid>

        {/* 📊 Estudiantes por año */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Estudiantes por año"
            percent={percent}
            total={valores.reduce((acc, n) => acc + n, 0)}
            color="secondary"
            icon={<img alt="Estudiantes" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: categorias,
              series: valores,
            }}
          />
        </Grid>

        {/* 📊 Certificados por año */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Certificados por año"
            percent={percentc}
            total={valoresc.reduce((acc, n) => acc + n, 0)}
            color="secondary"
            icon={<img alt="Certificados" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: categoriasC,
              series: valoresc,
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
