import axios from "axios";

let datos: any[] = [];
export const _id = (index: number) => {
  if (datos.length > index && datos[index].Fecha_Nacimiento) {
  return datos[index].Fecha_Nacimiento;
} else {
  return "Sin data disponible";
}
};
  export const fetchExAlumnos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/exalumnos");
       datos = response.data;
    } catch (error) {
      console.error("Error fetching exalumnos data", error);
    }
  };

  export const _times = (index: number) => {
    if (datos.length > index && datos[index].id) {
      return datos[index].id;
    } else {
      return "Sin data disponible";
    }
  };

export const _fullName = (index: number) =>
  {
    if (datos.length > index && datos[index].Apellido) {
    return datos[index].Apellido;
  } else {
    return "Sin data disponible";
  }
  };
   
export const _price = (index: number) =>
  [
    35.17, 57.22, 64.78, 50.79, 9.57, 61.46, 96.73, 63.04, 33.18, 36.3, 54.42, 20.52, 62.82, 19.96,
    25.93, 70.39, 23.11, 67.23, 14.31, 31.5, 26.72, 44.8, 37.87, 75.53,
  ][index];

export const _company = (index: number) =>
  [
    'Medhurst, Moore and Franey',
    'Hahn, Homenick and Lind',
    'Larkin LLC',
    'Stamm, Larson and Mertz',
    'Spencer, Raynor and Langosh',
    'Lehner - Feeney',
    'Leuschke, Harris and Kuhlman',
    'Gutmann - Kassulke',
    'Turcotte - Runolfsson',
    'Howe - Anderson',
    'Sipes - Yost',
    'Johns - Aufderhar',
    'Schmidt LLC',
    'Smitham - Gerlach',
    'Waelchi - VonRueden',
    'Padberg - Macejkovic',
    'Lemke - Ferry',
    'Koch and Sons',
    'Klein - Rolfson',
    'Weimann LLC',
    'White, Cassin and Goldner',
    'Mohr, Langworth and Hills',
    'Mitchell, Volkman and Prosacco',
    'Streich Group',
  ][index];

export const _boolean = (index: number) =>
  [
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
  ][index];

export const _postTitles = (index: number) =>
  [
    'Whiteboard Templates By Industry Leaders',
    'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
    'Designify Agency Landing Page Design',
    '✨What is Done is Done ✨',
    'Fresh Prince',
    'Six Socks Studio',
    'vincenzo de cotiis’ crossing over showcases a research on contamination',
    'Simple, Great Looking Animations in Your Project | Video Tutorial',
    '40 Free Serif Fonts for Digital Designers',
    'Examining the Evolution of the Typical Web Design Client',
    'Katie Griffin loves making that homey art',
    'The American Dream retold through mid-century railroad graphics',
    'Illustration System Design',
    'CarZio-Delivery Driver App SignIn/SignUp',
    'How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna',
    'Tylko Organise effortlessly -3D & Motion Design',
    'RAYO ?? A expanded visual arts festival identity',
    'Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover',
    'Inside the Mind of Samuel Day',
    'Portfolio Review: Is This Portfolio Too Creative?',
    'Akkers van Margraten',
    'Gradient Ticket icon',
    'Here’s a Dyson motorcycle concept that doesn’t ‘suck’!',
    'How to Animate a SVG with border-image',
  ][index];

export const _description = (index: number) =>
  [
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'The Football Is Good For Training And Recreational Purposes',
    'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
    'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
    'The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients',
    "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    'The Football Is Good For Training And Recreational Purposes',
    'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
  ][index];

export const _taskNames = (index: number) =>
  [
    `Prepare Monthly Financial Report`,
    `Design New Marketing Campaign`,
    `Analyze Customer Feedback`,
    `Update Website Content`,
    `Conduct Market Research`,
    `Develop Software Application`,
    `Organize Team Meeting`,
    `Create Social Media Posts`,
    `Review Project Plan`,
    `Implement Security Protocols`,
    `Write Technical Documentation`,
    `Test New Product Features`,
    `Manage Client Inquiries`,
    `Train New Employees`,
    `Coordinate Logistics`,
    `Monitor Network Performance`,
    `Develop Training Materials`,
    `Draft Press Release`,
    `Prepare Budget Proposal`,
    `Evaluate Vendor Proposals`,
    `Perform Data Analysis`,
    `Conduct Quality Assurance`,
    `Plan Event Logistics`,
    `Optimize SEO Strategies`,
  ][index];

export const _productNames = (index: number) =>
  [
    'Nike Air Force 1 NDESTRUKT',
    'Nike Space Hippie 04',
    'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
    'Nike Blazer Low 77 Vintage',
    'Nike ZoomX SuperRep Surge',
    'Zoom Freak 2',
    'Nike Air Max Zephyr',
    'Jordan Delta',
    'Air Jordan XXXV PF',
    'Nike Waffle Racer Crater',
    'Kyrie 7 EP Sisterhood',
    'Nike Air Zoom BB NXT',
    'Nike Air Force 1 07 LX',
    'Nike Air Force 1 Shadow SE',
    'Nike Air Zoom Tempo NEXT%',
    'Nike DBreak-Type',
    'Nike Air Max Up',
    'Nike Air Max 270 React ENG',
    'NikeCourt Royale',
    'Nike Air Zoom Pegasus 37 Premium',
    'Nike Air Zoom SuperRep',
    'NikeCourt Royale',
    'Nike React Art3mis',
    'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
  ][index];
