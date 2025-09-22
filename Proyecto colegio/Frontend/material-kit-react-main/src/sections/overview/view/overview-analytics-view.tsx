import { useEffect, useState } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic } from 'src/_mock';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

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
  const categoriasC = Certificadosporanio.map((item) => item.anio.toString());
  const valoresc = Certificadosporanio.map((item) => item.cantidad_certificados);
  const categorias = estudiantesPorAnio.map((item) => item.year.toString());
  const valores = estudiantesPorAnio.map((item) => item.cantidad_estudiantes);
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
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Bienvenido a la aplicación Certinotas 👋
      </Typography>

      <Grid container spacing={3}>

      
        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Comparativo de promedio de notas por curso"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Redes sociales del colegio Santo Tomas" list={_traffic} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline
            title="Historial de descargas"
            list={timeline} // <-- viene del servicio
          />
        </Grid>
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
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
           <AnalyticsWidgetSummary
          title="Certificados por año"
          percent={percentc}
          total={valoresc.reduce((acc, n) => acc + n, 0)}
          color="secondary"
          icon={<img alt="Estudiantes" src="/assets/icons/glass/ic-glass-users.svg" />}
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
