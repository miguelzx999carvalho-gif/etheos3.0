import type { EticaScenario } from '../types'

export const scenarios: EticaScenario[] = [
  {
    id: 'erro-colega',
    category: 'honestidade',
    title: 'O erro do colega',
    situation:
      'Você percebe que um colega cometeu um erro importante e pede para você não contar para o responsável. O que você faria?',
    options: [
      {
        text: 'Aceitar e não contar nada a ninguém.',
        points: 10,
        isBest: false,
      },
      {
        text: 'Conversar com o colega, incentivá-lo a relatar o erro e, se necessário, comunicar o responsável com transparência.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Contar para o chefe direto, sem conversar antes com o colega.',
        points: 50,
        isBest: false,
      },
    ],
    explanation:
      'A atitude mais ética combina transparência com respeito. O ideal é dar ao colega a chance de assumir o erro, mas garantir que a informação correta chegue a quem precisa decidir. Esconder erros pode gerar danos maiores à equipe e à empresa.',
    values: ['Honestidade', 'Transparência', 'Responsabilidade', 'Respeito'],
    consequences: [
      'Esconder o erro pode agravar o problema e gerar desconfiança.',
      'Relatar com respeito preserva o colega e protege a organização.',
      'A transparência constrói um ambiente de confiança e crescimento.',
    ],
  },
  {
    id: 'assediador-observado',
    category: 'assedio-moral',
    title: 'Assédio presenciado',
    situation:
      'Você presencia um gestor tratando um colega de forma humilhante e repetida na frente de outras pessoas. O que você faz?',
    options: [
      {
        text: 'Nada, pois "não é problema meu" e tenho medo de represálias.',
        points: 10,
        isBest: false,
      },
      {
        text: 'Registro o ocorrido e reporto pelo canal de denúncia, preservando fatos e testemunhas.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Publico o caso nas redes sociais para "expor" o gestor.',
        points: 20,
        isBest: false,
      },
    ],
    explanation:
      'Assédio moral viola a dignidade da pessoa e fere um ambiente saudável. A postura ética é acolher a vítima, registrar os fatos e utilizar os canais oficiais da empresa. Expor publicamente, sem devido processo, pode causar mais dano e prejudicar a apuração.',
    values: ['Dignidade', 'Coragem', 'Empatia', 'Justiça'],
    consequences: [
      'O silêncio perpetua o abuso e normaliza a conduta.',
      'A denúncia bem registrada permite apuração justa.',
      'Publicar sem processo pode gerar dano e processo judicial.',
    ],
  },
  {
    id: 'promocao-favorecida',
    category: 'favorecimento',
    title: 'A promoção do amigo',
    situation:
      'Você percebe que uma promoção foi dada a um amigo do gestor, mesmo sem ele ser o mais qualificado. Como age?',
    options: [
      {
        text: 'Aceito em silêncio para não prejudicar minha posição.',
        points: 20,
        isBest: false,
      },
      {
        text: 'Apresento o caso de forma objetiva aos responsáveis, com base em critérios e evidências.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Boicoto o colega promovido e espalho boatos.',
        points: 10,
        isBest: false,
      },
    ],
    explanation:
      'Favorecimento fere a meritocracia e a confiança na organização. A atitude ética é questionar os critérios de forma transparente e baseada em fatos, sem ataques pessoais. Isso fortalece a justiça organizacional.',
    values: ['Equidade', 'Meritocracia', 'Transparência', 'Justiça'],
    consequences: [
      'O silêncio reforça a cultura de favorecimento.',
      'Questionar com critérios promove processos justos.',
      'Boatos corroem o clima e geram conflitos.',
    ],
  },
  {
    id: 'dados-confidenciais',
    category: 'privacidade',
    title: 'Dados confidenciais',
    situation:
      'Você encontra na impressora um documento confidencial com dados pessoais de colegas. O que faz?',
    options: [
      {
        text: 'Leio e compartilho com amigos do trabalho.',
        points: 10,
        isBest: false,
      },
      {
        text: 'Entrego o documento à pessoa responsável ou à área de segurança, sem ler o conteúdo.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Guardo o documento para mim.',
        points: 30,
        isBest: false,
      },
    ],
    explanation:
      'Dados pessoais são protegidos por lei (LGPD no Brasil). A conduta ética é proteger a informação, devolvê-la ao responsável e não acessar conteúdo que não lhe diz respeito. Vazar ou reter esses dados viola a privacidade das pessoas.',
    values: ['Privacidade', 'Confidencialidade', 'Integridade', 'Respeito'],
    consequences: [
      'Vazar dados pode gerar sanções legais e danos às pessoas.',
      'Devolver com cuidado protege todos e demonstra ética.',
      'Reter o documento é uma falha de conduta.',
    ],
  },
  {
    id: 'suborno-contrato',
    category: 'corrupcao',
    title: 'O suborno para o contrato',
    situation:
      'Um fornecedor oferece uma "comissão" pessoal para você aprovar um contrato superfaturado. O que faz?',
    options: [
      {
        text: 'Aceito, já que "todo mundo faz isso".',
        points: 0,
        isBest: false,
      },
      {
        text: 'Recuso firmemente e reporto a tentativa de suborno aos canais apropriados.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Ignoro a proposta e sigo em frente, sem reportar.',
        points: 40,
        isBest: false,
      },
    ],
    explanation:
      'Corrupção é ilegal e corruptora da confiança. Recusar e reportar é a única postura correta. Aprovar contrato superfaturado ou aceitar vantagens indevidas pode caracterizar crime e gerar graves consequências legais e reputacionais.',
    values: ['Integridade', 'Honestidade', 'Legalidade', 'Transparência'],
    consequences: [
      'Aceitar é crime e compromete sua carreira.',
      'Reportar protege a empresa e sua própria reputação.',
      'Ignorar a proposta pode deixar a corrupção avançar.',
    ],
  },
  {
    id: 'brincadeira-preconceituosa',
    category: 'discriminacao',
    title: 'A brincadeira preconceituosa',
    situation:
      'Um colega faz piadas de cunho racista ou preconceituoso e todos riem. Como você reage?',
    options: [
      {
        text: 'Rio junto para me enturmar.',
        points: 10,
        isBest: false,
      },
      {
        text: 'Interrompo de forma respeitosa, deixo claro que aquilo não é aceitável e reporto se necessário.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Fico em silêncio e evito o assunto.',
        points: 30,
        isBest: false,
      },
    ],
    explanation:
      'Piadas preconceituosas ferem a dignidade e contribuem para uma cultura de discriminação. A postura ética é se posicionar com respeito, sem agredir, e buscar apoio institucional se a situação persistir.',
    values: ['Igualdade', 'Respeito', 'Empatia', 'Coragem'],
    consequences: [
      'Rir normaliza o preconceito e afasta pessoas.',
      'Posicionar-se protege a diversidade e o clima.',
      'O silêncio é percebido como concordância.',
    ],
  },
  {
    id: 'atitude-funcionario',
    category: 'responsabilidade',
    title: 'O erro próprio',
    situation:
      'Você cometeu um erro que causou prejuízo pequeno, mas ninguém percebeu. O que faz?',
    options: [
      {
        text: 'Escondo, esperando que ninguém descubra.',
        points: 10,
        isBest: false,
      },
      {
        text: 'Assumo o erro, comunico ao responsável e proponho uma correção.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Tento transferir a culpa para outra pessoa.',
        points: 0,
        isBest: false,
      },
    ],
    explanation:
      'Responsabilidade profissional significa assumir os próprios erros. Admitir com honestidade e propor solução demonstra maturidade e integridade, e é sempre melhor do que ser descoberto depois.',
    values: ['Responsabilidade', 'Honestidade', 'Integridade', 'Humildade'],
    consequences: [
      'Esconder aumenta a desconfiança e pode agravar o problema.',
      'Assumir e corrigir fortalece sua credibilidade.',
      'Transferir culpa destrói relacionamentos e confiança.',
    ],
  },
  {
    id: 'rede-social-politica',
    category: 'privacidade',
    title: 'O colega vigiado',
    situation:
      'Você descobre que um colega consultou as redes sociais privadas de outro funcionário para usá-las contra ele. O que faz?',
    options: [
      {
        text: 'Nada, pois é assunto deles.',
        points: 20,
        isBest: false,
      },
      {
        text: 'Informo à área responsável e reporto a violação de privacidade.',
        points: 100,
        isBest: true,
      },
      {
        text: 'Compartilho o que descobri com outros colegas.',
        points: 10,
        isBest: false,
      },
    ],
    explanation:
      'Vigiar e usar informações privadas contra alguém é violação grave de privacidade e pode ser assédio. A conduta ética é reportar o ocorrido pelos canais apropriados, protegendo a vítima.',
    values: ['Privacidade', 'Respeito', 'Justiça', 'Integridade'],
    consequences: [
      'O silêncio permite abuso continuado.',
      'Reportar protege a vítima e coíbe a conduta.',
      'Compartilhar a informação agrava a violação.',
    ],
  },
]
