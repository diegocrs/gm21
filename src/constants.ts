import { DayPlan } from './types';

export const WORKOUT_PLAN: DayPlan[] = [
  // WEEK 1
  {
    id: 1,
    week: 1,
    title: "Glúteo e Quadríceps",
    focus: "Ativação e Técnica",
    isRest: false,
    exercises: [
      { name: "Cadeira abdutora", sets: "4", reps: "20" },
      { name: "Agachamento livre", sets: "4", reps: "15", note: "Com pouco peso" },
      { name: "Leg press 45º", sets: "4", reps: "15" },
      { name: "Avanço no Smith", sets: "3", reps: "12 (cada perna)" },
      { name: "Cadeira extensora", sets: "3", reps: "15" }
    ]
  },
  {
    id: 2,
    week: 1,
    title: "Posterior e Glúteo",
    focus: "Cadeia Posterior",
    isRest: false,
    exercises: [
      { name: "Mesa flexora", sets: "4", reps: "15" },
      { name: "Stiff com halteres", sets: "4", reps: "12" },
      { name: "Cadeira abdutora", sets: "3", reps: "20" },
      { name: "Elevação pélvica (Hip Thrust)", sets: "4", reps: "15" },
      { name: "Coice no cabo", sets: "3", reps: "15 (cada perna)" }
    ]
  },
  {
    id: 3,
    week: 1,
    title: "Descanso Ativo",
    focus: "Recuperação",
    isRest: true,
    description: "Caminhada leve ou escada 30–40 min + Alongamento e mobilidade de quadril.",
    exercises: []
  },
  {
    id: 4,
    week: 1,
    title: "Quadríceps e Glúteo",
    focus: "Volume",
    isRest: false,
    exercises: [
      { name: "Agachamento", sets: "4", reps: "12" },
      { name: "Leg press 45º", sets: "4", reps: "15" },
      { name: "Cadeira extensora", sets: "4", reps: "15" },
      { name: "Cadeira abdutora", sets: "4", reps: "20" },
      { name: "Afundo com halteres", sets: "3", reps: "12" }
    ]
  },
  {
    id: 5,
    week: 1,
    title: "Posterior e Glúteo",
    focus: "Ênfase Posterior",
    isRest: false,
    exercises: [
      { name: "Stiff", sets: "4", reps: "12" },
      { name: "Mesa flexora", sets: "4", reps: "15" },
      { name: "Coice no cabo", sets: "4", reps: "15" },
      { name: "Elevação pélvica", sets: "4", reps: "15" }
    ]
  },
  {
    id: 6,
    week: 1,
    title: "Full YOGA",
    focus: "Mobilidade e Flexibilidade",
    isRest: false,
    videoUrl: "https://www.youtube.com/embed/s1MvoRr94GM",
    exercises: [
      { name: "Aula Completa de Yoga Flow", note: "Siga o vídeo para relaxamento e mobilidade." }
    ]
  },
  {
    id: 7,
    week: 1,
    title: "Descanso Ativo",
    focus: "Cardio Moderado",
    isRest: true,
    description: "Cardio moderado de 30 min e alongamento completo.",
    exercises: []
  },

  // WEEK 2
  {
    id: 8,
    week: 2,
    title: "Quadríceps + Glúteo",
    focus: "Intensidade e Progressão",
    isRest: false,
    exercises: [
      { name: "Agachamento livre", sets: "4", reps: "10-12" },
      { name: "Leg press 45º", sets: "4", reps: "12" },
      { name: "Agachamento Búlgaro com halter", sets: "3", reps: "10 (cada perna)" },
      { name: "Cadeira extensora", sets: "3", reps: "Até a falha (Drop Set)" },
      { name: "Cadeira Abdutora", sets: "4", reps: "10" }
    ]
  },
  {
    id: 9,
    week: 2,
    title: "Posterior + Glúteo",
    focus: "Força",
    isRest: false,
    exercises: [
      { name: "Stiff com barra", sets: "4", reps: "10-12" },
      { name: "Mesa flexora unilateral", sets: "3", reps: "12" },
      { name: "Elevação pélvica", sets: "4", reps: "12" },
      { name: "Cadeira abdutora", sets: "3", reps: "20" },
      { name: "Abdução no cabo", sets: "3", reps: "15" }
    ]
  },
  {
    id: 10,
    week: 2,
    title: "Descanso Ativo",
    focus: "Cardio Leve",
    isRest: true,
    description: "Realizar cardio leve ou escada.",
    exercises: []
  },
  {
    id: 11,
    week: 2,
    title: "Glúteo Médio + Posterior",
    focus: "Isolamento",
    isRest: false,
    exercises: [
      { name: "Cadeira abdutora inclinada", sets: "4", reps: "20" },
      { name: "Passada lateral", sets: "3", reps: "12" },
      { name: "Stiff", sets: "3", reps: "12" },
      { name: "Elevação pélvica", sets: "4", reps: "15" },
      { name: "Abdução solo", sets: "3", reps: "20" }
    ]
  },
  {
    id: 12,
    week: 2,
    title: "Quadríceps + Potência",
    focus: "Explosão",
    isRest: false,
    exercises: [
      { name: "Agachamento frontal c/ halter", sets: "4", reps: "10" },
      { name: "Cadeira extensora", sets: "4", reps: "15" },
      { name: "Step-up (subir no banco)", sets: "3", reps: "12", note: "Substituir por Leg Press 4x12 se preferir" },
      { name: "Escada", sets: "1", reps: "10 min", note: "Finalização" }
    ]
  },
  {
    id: 13,
    week: 2,
    title: "Full Glute",
    focus: "Técnica + Queima",
    isRest: false,
    exercises: [
      { name: "Ponte de glúteo + abdução", sets: "3", reps: "20" },
      { name: "Cadeira abdutora", sets: "4", reps: "20" },
      { name: "Abdução no cabo", sets: "3", reps: "15" },
      { name: "Elevação pélvica", sets: "4", reps: "12" },
      { name: "Cardio leve", sets: "1", reps: "20 min" }
    ]
  },
  {
    id: 14,
    week: 2,
    title: "Descanso Ativo",
    focus: "Recuperação",
    isRest: true,
    description: "Alongar e caminhar.",
    exercises: []
  },

  // WEEK 3
  {
    id: 15,
    week: 3,
    title: "Quadríceps",
    focus: "Foco, Falha e Definição",
    isRest: false,
    exercises: [
      { name: "Agachamento Smith", sets: "4", reps: "10" },
      { name: "Leg press 45º", sets: "4", reps: "12" },
      { name: "Cadeira extensora", sets: "3", reps: "Até a falha (Drop Set)" },
      { name: "Passada curta", sets: "3", reps: "12" },
      { name: "Abdução na polia", sets: "4", reps: "20" }
    ]
  },
  {
    id: 16,
    week: 3,
    title: "Posterior + Glúteo",
    focus: "Intensidade Máxima",
    isRest: false,
    exercises: [
      { name: "Stiff com halteres", sets: "4", reps: "10" },
      { name: "Mesa flexora", sets: "4", reps: "12" },
      { name: "Elevação pélvica pesado", sets: "4", reps: "10" },
      { name: "Cadeira abdutora", sets: "4", reps: "20" },
      { name: "Ponte + abdução com elástico", sets: "3", reps: "20" }
    ]
  },
  {
    id: 17,
    week: 3,
    title: "Descanso Ativo",
    focus: "Recuperação",
    isRest: true,
    description: "Cardio leve ou alongamento.",
    exercises: []
  },
  {
    id: 18,
    week: 3,
    title: "Glúteo e Potência",
    focus: "Contração e Ritmo",
    isRest: false,
    exercises: [
      { name: "Avanço no Smith", sets: "4", reps: "10" },
      { name: "Agachamento búlgaro", sets: "3", reps: "12" },
      { name: "Abdução no cabo", sets: "4", reps: "20" },
      { name: "Elevação pélvica", sets: "4", reps: "10" },
      { name: "Sprint na esteira", sets: "10", reps: "30seg", note: "Pausa de 30seg entre tiros" }
    ]
  },
  {
    id: 19,
    week: 3,
    title: "Full Leg",
    focus: "Força Total",
    isRest: false,
    exercises: [
      { name: "Agachamento", sets: "4", reps: "10" },
      { name: "Leg press", sets: "4", reps: "12" },
      { name: "Cadeira flexora", sets: "3", reps: "12" },
      { name: "Cadeira extensora", sets: "3", reps: "15" },
      { name: "Cadeira abdutora", sets: "4", reps: "20" }
    ]
  },
  {
    id: 20,
    week: 3,
    title: "Glúteo Isolado",
    focus: "Queima Final",
    isRest: false,
    exercises: [
      { name: "Coice cabo", sets: "3", reps: "15" },
      { name: "Elevação pélvica", sets: "4", reps: "12" },
      { name: "Ponte + abdução", sets: "3", reps: "20" },
      { name: "Cadeira abdutora", sets: "4", reps: "20" },
      { name: "Escada", sets: "1", reps: "20 min" }
    ]
  },
  {
    id: 21,
    week: 3,
    title: "Descanso Ativo + Avaliação",
    focus: "Conclusão",
    isRest: true,
    description: "Caminhada leve, alongamento. Avaliar evolução (foto, medidas, sensação corporal).",
    exercises: []
  }
];
