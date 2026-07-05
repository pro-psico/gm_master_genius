import type { Opening } from "../types/opening.types.js";

export const openings: Opening[] = [
  {
    id: "ruy-lopez",
    eco: "C60",
    name: "Ruy López",
    family: "Open Games",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
    sideToMove: "white",
    description:
      "La Ruy López es una de las aperturas más clásicas del ajedrez. Las blancas presionan el caballo de c6, que defiende el peón central de e5, y preparan un desarrollo sólido con enroque rápido.",
    ideas: [
      "Presionar el centro negro desde el inicio.",
      "Desarrollar piezas menores antes de lanzar ataques.",
      "Preparar el enroque corto.",
      "Crear tensión sobre el peón de e5."
    ],
    variants: [
      {
        id: "berlin-defense",
        name: "Defensa Berlinesa",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6"],
        description:
          "La Berlinesa busca una defensa sólida y rápida contra la Ruy López. Es famosa por su resistencia en finales."
      },
      {
        id: "morphy-defense",
        name: "Defensa Morphy",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"],
        description:
          "La Defensa Morphy ataca el alfil blanco y obliga a decidir si cambiar, retirarse o mantener presión."
      }
    ]
  },
  {
    id: "italian-game",
    eco: "C50",
    name: "Apertura Italiana",
    family: "Open Games",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
    sideToMove: "white",
    description:
      "La Italiana desarrolla rápidamente el alfil hacia c4, apuntando al punto débil f7. Es ideal para aprender principios básicos: centro, desarrollo y seguridad del rey.",
    ideas: [
      "Desarrollar piezas hacia casillas activas.",
      "Atacar el punto f7.",
      "Preparar el enroque corto.",
      "Construir presión central sin debilitar demasiado la posición."
    ],
    variants: [
      {
        id: "giuoco-piano",
        name: "Giuoco Piano",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5"],
        description:
          "Una línea tranquila donde ambos bandos desarrollan piezas de forma natural."
      },
      {
        id: "two-knights-defense",
        name: "Defensa de los Dos Caballos",
        moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6"],
        description:
          "Una respuesta más activa de las negras, atacando el peón de e4 y generando juego táctico."
      }
    ]
  },
  {
    id: "sicilian-defense",
    eco: "B20",
    name: "Defensa Siciliana",
    family: "Semi-Open Games",
    moves: ["e4", "c5"],
    sideToMove: "black",
    description:
      "La Siciliana es una de las respuestas más combativas contra 1.e4. Las negras no imitan el centro blanco, sino que atacan desde el flanco de dama y buscan posiciones asimétricas.",
    ideas: [
      "Crear una estructura asimétrica.",
      "Atacar el centro blanco desde el flanco.",
      "Buscar contrajuego dinámico.",
      "Evitar posiciones simétricas y pasivas."
    ],
    variants: [
      {
        id: "open-sicilian",
        name: "Siciliana Abierta",
        moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4"],
        description:
          "La línea abierta permite juego táctico y posiciones muy dinámicas."
      },
      {
        id: "najdorf-variation",
        name: "Variante Najdorf",
        moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6"],
        description:
          "Una de las variantes más profundas y estudiadas de toda la teoría de aperturas."
        }
    ]
  },
  {
    id: "french-defense",
    eco: "C00",
    name: "Defensa Francesa",
    family: "Semi-Open Games",
    moves: ["e4", "e6"],
    sideToMove: "black",
    description:
      "La Francesa prepara d5 para atacar el centro blanco. A cambio, las negras aceptan temporalmente un problema de espacio y el alfil de c8 queda encerrado por su propia estructura.",
    ideas: [
      "Atacar el centro con d5.",
      "Construir una estructura sólida.",
      "Aceptar menos espacio a cambio de resistencia.",
      "Buscar rupturas con c5 o f6."
    ],
    variants: [
      {
        id: "advance-variation",
        name: "Variante del Avance",
        moves: ["e4", "e6", "d4", "d5", "e5"],
        description:
          "Las blancas ganan espacio, mientras las negras buscan atacar la cadena de peones."
      },
      {
        id: "exchange-variation-french",
        name: "Variante del Cambio",
        moves: ["e4", "e6", "d4", "d5", "exd5", "exd5"],
        description:
          "Una línea más simétrica y tranquila, aunque puede volverse estratégica."
      }
    ]
  },
  {
    id: "queens-gambit",
    eco: "D06",
    name: "Gambito de Dama",
    family: "Closed Games",
    moves: ["d4", "d5", "c4"],
    sideToMove: "white",
    description:
      "El Gambito de Dama ofrece temporalmente el peón de c4 para desviar el peón negro de d5 y luchar por el control del centro.",
    ideas: [
      "Presionar el centro negro.",
      "Abrir líneas para las piezas blancas.",
      "Ganar espacio en el flanco de dama.",
      "Recuperar el peón sacrificado en buenas condiciones."
    ],
    variants: [
      {
        id: "queens-gambit-accepted",
        name: "Gambito de Dama Aceptado",
        moves: ["d4", "d5", "c4", "dxc4"],
        description:
          "Las negras aceptan el peón, pero deben cuidar no quedarse atrasadas en desarrollo."
      },
      {
        id: "queens-gambit-declined",
        name: "Gambito de Dama Rehusado",
        moves: ["d4", "d5", "c4", "e6"],
        description:
          "Las negras mantienen el centro sólido y desarrollan con una estructura clásica."
      }
    ]
  },
  {
    id: "kings-indian-defense",
    eco: "E60",
    name: "Defensa India de Rey",
    family: "Indian Defenses",
    moves: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6"],
    sideToMove: "black",
    description:
      "La India de Rey permite a las blancas ocupar el centro con peones, mientras las negras preparan un ataque dinámico desde los flancos.",
    ideas: [
      "Permitir el centro blanco para atacarlo después.",
      "Fianchettar el alfil de rey.",
      "Preparar rupturas con e5 o c5.",
      "Buscar ataque en el flanco de rey."
    ],
    variants: [
      {
        id: "classical-kid",
        name: "Variante Clásica",
        moves: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6", "Nf3", "O-O"],
        description:
          "Una de las estructuras principales, con ambos bandos siguiendo planes estratégicos profundos."
      }
    ]
  }
];