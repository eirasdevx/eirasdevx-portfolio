import type { Project } from "@/types/project";

/**
 * Portfolio case studies, in both languages. Only write what is true today;
 * leave the rest undefined and the page marks it as documentation in progress.
 */
export const projects: Project[] = [
  {
    slug: "kora",
    appSlug: "kora",
    type: { es: "Plataforma web", en: "Web platform" },
    summary: {
      es: "Un único espacio de trabajo para asociaciones: socios, eventos, contabilidad y documentos sin hojas de cálculo dispersas.",
      en: "A single workspace for associations: members, events, accounting and documents without the spreadsheet sprawl.",
    },
    layout: "wide",
    tone: "light",
    caseStudy: {
      es: {
        problem:
          "Las asociaciones pequeñas suelen gestionar socios, eventos, dinero y papeleo entre hojas de cálculo, chats y carpetas dispersas. La información se duplica, se queda desactualizada y depende de quien tenga los archivos.",
        goals: [
          "Reunir socios, eventos, contabilidad y documentos en un solo lugar.",
          "Mantener una interfaz lo bastante sencilla para voluntarios con poco tiempo.",
          "Construir sobre un código tipado y modular que pueda crecer módulo a módulo.",
        ],
        architecture:
          "Aplicación Next.js con App Router, React y TypeScript, sobre PostgreSQL con Prisma. El dominio se organiza en módulos (contactos, personas, eventos, contabilidad, documentos, recursos, voluntariado y mensajería) y el estado de cliente vive en Zustand. El portal del socio es una aplicación aparte con el mismo stack.",
        decisions: [
          "Separar cada área en su propio módulo para añadir funciones sin tocar las demás.",
          "Usar Prisma sobre PostgreSQL con conexiones distintas para desarrollo local y hosting.",
          "Modelar usuarios, sesiones y eventos de seguridad por asociación.",
          "Crear el portal del socio como aplicación independiente que replica los tipos de Kora, para sustituir después sus datos de ejemplo sin cambiar la interfaz.",
        ],
        challenges: [
          "Abarcar áreas tan distintas como contabilidad, documentos y mensajería sin que la interfaz resulte complicada.",
          "Mantener separados los datos de cada asociación.",
          "Preparar la conexión entre el panel de gestión y el portal del socio, que hoy funciona con datos de demostración.",
        ],
        nextSteps: ["Conectar el portal del socio con los datos reales de Kora.", "Añadir tests automatizados.", "Publicar una versión abierta al público."],
      },
      en: {
        problem:
          "Small associations usually manage members, events, money and paperwork across scattered spreadsheets, chats and folders. Information gets duplicated, goes out of date and depends on whoever holds the files.",
        goals: [
          "Bring members, events, accounting and documents into one place.",
          "Keep the interface simple enough for volunteers with little time.",
          "Build on a typed, modular codebase that can grow module by module.",
        ],
        architecture:
          "Next.js App Router application with React and TypeScript, on PostgreSQL through Prisma. The domain is split into modules (contacts, people, events, accounting, documents, resources, volunteering and messaging) and client state lives in Zustand. The member portal is a separate application on the same stack.",
        decisions: [
          "Give each area its own module so features can be added without touching the others.",
          "Use Prisma on PostgreSQL with separate connections for local development and hosting.",
          "Model users, sessions and security events per association.",
          "Build the member portal as a separate application that mirrors Kora's types, so its sample data can be replaced later without changing the interface.",
        ],
        challenges: [
          "Covering areas as different as accounting, documents and messaging without making the interface complicated.",
          "Keeping each association's data separate.",
          "Preparing the link between the management panel and the member portal, which runs on demo data today.",
        ],
        nextSteps: ["Connect the member portal to Kora's real data.", "Add automated tests.", "Release a version open to the public."],
      },
    },
  },
  {
    slug: "fastpass",
    appSlug: "fastpass",
    type: { es: "Plataforma de eventos", en: "Event platform" },
    summary: {
      es: "Entradas con QR, aforo y control de acceso a eventos desde una única plataforma, sin que el público tenga que registrarse.",
      en: "QR tickets, capacity and door access for events on a single platform, with no sign-up for attendees.",
    },
    layout: "tall",
    tone: "dark",
    caseStudy: {
      es: {
        problem:
          "Los organizadores de eventos suelen combinar una herramienta para reservas, otra para entradas y una lista impresa en la puerta. El aforo y el acceso acaban descuadrados.",
        goals: ["Unificar inscripciones y entradas.", "Controlar el aforo en tiempo real.", "Hacer el control de acceso en la puerta rápido y fiable."],
        architecture:
          "Aplicación Next.js con App Router y TypeScript sobre Supabase. Las reglas críticas viven en PostgreSQL: seguridad a nivel de fila por organización, funciones para reservar aforo y validar entradas, y migraciones versionadas. La validación QR funciona desde el navegador del móvil.",
        decisions: [
          "Dejar que el público consiga entradas sin cuenta, con un enlace privado por pedido.",
          "Comprobar el aforo dentro de PostgreSQL, bloqueando el evento durante cada compra.",
          "Exigir un segundo factor (TOTP) a organizadores y personal, reforzado también en la base de datos.",
          "No usar nunca la clave service_role en la aplicación.",
          "Incluir un modo demo con datos en memoria, bloqueado en producción.",
        ],
        challenges: [
          "Que dos escáneres no registren a la vez el mismo primer acceso.",
          "Aislar por completo los datos de cada organización y limitar al personal de puerta a sus eventos asignados.",
          "Evitar entradas duplicadas cuando alguien reintenta una compra.",
        ],
        nextSteps: ["Integrar un proveedor de pagos antes de vender entradas de pago."],
      },
      en: {
        problem:
          "Event organisers often combine one tool for bookings, another for tickets and a printed list at the door. Capacity and access end up out of sync.",
        goals: ["Unify registration and ticketing.", "Control capacity in real time.", "Make access control at the door fast and reliable."],
        architecture:
          "Next.js App Router application with TypeScript on Supabase. Critical rules live in PostgreSQL: row-level security per organisation, functions to reserve capacity and validate tickets, and versioned migrations. QR validation works from a phone browser.",
        decisions: [
          "Let attendees get tickets with no account, using a private link per order.",
          "Check capacity inside PostgreSQL, locking the event during each purchase.",
          "Require a second factor (TOTP) for organisers and staff, enforced in the database as well.",
          "Never use the service_role key in the application.",
          "Include a demo mode with in-memory data, blocked in production.",
        ],
        challenges: [
          "Stopping two scanners from recording the same first entry at once.",
          "Fully isolating each organisation's data and limiting door staff to their assigned events.",
          "Avoiding duplicate tickets when someone retries a purchase.",
        ],
        nextSteps: ["Integrate a payment provider before selling paid tickets."],
      },
    },
  },
  {
    slug: "kgba",
    appSlug: "kgba",
    type: { es: "Emulador para Android", en: "Android emulator" },
    summary: {
      es: "Un emulador de Game Boy Advance escrito desde cero en Kotlin, con núcleo independiente de Android y una app pensada para jugar en el móvil.",
      en: "A Game Boy Advance emulator written from scratch in Kotlin, with an Android-independent core and an app designed for playing on a phone.",
    },
    layout: "square",
    tone: "dark",
    caseStudy: {
      es: {
        problem:
          "Emular una consola significa reproducir su procesador, sus gráficos, su sonido y su hardware con la precisión suficiente para que los juegos funcionen tal cual, y hacerlo a 60 imágenes por segundo en un móvil.",
        goals: [
          "Escribir el emulador completo desde cero, sin bibliotecas de emulación.",
          "Mantener el núcleo separado de Android para poder probarlo en el PC.",
          "No depender de la BIOS de Nintendo ni incluir ningún juego.",
          "Ofrecer una app cómoda en el móvil: controles editables, mando físico, estados guardados y multijugador.",
        ],
        architecture:
          "Proyecto Gradle con tres módulos. El módulo core es Kotlin/JVM puro sin dependencias: CPU ARM7TDMI con ARM y Thumb, bus de memoria con waitstates, PPU por líneas (modos 0-5, sprites afines, ventanas y blending), APU con 4 canales PSG y Direct Sound, DMA, temporizadores, guardado SRAM/Flash/EEPROM, puerto serie y GPIO del cartucho. app es la app Android (minSdk 24) y desktop, un reproductor Swing y un ejecutor sin ventana para pruebas.",
        decisions: [
          "Implementar la BIOS como llamadas SWI de alto nivel en Kotlin, para que funcione sin archivos de Nintendo (la BIOS real sigue siendo opcional).",
          "Planificar la emulación por líneas en lugar de por ciclo, a cambio de rendimiento en el móvil.",
          "Detectar automáticamente el tipo de guardado del cartucho.",
          "Dibujar la carcasa en código, sin imágenes, y permitir importar carcasas externas.",
          "Implementar el cable link sobre TCP o Bluetooth, esperando la respuesta del otro móvil en cada transferencia.",
        ],
        challenges: [
          "Pasar los tests de jsmolka/gba-tests (arm, thumb, memory, bios, save…) con la BIOS propia.",
          "Llegar a 60 fps en Android, que obliga a compilar en release con R8.",
          "Sincronizar dos consolas por red sin que los juegos detecten el retraso.",
          "Que los controles táctiles nunca tapen la imagen del juego en ningún tamaño ni orientación.",
        ],
        nextSteps: [
          "Decodificar las instrucciones de la CPU por bloques para ganar rendimiento.",
          "Afinar la temporización de waitstates y prefetch.",
          "Probar los sensores de inclinación y giroscopio con los juegos reales.",
        ],
      },
      en: {
        problem:
          "Emulating a console means reproducing its processor, graphics, sound and hardware closely enough for games to run unmodified, and doing it at 60 frames per second on a phone.",
        goals: [
          "Write the whole emulator from scratch, with no emulation libraries.",
          "Keep the core separate from Android so it can be tested on a PC.",
          "Not depend on Nintendo's BIOS or ship any games.",
          "Offer a comfortable phone app: editable controls, gamepad support, save states and multiplayer.",
        ],
        architecture:
          "Gradle project with three modules. The core module is plain Kotlin/JVM with no dependencies: ARM7TDMI CPU with ARM and Thumb, memory bus with waitstates, scanline PPU (modes 0-5, affine sprites, windows and blending), APU with 4 PSG channels and Direct Sound, DMA, timers, SRAM/Flash/EEPROM saves, serial port and cartridge GPIO. app is the Android app (minSdk 24) and desktop is a Swing player plus a headless runner for tests.",
        decisions: [
          "Implement the BIOS as high-level SWI calls in Kotlin, so it runs without Nintendo files (a real BIOS stays optional).",
          "Schedule emulation per scanline rather than per cycle, trading accuracy for performance on phones.",
          "Auto-detect the cartridge save type.",
          "Draw the console shell in code, with no images, and allow importing external skins.",
          "Run the link cable over TCP or Bluetooth, waiting for the other phone's reply on each transfer.",
        ],
        challenges: [
          "Passing jsmolka/gba-tests (arm, thumb, memory, bios, save…) with the custom BIOS.",
          "Reaching 60 fps on Android, which requires release builds with R8.",
          "Synchronising two consoles over a network without games noticing the delay.",
          "Making sure touch controls never cover the game image at any size or orientation.",
        ],
        nextSteps: [
          "Decode CPU instructions in blocks for better performance.",
          "Refine waitstate and prefetch timing.",
          "Test the tilt and gyroscope sensors with real games.",
        ],
      },
    },
  },
  {
    slug: "san-apptolin",
    appSlug: "san-apptolin",
    type: { es: "Guía de fiestas", en: "Festival guide" },
    summary: {
      es: "Una guía en directo de las fiestas de San Antolín en Medina del Campo: qué pasa ahora, dónde y qué no quieres perderte.",
      en: "A live guide to the San Antolín festivities in Medina del Campo: what's on now, where, and what you don't want to miss.",
    },
    layout: "square",
    tone: "light",
    caseStudy: {
      es: {
        problem:
          "El programa de unas fiestas de 18 días es largo y difícil de consultar en plena calle. Quien está allí no quiere leerlo entero: quiere saber qué está pasando ahora y dónde.",
        goals: [
          "Mostrar primero lo que ocurre en este momento.",
          "Encontrar cualquier acto por día, categoría o búsqueda.",
          "Guardar favoritos sin cuentas ni registro.",
          "Tener a mano los teléfonos de urgencia y las recomendaciones de seguridad.",
        ],
        architecture:
          "Aplicación Next.js con App Router y TypeScript, sin backend ni base de datos. Todo el programa vive en archivos de datos, el mapa usa Leaflet sobre OpenStreetMap y los favoritos se guardan en el navegador.",
        decisions: [
          "Hacer de «Ahora» la pantalla de inicio, en lugar del programa.",
          "Llevar el día y la categoría en la URL para compartir una vista concreta por WhatsApp.",
          "Prescindir de servidor y de cuentas: los favoritos se quedan en el dispositivo.",
          "Convertirla en PWA para consultarla como una app.",
        ],
        challenges: [
          "Pintar un reloj en vivo sin errores de hidratación entre servidor y cliente.",
          "Calcular estados en directo, actos próximos y cuentas atrás a lo largo de 18 días.",
          "Pasar el programa completo a datos estructurados con lugares y categorías.",
        ],
        nextSteps: ["Afinar las coordenadas de los lugares en el mapa.", "Actualizar el programa para futuras ediciones."],
      },
      en: {
        problem:
          "The programme for an 18-day festival is long and hard to check out on the street. People who are there don't want to read all of it: they want to know what's happening now and where.",
        goals: [
          "Show what's happening right now first.",
          "Find any event by day, category or search.",
          "Save favourites with no accounts or sign-up.",
          "Keep emergency numbers and safety advice to hand.",
        ],
        architecture:
          "Next.js App Router application with TypeScript, with no backend or database. The whole programme lives in data files, the map uses Leaflet on OpenStreetMap and favourites are stored in the browser.",
        decisions: [
          "Make “Now” the home screen instead of the programme.",
          "Keep the day and category in the URL so a specific view can be shared on WhatsApp.",
          "Skip servers and accounts: favourites stay on the device.",
          "Make it a PWA so it can be used like an app.",
        ],
        challenges: [
          "Rendering a live clock with no hydration errors between server and client.",
          "Working out live states, upcoming events and countdowns across 18 days.",
          "Turning the full programme into structured data with venues and categories.",
        ],
        nextSteps: ["Fine-tune venue coordinates on the map.", "Update the programme for future editions."],
      },
    },
  },
  {
    slug: "carretazo",
    appSlug: "carretazo",
    type: { es: "App social de fotografía", en: "Social photo app" },
    summary: {
      es: "La cámara desechable, reinventada para grupos: dispara ahora y revela el álbum compartido después.",
      en: "The disposable camera, rebuilt for groups: shoot now, reveal the shared album later.",
    },
    layout: "square",
    tone: "dark",
    caseStudy: {
      es: {
        problem:
          "Las fotos del móvil se ven, se juzgan y se olvidan en segundos. Se ha perdido la expectación de la cámara desechable: no saber cómo han salido hasta revelar el carrete.",
        goals: ["Recrear el revelado diferido del carrete.", "Permitir que un grupo dispare en un único álbum compartido.", "Mantener una experiencia divertida y sencilla."],
        architecture:
          "Aplicación Next.js y React en TypeScript que habla directamente con Supabase (Auth, Postgres, Storage y Realtime), sin backend propio. Las reglas de negocio viven en funciones SQL y políticas de seguridad a nivel de fila. Se instala como PWA y cuenta con una versión para Android e iOS empaquetada con Capacitor.",
        decisions: [
          "Hacer cumplir el secreto del revelado en la base de datos, no en la interfaz.",
          "Revelar las fotos con un motor propio en canvas, con una receta por película.",
          "Guardar los disparos en una cola de IndexedDB para no perderlos sin conexión.",
          "Aislar la lógica pura en módulos con tests sobre el ejecutor nativo de Node.",
        ],
        challenges: [
          "Controlar la cámara del móvil desde la web: zoom, linterna, volteo y orientación.",
          "Subir fotos con mala cobertura mediante reintentos y estado de conexión.",
          "Reutilizar el mismo código en la web y en la app empaquetada, sin servidor.",
        ],
        nextSteps: ["Publicar las versiones de Android e iOS."],
      },
      en: {
        problem:
          "Phone photos are seen, judged and forgotten in seconds. The anticipation of a disposable camera — not knowing until the film is developed — is lost.",
        goals: ["Recreate the delayed reveal of film.", "Let a group shoot into one shared album.", "Keep the experience playful and simple."],
        architecture:
          "Next.js and React application in TypeScript that talks directly to Supabase (Auth, Postgres, Storage and Realtime), with no backend of its own. Business rules live in SQL functions and row-level security policies. It installs as a PWA and has an Android and iOS version packaged with Capacitor.",
        decisions: [
          "Enforce the secrecy of the reveal in the database, not in the interface.",
          "Develop photos with a custom canvas engine, with one recipe per film.",
          "Keep shots in an IndexedDB queue so they aren't lost offline.",
          "Isolate pure logic in modules tested with Node's built-in runner.",
        ],
        challenges: [
          "Controlling the phone camera from the web: zoom, torch, flipping and orientation.",
          "Uploading photos on poor coverage through retries and connection state.",
          "Reusing the same code on the web and in the packaged app, with no server.",
        ],
        nextSteps: ["Release the Android and iOS versions."],
      },
    },
  },
  {
    slug: "gameiras",
    appSlug: "gameiras",
    type: { es: "Plataforma de minijuegos", en: "Mini-game platform" },
    summary: {
      es: "Minijuegos para jugar en grupo: una pantalla compartida como consola y un móvil como mando para cada participante.",
      en: "Mini-games for groups: a shared screen as the console and a phone as each player's controller.",
    },
    layout: "wide",
    tone: "dark",
    caseStudy: {
      es: {
        problem: "Jugar en grupo a una consola exige comprar el aparato y varios mandos. Casi todo el mundo, en cambio, ya tiene una pantalla cerca y un móvil en el bolsillo.",
        goals: ["Jugar sin instalar nada ni comprar mandos.", "Unirse a una partida solo con escanear un QR.", "Reunir juegos variados bajo una misma plataforma."],
        architecture:
          "Next.js con exportación estática y Three.js para los juegos en 3D. La pantalla es la autoridad de la partida; los móviles solo envían controles y reciben estado. Se comunican por un relé WebSocket propio o, en la versión publicada como sitio estático, por WebRTC con PeerJS.",
        decisions: [
          "Que los móviles nunca simulen nada: toda la partida vive en la pantalla.",
          "Mantener un transporte doble que elige WebSocket o WebRTC según el entorno.",
          "Ofrecer alternativa táctil para todos los controles de movimiento.",
          "Que un avatar creado en el móvil sea el personaje en todos los juegos.",
        ],
        challenges: [
          "Devolver a cada móvil a su plaza si pierde la red o bloquea la pantalla.",
          "Dejar que la IA juegue por quien se ha caído en plena partida.",
          "Usar los sensores del móvil, que en muchos dispositivos exigen HTTPS.",
        ],
      },
      en: {
        problem: "Playing a console as a group means buying the device and several controllers. Almost everyone, however, already has a screen nearby and a phone in their pocket.",
        goals: ["Play with nothing to install and no controllers to buy.", "Join a game just by scanning a QR code.", "Bring varied games together on one platform."],
        architecture:
          "Next.js with static export and Three.js for the 3D games. The screen is the authority for the game; phones only send controls and receive state. They communicate through a custom WebSocket relay or, in the version published as a static site, through WebRTC with PeerJS.",
        decisions: [
          "Phones never simulate anything: the whole game lives on the screen.",
          "Keep a dual transport that picks WebSocket or WebRTC depending on the environment.",
          "Offer a touch alternative for every motion control.",
          "Make an avatar created on the phone the player's character in every game.",
        ],
        challenges: [
          "Returning each phone to its seat if it loses connection or locks its screen.",
          "Letting the AI play for anyone who drops out mid-game.",
          "Using phone sensors, which require HTTPS on many devices.",
        ],
      },
    },
  },
  {
    slug: "dead-ink",
    appSlug: "dead-ink",
    type: { es: "Videojuego", en: "Video game" },
    summary: {
      es: "Un shooter en primera persona dibujado con tinta negra que mezcla la estética de los dibujos de los años 30 con el terror.",
      en: "A first-person shooter drawn in black ink, mixing 1930s cartoon aesthetics with horror.",
    },
    layout: "tall",
    tone: "dark",
    caseStudy: {
      es: {
        problem:
          "La mayoría de los shooters persiguen el realismo. Dead Ink explora la dirección contraria: cómo se siente un juego de terror en primera persona cuando parece un cortometraje animado antiguo.",
        goals: [
          "Recrear en tiempo real el lenguaje visual de la animación de los años 30.",
          "Usar una paleta estrictamente monocroma para crear tensión.",
          "Ofrecer un disparo en primera persona con buena respuesta en Unity.",
        ],
        architecture:
          "Proyecto de Unity con la lógica de juego escrita en C#. Campaña por escenarios definidos con datos, modo por rondas, IA de enemigos y armas configurables, con herramientas de editor propias para construir y validar los niveles, y versiones para PC y Android.",
        decisions: [
          "Crear flujos propios para producir sprites, armas y HUD con un estilo unificado.",
          "Describir campañas, enemigos y armas como datos para ampliar el contenido.",
          "Automatizar en el editor la construcción y la validación de la campaña.",
        ],
        challenges: ["Mantener la estética de dibujo animado en un mundo 3D en tiempo real.", "Adaptar un shooter en primera persona a controles táctiles."],
      },
      en: {
        problem:
          "Most shooters chase realism. Dead Ink explores the opposite direction: what a first-person horror game feels like when it looks like a vintage animated short.",
        goals: [
          "Recreate the visual language of 1930s animation in real time.",
          "Use a strictly monochrome palette to build tension.",
          "Deliver responsive first-person shooting in Unity.",
        ],
        architecture:
          "Unity project with gameplay code written in C#. A data-defined campaign across locations, a round-based mode, enemy AI and configurable weapons, with custom editor tools to build and validate levels, and builds for PC and Android.",
        decisions: [
          "Build custom pipelines to produce sprites, weapons and HUD in a unified style.",
          "Describe campaigns, enemies and weapons as data so content can grow.",
          "Automate campaign building and validation in the editor.",
        ],
        challenges: ["Keeping the cartoon look in a real-time 3D world.", "Adapting a first-person shooter to touch controls."],
      },
    },
  },
  {
    slug: "birrario",
    appSlug: "birrario",
    type: { es: "App web", en: "Web app" },
    summary: {
      es: "Un álbum digital para descubrir, coleccionar y puntuar las cervezas de España. Publicado y disponible.",
      en: "A digital album to discover, collect and rate the beers of Spain — live and publicly available.",
    },
    layout: "square",
    tone: "light",
    caseStudy: {
      es: {
        problem: "Recordar qué cervezas has probado, y cuáles te gustaron de verdad, es más difícil de lo que parece.",
        goals: ["Que registrar una cerveza sea rápido.", "Mantener una colección personal.", "Puntuar cervezas para decidir qué pedir la próxima vez."],
        architecture:
          "PWA pensada para móvil con Next.js, TypeScript y Supabase. La interfaz vive en componentes, la lógica de negocio en PostgreSQL y server actions, y el estado en TanStack Query y Zustand. El catálogo se organiza por mercado.",
        decisions: [
          "Reconocer etiquetas gratis: el móvil lee con Tesseract.js, la base de datos identifica y el usuario confirma.",
          "No depender de ninguna API de pago de reconocimiento de imágenes.",
          "Convertir el registro en un juego con niveles, XP y logros.",
          "Eliminar los datos EXIF de las fotos y permitir borrar la cuenta por completo.",
        ],
        challenges: ["Identificar una cerveza a partir del texto imperfecto de una etiqueta.", "Reunir un catálogo fiable de cervezas comercializadas en España."],
      },
      en: {
        problem: "Remembering which beers you have tried, and which ones you actually liked, is harder than it sounds.",
        goals: ["Make it quick to log a beer.", "Keep a personal collection.", "Rate beers to decide what to order next time."],
        architecture:
          "Mobile-first PWA with Next.js, TypeScript and Supabase. The interface lives in components, business logic in PostgreSQL and server actions, and state in TanStack Query and Zustand. The catalogue is organised by market.",
        decisions: [
          "Recognise labels for free: the phone reads with Tesseract.js, the database identifies and the user confirms.",
          "Avoid depending on any paid image recognition API.",
          "Turn logging into a game with levels, XP and achievements.",
          "Strip EXIF data from photos and allow full account deletion.",
        ],
        challenges: ["Identifying a beer from a label's imperfect text.", "Building a reliable catalogue of the beers sold in Spain."],
      },
    },
  },
  {
    slug: "rally-legends-3d",
    appSlug: "rally-legends-3d",
    type: { es: "Videojuego", en: "Video game" },
    summary: {
      es: "Un juego de carreras arcade en Unity centrado en coches clásicos de rally y un manejo inmediato.",
      en: "An arcade racer in Unity built around classic rally cars and immediate handling.",
    },
    layout: "tall",
    tone: "light",
    caseStudy: {
      es: {
        problem: "Los juegos de carreras modernos tienden a la simulación. Rally Legends 3D vuelve a la conducción arcade de coger y jugar.",
        goals: ["Un manejo arcade divertido desde la primera vuelta.", "Los vehículos clásicos como protagonistas."],
        architecture: "Proyecto de Unity con la lógica de juego escrita en C#, organizado en módulos de vehículos, carreras, cámaras, audio, interfaz y guardado. La conducción usa WheelColliders, con versiones para PC y Android.",
        decisions: [
          "Generar cinco de los coches por código, con un estilo retro común.",
          "Añadir herramientas de editor para regenerar coches, compilar y verificar.",
          "Probar automáticamente las 24 combinaciones de coche y pista.",
        ],
        challenges: ["Conectar el catálogo de vehículos con las cuatro pistas para que el coche elegido aparezca con sus controles, cámara y HUD."],
      },
      en: {
        problem: "Modern racing games lean towards simulation. Rally Legends 3D goes back to pick-up-and-play arcade driving.",
        goals: ["Arcade handling that is fun from the first lap.", "Classic vehicles as the centrepiece."],
        architecture: "Unity project with gameplay code written in C#, organised into vehicle, racing, camera, audio, UI and save modules. Driving uses WheelColliders, with builds for PC and Android.",
        decisions: [
          "Generate five of the cars in code, with a shared retro style.",
          "Add editor tools to regenerate cars, build and verify.",
          "Automatically test all 24 car and track combinations.",
        ],
        challenges: ["Wiring the vehicle catalogue into all four tracks so the chosen car appears with its controls, camera and HUD."],
      },
    },
  },
  {
    slug: "teamoff",
    appSlug: "teamoff",
    type: { es: "App web de RR. HH.", en: "HR web app" },
    summary: {
      es: "Vacaciones, bajas y permisos de cada empresa, con saldos, aprobaciones y calendario de equipo.",
      en: "Each company's holidays, sick leave and permissions, with balances, approvals and a team calendar.",
    },
    layout: "square",
    tone: "light",
    caseStudy: {
      es: {
        problem: "Las ausencias de un equipo suelen controlarse con correos y hojas de cálculo, y es difícil saber quién está disponible o cuántos días le quedan a cada persona.",
        goals: ["Centralizar solicitudes y aprobaciones.", "Adaptar los tipos de ausencia a cada empresa.", "Dar una visión clara de la disponibilidad del equipo."],
        architecture:
          "Aplicación Next.js con TypeScript y Tailwind, con Recharts para los gráficos y SheetJS para exportar a Excel. La capa de datos está aislada para facilitar la migración de su almacén de demostración a una base de datos real. Existen además prototipos de cliente en WPF y .NET MAUI.",
        decisions: [
          "Hacerla multiempresa desde el registro, con un código de invitación por empresa.",
          "Tratar cada tipo de ausencia como configuración: cupo, retribución, justificante y aprobación automática.",
          "Aislar datos y autenticación para sustituirlos sin tocar el resto.",
        ],
        challenges: ["Validar saldos contando también las solicitudes pendientes.", "Detectar solapamientos y hacer compatibles los medios días."],
        nextSteps: ["Migrar a una base de datos real.", "Reforzar la autenticación y las reglas en servidor antes de publicarla."],
      },
      en: {
        problem: "Team absences are usually tracked through emails and spreadsheets, making it hard to know who is available or how many days each person has left.",
        goals: ["Centralise requests and approvals.", "Adapt absence types to each company.", "Give a clear view of team availability."],
        architecture:
          "Next.js application with TypeScript and Tailwind, with Recharts for charts and SheetJS for Excel export. The data layer is isolated to ease moving from its demo store to a real database. There are also client prototypes in WPF and .NET MAUI.",
        decisions: [
          "Make it multi-company from sign-up, with an invitation code per company.",
          "Treat each absence type as configuration: quota, pay, supporting document and auto-approval.",
          "Isolate data and authentication so they can be replaced without touching the rest.",
        ],
        challenges: ["Validating balances while counting pending requests too.", "Detecting overlaps and allowing compatible half days."],
        nextSteps: ["Move to a real database.", "Strengthen authentication and server-side rules before release."],
      },
    },
  },
  {
    slug: "cuadrilla-la-catola",
    appSlug: "cuadrilla-la-catola",
    type: { es: "Web de comunidad", en: "Community website" },
    summary: {
      es: "Historia, eventos, cultura y recuerdos de la Cuadrilla La Catola en Medina del Campo.",
      en: "The history, events, culture and memories of Cuadrilla La Catola in Medina del Campo.",
    },
    layout: "square",
    tone: "light",
    caseStudy: {
      es: {
        problem: "La historia, las fotos y los planes de una cuadrilla se reparten entre grupos de mensajería y redes sociales, sin un lugar propio donde reunirlos.",
        goals: ["Dar a la cuadrilla un sitio propio.", "Reunir historia, eventos, galería y noticias.", "Explicar cómo unirse."],
        architecture: "Web en Next.js con TypeScript y Tailwind CSS, desplegada en Netlify. Los contenidos viven en archivos de datos y el formulario para unirse usa una ruta de API propia.",
      },
      en: {
        problem: "A group's history, photos and plans are spread across messaging groups and social media, with no place of its own to bring them together.",
        goals: ["Give the group a place of its own.", "Bring together history, events, gallery and news.", "Explain how to join."],
        architecture: "Next.js website with TypeScript and Tailwind CSS, deployed on Netlify. Content lives in data files and the joining form uses its own API route.",
      },
    },
  },
  {
    slug: "prior",
    appSlug: "prior",
    type: { es: "App de productividad", en: "Productivity app" },
    summary: {
      es: "Proyectos y tareas organizados por prioridad, con una versión móvil en .NET MAUI y otra web.",
      en: "Projects and tasks organised by priority, with a .NET MAUI mobile version and a web version.",
    },
    layout: "square",
    tone: "dark",
    caseStudy: {
      es: {
        goals: ["Ver de un vistazo el progreso de cada proyecto.", "Decidir qué tarea atender primero.", "Conservar los datos en el propio dispositivo."],
        architecture: "La versión móvil usa .NET MAUI con MVVM (CommunityToolkit.Mvvm), SQLite y servicios separados para autenticación, proyectos, tareas y copias de seguridad. La versión web usa Next.js, Zustand y Dexie.",
      },
      en: {
        goals: ["See each project's progress at a glance.", "Decide which task to tackle first.", "Keep data on the device itself."],
        architecture: "The mobile version uses .NET MAUI with MVVM (CommunityToolkit.Mvvm), SQLite and separate services for authentication, projects, tasks and backups. The web version uses Next.js, Zustand and Dexie.",
      },
    },
  },
  {
    slug: "impostor",
    appSlug: "impostor",
    type: { es: "Juego web", en: "Browser game" },
    summary: {
      es: "Un juego de deducción social para compartir un dispositivo, repartir roles secretos y descubrir quién es el impostor.",
      en: "A social deduction game where players share a device, receive secret roles and uncover the impostor.",
    },
    layout: "square",
    tone: "dark",
    caseStudy: {
      es: {
        problem: "Los juegos de impostor suelen pedir cartas o una app por jugador. Aquí basta con un solo móvil que pasa de mano en mano.",
        goals: ["Jugar con un único dispositivo.", "Configurar jugadores, impostores y pistas.", "Empezar una partida en segundos."],
        architecture: "Web estática en HTML, CSS y JavaScript sin dependencias, con las palabras del juego en un archivo JSON.",
      },
      en: {
        problem: "Impostor games usually need cards or an app per player. Here a single phone passed from hand to hand is enough.",
        goals: ["Play on a single device.", "Configure players, impostors and clues.", "Start a game in seconds."],
        architecture: "Static website in HTML, CSS and JavaScript with no dependencies, with the game's words in a JSON file.",
      },
    },
  },
];
