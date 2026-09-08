export interface RadarQuestion {
  id: string
  question: string
  label: string // nome exibido no dashboard
}

export const radarQuestions: RadarQuestion[] = [
  {
    id: 'respeito',
    question: 'Você se sente respeitado no ambiente de trabalho?',
    label: 'Respeito no ambiente',
  },
  {
    id: 'injustica',
    question: 'Você já presenciou alguma situação injusta recentemente?',
    label: 'Percepção de injustiça',
  },
  {
    id: 'oportunidades',
    question: 'Você acredita que todos possuem as mesmas oportunidades?',
    label: 'Igualdade de oportunidades',
  },
  {
    id: 'seguranca-denunciar',
    question: 'Você se sente seguro para denunciar comportamentos inadequados?',
    label: 'Segurança psicológica',
  },
  {
    id: 'favoritismo',
    question: 'Existe favoritismo dentro da empresa?',
    label: 'Favoritismo',
  },
  {
    id: 'confianca',
    question: 'Você confia nas lideranças da empresa?',
    label: 'Confiança na empresa',
  },
]
