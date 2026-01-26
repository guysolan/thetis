import type { Lang } from "../../config/languages";

interface TimelineBlock {
  time: string;
  title: string;
  content: string;
  variant?: "neutral";
  slug?: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface Content {
  title: string;
  description: string;
  timelineBlocks: TimelineBlock[];
  faqs: Faq[];
}

export const content: Record<Lang, Content> = {
  en: {
    title:
      "Achilles Tendon Rupture Recovery Timeline 2025: Week-by-Week Guide (Surgical & Non-Surgical)",
    description:
      "Comprehensive 2025 week-by-week timeline for Achilles tendon rupture recovery after surgery or non-surgical treatment – milestones, exercises, physiotherapy tips, and return-to-sport goals.",
    timelineBlocks: [
      {
        time: "Week 1",
        title: "Week 1: Initial Injury and Trauma Splint",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Initial Injury</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Immediate medical attention is crucial after an Achilles
                  tendon rupture. If you suspect you have ruptured your
                  Achilles, see our guide: <a
                    href="/FAQs/is-my-achilles-ruptured"
                    class="text-primary underline">Is My Achilles Ruptured?</a>
                </li>
                <li>
                  Accurate assessment of the injury severity is important to
                  rule out other injuries, such as a calf muscle tear.
                </li>
                <li>
                  Temporary immobilization with a plaster cast or <a
                    href="/trauma-splint"
                    class="text-primary underline">trauma splint</a>.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Emergency Care (A&E)</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Initial pain management. The initial "snap" is painful, but
                  this usually subsides quickly.
                </li>
                <li>
                  Trauma splint or plaster cast application to keep the foot in
                  a tip-toe position.
                </li>
                <li>You will likely be given crutches to help you walk.</li>
                <li>
                  Blood thinning medicine may be advised to prevent a blocked
                  vein (thrombosis).
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Medical Assessment</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Physical examination to assess the injury.</li>
                <li>Specialist referral for further care.</li>
              </ul>
            </li>
          </ul>`,
        slug: "week-0-1-first-week-after-achilles-rupture",
      },
      {
        time: "Weeks 1-3",
        title: "Weeks 1–3: Trauma Splint and Treatment Decision",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="mt-2 pb-1 font-semibold"
                >Specialist Consultation</span
              >
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Detailed examination to confirm the diagnosis of an Achilles
                  tendon rupture.
                </li>
                <li>
                  Imaging (usually an ultrasound scan) may be recommended to
                  ensure the tendon ends are close together. This helps
                  determine if surgery is an option.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Treatment Decision</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Non-surgical treatment (most common): The foot is held in a
                  tip-toe position with a boot to allow the tendon ends to heal
                  naturally.
                </li>
                <li>
                  Surgical treatment (some cases): Surgery may be considered if
                  there's a gap between the tendon ends. The goal is to bring
                  the ends together, but it doesn't make the tendon stronger or
                  speed up recovery. Learn more about the <a
                    href="/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Achilles Tear Treatment Pathway</a
                  >.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Initial Recovery Phase</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Boot fitting and adjustment to ensure the foot is in the
                  correct position. A <a
                    href="/night-splint"
                    class="text-primary underline">splint</a
                  > may be used to maintain proper foot position during sleep, if
                  the boot is uncomfortable.
                </li>
                <li>Learning to use crutches for balance while walking.</li>
                <li>
                  Non-weight bearing or partial weight-bearing as advised by
                  your healthcare provider.
                </li>
              </ul>
            </li>
          </ul>`,
        slug: "weeks-1-3-treatment-decision",
      },
      {
        time: "Weeks 4-6",
        title: "Weeks 4–6: Recovery Progress with Splint",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Recovery Progress</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Regular medical review to monitor healing.</li>
                <li>
                  Boot adjustments may begin to allow for a greater range of
                  motion, gradually reducing the tip-toe position. This is
                  usually done by removing wedges from the back of the boot.
                </li>
                <li>
                  If difficulty sleeping in the boot, a <a
                    href="/night-splint"
                    class="text-primary underline">splint</a
                  > may be used to maintain proper foot position during sleep. This
                  helps address the common complaint of sleeping in a heavy boot.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Mobility</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Continue following medical guidance for weight-bearing and
                  movement. Walking in the boot is generally encouraged.
                </li>
                <li>
                  Gradual progression of mobility exercises as advised by your
                  physiotherapist. Physiotherapy typically starts around 9-10
                  weeks after the injury.
                </li>
              </ul>
            </li>
          </ul>`,
        slug: "weeks-4-6-progressive-recovery",
      },
      {
        time: "Weeks 7-9",
        title: "Weeks 7–9: Continued Care and Monitoring",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Continued Care</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Regular monitoring of your Achilles tendon's healing progress.
                </li>
                <li>
                  Following the established treatment plan closely, including
                  boot adjustments.
                </li>
                <li>
                  Adjustments to the treatment plan as needed, based on your
                  progress and your healthcare provider's assessment. Learn more
                  about the options at <a
                    href="/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Achilles Tear Treatment Pathway</a
                  >.
                </li>
                <li>Continue using the splint for comfortable sleep.</li>
              </ul>
            </li>
          </ul>`,
        slug: "weeks-7-9-final-boot-phase",
      },
      {
        time: "Weeks 10-12",
        title: "Weeks 10–12: Starting Rehabilitation",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Rehabilitation Begins</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Starting physiotherapy to regain strength and flexibility. The
                  focus is on building calf muscle strength.
                </li>
                <li>
                  Transitioning from the boot to more regular footwear,
                  typically around 10 weeks.
                </li>
                <li>
                  Following a guided exercise program tailored to your specific
                  needs. Avoid vigorous stretching exercises, even if the tendon
                  feels tight. For a detailed look at the recovery process, see
                  our guide: <a
                    href="/FAQs/torn-achilles-recovery"
                    class="text-primary underline">Torn Achilles Recovery</a
                  >.
                </li>
              </ul>
            </li>
          </ul>`,
        slug: "weeks-10-12-boot-transition",
      },
      {
        time: "Weeks 13-25",
        title: "Weeks 13–25: Progressive Recovery and Strengthening",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Progressive Recovery</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Increasing activity levels gradually, under the guidance of
                  your physiotherapist.
                </li>
                <li>
                  Continuing to follow physiotherapy guidance to ensure proper
                  healing and regain strength.
                </li>
                <li>
                  Building strength and endurance in the calf and surrounding
                  muscles. This is a crucial phase for long-term recovery.
                </li>
              </ul>
            </li>
          </ul>`,
        slug: "weeks-13-25-progressive-strengthening",
      },
      {
        time: "Week 26+",
        title: "Weeks 26+: Return to Activity and Long-Term Recovery",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Return to Activity</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Gradual return to normal activities, including sports and
                  exercise, following medical advice. Most rehabilitation
                  programs aim for a return to sport around 6 months.
                </li>
                <li>
                  Individual progress varies, so listen to your body and avoid
                  pushing yourself too hard.
                </li>
                <li>
                  Understanding <a
                    href="/FAQs/life-after-achilles-rupture"
                    class="text-primary underline"
                    >Life After Achilles Rupture</a
                  > is key to maintaining long-term health and preventing re-injury.
                  The healed tendon will likely remain thicker than before, and the
                  calf muscle may be slightly smaller.
                </li>
                <li>
                  Be mindful of avoiding re-rupture. Follow all instructions
                  carefully, especially during the early stages of recovery.
                </li>
              </ul>
            </li>
          </ul>`,
        slug: "week-26-plus-return-to-sport",
      },
      {
        time: "Notes",
        title: "Important Notes",
        variant: "neutral",
        content: `<ul class="space-y-6 list-none">
            <li>
              Recovery timelines are approximate and can vary significantly
              depending on individual factors, such as age, overall health, and
              the severity of the injury.
            </li>
            <li>
              Always follow your healthcare provider's specific guidance and
              instructions. This timeline is a general guide, not a substitute
              for personalized medical advice.
            </li>
            <li>
              Attend all scheduled follow-up appointments to monitor your
              progress.
            </li>
            <li>
              There is NO SUCH THING as a partial tear of the Achilles tendon.
              Assume you have a complete rupture until a specialist has assessed
              your injury.
            </li>
          </ul>`,
      },
    ],
    faqs: [
      {
        question: "What happens in the first week after an Achilles rupture?",
        answer:
          "In the first week, you'll need immediate medical attention. You'll likely visit A&E where they'll provide initial pain management, apply a trauma splint or plaster cast to keep your foot in a tip-toe position, and give you crutches. Blood thinning medicine may be prescribed to prevent thrombosis. A specialist referral will be arranged for further care.",
      },
      {
        question:
          "When do I need to make the decision between surgical and non-surgical treatment?",
        answer:
          "The treatment decision is typically made during weeks 1-3 after consulting with a specialist. They'll perform a detailed examination and may request imaging (usually ultrasound) to check if the tendon ends are close together. Non-surgical treatment is most common, where the foot is held in a tip-toe position with a boot. Surgery is mainly considered if there's a significant gap between the tendon ends.",
      },
      {
        question: "When can I switch from the boot to a splint?",
        answer:
          "Around weeks 4-6, if you're having difficulty sleeping in the boot, your healthcare provider may recommend switching to a splint. The splint is lighter than the boot and helps maintain proper foot position during sleep while ensuring the tendon continues to heal correctly.",
      },
      {
        question:
          "When does physiotherapy typically begin in the recovery process?",
        answer:
          "Physiotherapy typically starts around weeks 10-12. This is when you'll begin transitioning out of the boot and start a guided exercise program focused on building calf muscle strength. It's important to follow your physiotherapist's guidance and avoid vigorous stretching exercises, even if the tendon feels tight.",
      },
      {
        question:
          "How long until I can return to sports after an Achilles rupture?",
        answer:
          "Most rehabilitation programs aim for a return to sports around 6 months (week 26+). However, this varies by individual and depends on your progress through rehabilitation. The focus during weeks 13-25 is on progressive strengthening and building endurance in the calf muscles, which is crucial for safe return to sports activities.",
      },
      {
        question: "What are the key milestones in Achilles rupture recovery?",
        answer:
          "Key milestones include: Week 1 (initial treatment and immobilization), Weeks 1-3 (treatment decision), Weeks 4-6 (possible transition to splint), Weeks 10-12 (starting physiotherapy and transitioning from the boot), Weeks 13-25 (progressive strengthening), and Week 26+ (gradual return to normal activities including sports).",
      },
      {
        question:
          "What precautions should I take to prevent re-rupture during recovery?",
        answer:
          "To prevent re-rupture, strictly follow your healthcare provider's instructions, especially during the first 12 weeks when the tendon is most vulnerable. Don't remove the boot unless instructed, avoid unsupported walking, and don't rush the rehabilitation process. When starting physiotherapy, avoid aggressive stretching and follow your exercise program carefully.",
      },
      {
        question: "How do I know if my Achilles is healing properly?",
        answer:
          "Your healthcare provider will monitor healing through regular check-ups, particularly during the first 9 weeks. Signs of proper healing include decreased pain, ability to bear weight as advised in your boot, and gradual improvement in movement when permitted. However, remember there is NO SUCH THING as a partial tear - always follow your specialist's guidance for proper healing assessment.",
      },
    ],
  },
  es: {
    title:
      "Cronograma de recuperación de la rotura del tendón de Aquiles 2025: Guía semana a semana (quirúrgica y no quirúrgica)",
    description:
      "Cronograma completo semana a semana de 2025 para la recuperación de la rotura del tendón de Aquiles después de una cirugía o tratamiento no quirúrgico: hitos, ejercicios, consejos de fisioterapia y objetivos de regreso al deporte.",
    timelineBlocks: [
      {
        time: "Semana 1",
        title: "Semana 1: Lesión inicial y férula de trauma",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Lesión inicial</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  La atención médica inmediata es crucial después de una rotura del tendón de Aquiles. Si sospecha que se ha roto el tendón de Aquiles, consulte nuestra guía: <a
                    href="/es/FAQs/is-my-achilles-ruptured"
                    class="text-primary underline">¿Se me ha roto el tendón de Aquiles?</a>
                </li>
                <li>
                  La evaluación precisa de la gravedad de la lesión es importante para descartar otras lesiones, como un desgarro del músculo de la pantorrilla.
                </li>
                <li>
                  Inmovilización temporal con un yeso o <a
                    href="/es/trauma-splint"
                    class="text-primary underline">férula de trauma</a>.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Atención de emergencia (Urgencias)</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Manejo inicial del dolor. El "chasquido" inicial es doloroso, pero esto generalmente desaparece rápidamente.
                </li>
                <li>
                  Aplicación de férula de trauma o yeso para mantener el pie en posición de puntillas.
                </li>
                <li>Probablemente le darán muletas para ayudarle a caminar.</li>
                <li>
                  Se puede recomendar un medicamento anticoagulante para prevenir una vena bloqueada (trombosis).
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Evaluación médica</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Examen físico para evaluar la lesión.</li>
                <li>Derivación a un especialista para recibir más atención.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semanas 1-3",
        title: "Semanas 1–3: Férula de trauma y decisión de tratamiento",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="mt-2 pb-1 font-semibold"
                >Consulta con especialista</span
              >
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Examen detallado para confirmar el diagnóstico de una rotura del tendón de Aquiles.
                </li>
                <li>
                  Se pueden recomendar imágenes (generalmente una ecografía) para asegurar que los extremos del tendón estén juntos. Esto ayuda a determinar si la cirugía es una opción.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Decisión de tratamiento</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Tratamiento no quirúrgico (más común): El pie se mantiene en posición de puntillas con una bota para permitir que los extremos del tendón sanen naturalmente.
                </li>
                <li>
                  Tratamiento quirúrgico (algunos casos): Se puede considerar la cirugía si hay un espacio entre los extremos del tendón. El objetivo es unir los extremos, pero no fortalece el tendón ni acelera la recuperación. Obtenga más información sobre la <a
                    href="/es/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Vía de tratamiento del desgarro de Aquiles</a
                  >.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Fase de recuperación inicial</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Ajuste y colocación de la bota para asegurar que el pie esté en la posición correcta. Se puede usar una <a
                    href="/es/night-splint"
                    class="text-primary underline">férula</a>
                   para mantener la posición adecuada del pie durante el sueño, si la bota es incómoda.
                </li>
                <li>Aprender a usar muletas para mantener el equilibrio al caminar.</li>
                <li>
                  Sin carga de peso o con carga parcial según las indicaciones de su proveedor de atención médica.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semanas 4-6",
        title: "Semanas 4–6: Progreso de la recuperación con férula",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Progreso de la recuperación</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Revisión médica periódica para controlar la curación.</li>
                <li>
                  Los ajustes de la bota pueden comenzar a permitir un mayor rango de movimiento, reduciendo gradualmente la posición de puntillas. Esto generalmente se hace quitando cuñas de la parte posterior de la bota.
                </li>
                <li>
                  Si tiene dificultades para dormir con la bota, se puede usar una <a
                    href="/es/night-splint"
                    class="text-primary underline">férula</a>
                   para mantener la posición adecuada del pie durante el sueño. Esto ayuda a solucionar la queja común de dormir con una bota pesada.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Movilidad</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Continúe siguiendo las indicaciones médicas para la carga de peso y el movimiento. Generalmente se recomienda caminar con la bota.
                </li>
                <li>
                  Progresión gradual de los ejercicios de movilidad según las indicaciones de su fisioterapeuta. La fisioterapia generalmente comienza alrededor de 9-10 semanas después de la lesión.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semanas 7-9",
        title: "Semanas 7–9: Atención y seguimiento continuos",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Atención continua</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Seguimiento regular del progreso de curación de su tendón de Aquiles.
                </li>
                <li>
                  Seguir de cerca el plan de tratamiento establecido, incluidos los ajustes de la bota.
                </li>
                <li>
                  Ajustes al plan de tratamiento según sea necesario, en función de su progreso y la evaluación de su proveedor de atención médica. Obtenga más información sobre las opciones en <a
                    href="/es/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Vía de tratamiento del desgarro de Aquiles</a
                  >.
                </li>
                <li>Continúe usando la férula para dormir cómodamente.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semanas 10-12",
        title: "Semanas 10–12: Inicio de la rehabilitación",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Comienza la rehabilitación</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Inicio de la fisioterapia para recuperar la fuerza y la flexibilidad. El objetivo es fortalecer los músculos de la pantorrilla.
                </li>
                <li>
                  Transición de la bota a un calzado más regular, generalmente alrededor de las 10 semanas.
                </li>
                <li>
                  Seguir un programa de ejercicios guiado y adaptado a sus necesidades específicas. Evite los ejercicios de estiramiento vigorosos, incluso si siente el tendón tenso. Para un análisis detallado del proceso de recuperación, consulte nuestra guía: <a
                    href="/es/FAQs/torn-achilles-recovery"
                    class="text-primary underline">Recuperación del desgarro de Aquiles</a
                  >.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semanas 13-25",
        title: "Semanas 13–25: Recuperación progresiva y fortalecimiento",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Recuperación progresiva</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Aumento gradual de los niveles de actividad, bajo la guía de su fisioterapeuta.
                </li>
                <li>
                  Continuar siguiendo las indicaciones de fisioterapia para asegurar una curación adecuada y recuperar la fuerza.
                </li>
                <li>
                  Fortalecimiento y resistencia de la pantorrilla y los músculos circundantes. Esta es una fase crucial para la recuperación a largo plazo.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semana 26+",
        title:
          "Semanas 26+: Regreso a la actividad y recuperación a largo plazo",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Regreso a la actividad</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Regreso gradual a las actividades normales, incluidos los deportes y el ejercicio, siguiendo las indicaciones médicas. La mayoría de los programas de rehabilitación tienen como objetivo el regreso al deporte alrededor de los 6 meses.
                </li>
                <li>
                  El progreso individual varía, así que escuche a su cuerpo y evite esforzarse demasiado.
                </li>
                <li>
                  Comprender <a
                    href="/es/FAQs/life-after-achilles-rupture"
                    class="text-primary underline"
                    >La vida después de la rotura de Aquiles</a
                  > es clave para mantener la salud a largo plazo y prevenir una nueva lesión.
                  El tendón curado probablemente permanecerá más grueso que antes, y el músculo de la pantorrilla puede ser un poco más pequeño.
                </li>
                <li>
                  Tenga cuidado de evitar una nueva rotura. Siga todas las instrucciones cuidadosamente, especialmente durante las primeras etapas de la recuperación.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Notas",
        title: "Notas importantes",
        variant: "neutral",
        content: `<ul class="space-y-6 list-none">
            <li>
              Los plazos de recuperación son aproximados y pueden variar significativamente según factores individuales, como la edad, la salud general y la gravedad de la lesión.
            </li>
            <li>
              Siga siempre las indicaciones e instrucciones específicas de su proveedor de atención médica. Este cronograma es una guía general, no un sustituto del consejo médico personalizado.
            </li>
            <li>
              Asista a todas las citas de seguimiento programadas para controlar su progreso.
            </li>
            <li>
              NO EXISTE tal cosa como un desgarro parcial del tendón de Aquiles.
              Asuma que tiene una rotura completa hasta que un especialista haya evaluado su lesión.
            </li>
          </ul>`,
      },
    ],
    faqs: [
      {
        question:
          "¿Qué sucede en la primera semana después de una rotura de Aquiles?",
        answer:
          "En la primera semana, necesitará atención médica inmediata. Probablemente visitará Urgencias, donde le proporcionarán un tratamiento inicial para el dolor, le aplicarán una férula de trauma o un yeso para mantener el pie en posición de puntillas y le darán muletas. Se le puede recetar un medicamento anticoagulante para prevenir la trombosis. Se organizará una derivación a un especialista para recibir más atención.",
      },
      {
        question:
          "¿Cuándo debo tomar la decisión entre el tratamiento quirúrgico y no quirúrgico?",
        answer:
          "La decisión sobre el tratamiento generalmente se toma durante las semanas 1-3 después de consultar con un especialista. Realizarán un examen detallado y pueden solicitar imágenes (generalmente una ecografía) para verificar si los extremos del tendón están juntos. El tratamiento no quirúrgico es el más común, en el que el pie se mantiene en posición de puntillas con una bota. La cirugía se considera principalmente si hay un espacio significativo entre los extremos del tendón.",
      },
      {
        question: "¿Cuándo puedo cambiar de la bota a una férula?",
        answer:
          "Alrededor de las semanas 4-6, si tiene dificultades para dormir con la bota, su proveedor de atención médica puede recomendarle que cambie a una férula. La férula es más ligera que la bota y ayuda a mantener la posición adecuada del pie durante el sueño, al tiempo que garantiza que el tendón continúe sanando correctamente.",
      },
      {
        question:
          "¿Cuándo comienza típicamente la fisioterapia en el proceso de recuperación?",
        answer:
          "La fisioterapia generalmente comienza alrededor de las semanas 10-12. Es entonces cuando comenzará a dejar la bota y comenzará un programa de ejercicios guiado centrado en fortalecer los músculos de la pantorrilla. Es importante seguir las indicaciones de su fisioterapeuta y evitar los ejercicios de estiramiento vigorosos, incluso si siente el tendón tenso.",
      },
      {
        question:
          "¿Cuánto tiempo pasará hasta que pueda volver a practicar deportes después de una rotura de Aquiles?",
        answer:
          "La mayoría de los programas de rehabilitación tienen como objetivo el regreso a los deportes alrededor de los 6 meses (semana 26+). Sin embargo, esto varía según el individuo y depende de su progreso en la rehabilitación. El enfoque durante las semanas 13-25 es el fortalecimiento progresivo y el desarrollo de la resistencia en los músculos de la pantorrilla, lo cual es crucial para un regreso seguro a las actividades deportivas.",
      },
      {
        question:
          "¿Cuáles son los hitos clave en la recuperación de la rotura de Aquiles?",
        answer:
          "Los hitos clave incluyen: Semana 1 (tratamiento inicial e inmovilización), Semanas 1-3 (decisión del tratamiento), Semanas 4-6 (posible transición a una férula), Semanas 10-12 (inicio de la fisioterapia y transición de la bota), Semanas 13-25 (fortalecimiento progresivo) y Semana 26+ (regreso gradual a las actividades normales, incluidos los deportes).",
      },
      {
        question:
          "¿Qué precauciones debo tomar para prevenir una nueva rotura durante la recuperación?",
        answer:
          "Para prevenir una nueva rotura, siga estrictamente las instrucciones de su proveedor de atención médica, especialmente durante las primeras 12 semanas, cuando el tendón es más vulnerable. No se quite la bota a menos que se lo indiquen, evite caminar sin apoyo y no se apresure en el proceso de rehabilitación. Al comenzar la fisioterapia, evite los estiramientos agresivos y siga su programa de ejercicios con cuidado.",
      },
      {
        question:
          "¿Cómo sé si mi tendón de Aquiles está sanando correctamente?",
        answer:
          "Su proveedor de atención médica controlará la curación a través de controles periódicos, especialmente durante las primeras 9 semanas. Los signos de una curación adecuada incluyen disminución del dolor, capacidad para soportar peso según las indicaciones en su bota y una mejora gradual del movimiento cuando se lo permitan. Sin embargo, recuerde que NO EXISTE tal cosa como un desgarro parcial; siga siempre las indicaciones de su especialista para una evaluación adecuada de la curación.",
      },
    ],
  },
  fr: {
    title:
      "Calendrier de récupération de la rupture du tendon d'Achille 2025 : Guide semaine par semaine (chirurgical et non chirurgical)",
    description:
      "Calendrier complet semaine par semaine de 2025 pour la récupération de la rupture du tendon d'Achille après une intervention chirurgicale ou un traitement non chirurgical – jalons, exercices, conseils de physiothérapie et objectifs de retour au sport.",
    timelineBlocks: [
      {
        time: "Semaine 1",
        title: "Semaine 1 : Blessure initiale et attelle de traumatologie",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Blessure initiale</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Une attention médicale immédiate est cruciale après une rupture du tendon d'Achille. Si vous pensez avoir une rupture du tendon d'Achille, consultez notre guide : <a
                    href="/fr/FAQs/is-my-achilles-ruptured"
                    class="text-primary underline">Mon tendon d'Achille est-il rompu ?</a>
                </li>
                <li>
                  Une évaluation précise de la gravité de la blessure est importante pour écarter d'autres blessures, telles qu'une déchirure du muscle du mollet.
                </li>
                <li>
                  Immobilisation temporaire avec un plâtre ou une <a
                    href="/fr/trauma-splint"
                    class="text-primary underline">attelle de traumatologie</a>.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Soins d'urgence (A&E)</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Gestion initiale de la douleur. Le "claquement" initial est douloureux, mais cela disparaît généralement rapidement.
                </li>
                <li>
                  Application d'une attelle de traumatologie ou d'un plâtre pour maintenir le pied en position de pointe.
                </li>
                <li>On vous donnera probablement des béquilles pour vous aider à marcher.</li>
                <li>
                  Un médicament anticoagulant peut être conseillé pour prévenir une veine bouchée (thrombose).
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Évaluation médicale</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Examen physique pour évaluer la blessure.</li>
                <li>Orientation vers un spécialiste pour des soins supplémentaires.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semaines 1-3",
        title:
          "Semaines 1–3 : Attelle de traumatologie et décision de traitement",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="mt-2 pb-1 font-semibold"
                >Consultation chez un spécialiste</span
              >
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Examen détaillé pour confirmer le diagnostic d'une rupture du tendon d'Achille.
                </li>
                <li>
                  L'imagerie (généralement une échographie) peut être recommandée pour s'assurer que les extrémités du tendon sont proches l'une de l'autre. Cela aide à déterminer si la chirurgie est une option.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Décision de traitement</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Traitement non chirurgical (le plus courant) : Le pied est maintenu en position de pointe avec une botte pour permettre aux extrémités du tendon de guérir naturellement.
                </li>
                <li>
                  Traitement chirurgical (certains cas) : La chirurgie peut être envisagée s'il y a un écart entre les extrémités du tendon. Le but est de rapprocher les extrémités, mais cela ne rend pas le tendon plus fort ni n'accélère la récupération. En savoir plus sur le <a
                    href="/fr/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Parcours de traitement de la déchirure d'Achille</a
                  >.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Phase de récupération initiale</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Ajustement et mise en place de la botte pour s'assurer que le pied est dans la bonne position. Une <a
                    href="/fr/night-splint"
                    class="text-primary underline">attelle</a>
                   peut être utilisée pour maintenir une bonne position du pied pendant le sommeil, si la botte est inconfortable.
                </li>
                <li>Apprendre à utiliser des béquilles pour l'équilibre en marchant.</li>
                <li>
                  Mise en charge nulle ou partielle selon les conseils de votre professionnel de la santé.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semaines 4-6",
        title: "Semaines 4–6 : Progrès de la récupération avec une attelle",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Progrès de la récupération</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Examen médical régulier pour surveiller la guérison.</li>
                <li>
                  Les ajustements de la botte peuvent commencer à permettre une plus grande amplitude de mouvement, en réduisant progressivement la position de la pointe des pieds. Cela se fait généralement en retirant des cales de l'arrière de la botte.
                </li>
                <li>
                  En cas de difficulté à dormir dans la botte, une <a
                    href="/fr/night-splint"
                    class="text-primary underline">attelle</a>
                   peut être utilisée pour maintenir une bonne position du pied pendant le sommeil. Cela aide à résoudre le problème courant de dormir dans une botte lourde.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Mobilité</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Continuez à suivre les conseils médicaux pour la mise en charge et le mouvement. La marche dans la botte est généralement encouragée.
                </li>
                <li>
                  Progression graduelle des exercices de mobilité selon les conseils de votre physiothérapeute. La physiothérapie commence généralement environ 9 à 10 semaines après la blessure.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semaines 7-9",
        title: "Semaines 7–9 : Soins et surveillance continus",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Soins continus</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Surveillance régulière de la progression de la guérison de votre tendon d'Achille.
                </li>
                <li>
                  Suivre de près le plan de traitement établi, y compris les ajustements de la botte.
                </li>
                <li>
                  Ajustements du plan de traitement au besoin, en fonction de vos progrès et de l'évaluation de votre professionnel de la santé. En savoir plus sur les options sur <a
                    href="/fr/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Parcours de traitement de la déchirure d'Achille</a
                  >.
                </li>
                <li>Continuez à utiliser l'attelle pour un sommeil confortable.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semaines 10-12",
        title: "Semaines 10–12 : Début de la rééducation",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">La rééducation commence</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Début de la physiothérapie pour retrouver force et souplesse. L'accent est mis sur le renforcement des muscles du mollet.
                </li>
                <li>
                  Passage de la botte à des chaussures plus classiques, généralement vers 10 semaines.
                </li>
                <li>
                  Suivre un programme d'exercices guidé adapté à vos besoins spécifiques. Évitez les exercices d'étirement vigoureux, même si le tendon semble raide. Pour un aperçu détaillé du processus de récupération, consultez notre guide : <a
                    href="/fr/FAQs/torn-achilles-recovery"
                    class="text-primary underline">Récupération d'une déchirure d'Achille</a
                  >.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semaines 13-25",
        title: "Semaines 13–25 : Récupération progressive et renforcement",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Récupération progressive</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Augmentation progressive des niveaux d'activité, sous la direction de votre physiothérapeute.
                </li>
                <li>
                  Continuer à suivre les conseils de physiothérapie pour assurer une bonne guérison et retrouver de la force.
                </li>
                <li>
                  Renforcement de la force et de l'endurance du mollet et des muscles environnants. C'est une phase cruciale pour la récupération à long terme.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Semaine 26+",
        title:
          "Semaines 26+ : Retour à l'activité et récupération à long terme",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Retour à l'activité</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Retour progressif aux activités normales, y compris les sports et l'exercice, en suivant les conseils médicaux. La plupart des programmes de rééducation visent un retour au sport vers 6 mois.
                </li>
                <li>
                  Les progrès individuels varient, alors écoutez votre corps et évitez de trop forcer.
                </li>
                <li>
                  Comprendre <a
                    href="/fr/FAQs/life-after-achilles-rupture"
                    class="text-primary underline"
                    >La vie après une rupture d'Achille</a
                  > est essentiel pour maintenir la santé à long terme et prévenir les récidives.
                  Le tendon guéri restera probablement plus épais qu'auparavant, et le muscle du mollet pourrait être légèrement plus petit.
                </li>
                <li>
                  Faites attention à éviter une nouvelle rupture. Suivez attentivement toutes les instructions, en particulier pendant les premières étapes de la récupération.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Remarques",
        title: "Remarques importantes",
        variant: "neutral",
        content: `<ul class="space-y-6 list-none">
            <li>
              Les délais de récupération sont approximatifs et peuvent varier considérablement en fonction de facteurs individuels, tels que l'âge, l'état de santé général et la gravité de la blessure.
            </li>
            <li>
              Suivez toujours les conseils et instructions spécifiques de votre professionnel de la santé. Ce calendrier est un guide général, pas un substitut à un avis médical personnalisé.
            </li>
            <li>
              Assistez à tous les rendez-vous de suivi prévus pour surveiller vos progrès.
            </li>
            <li>
              Il n'y a PAS de déchirure partielle du tendon d'Achille.
              Supposez que vous avez une rupture complète jusqu'à ce qu'un spécialiste ait évalué votre blessure.
            </li>
          </ul>`,
      },
    ],
    faqs: [
      {
        question:
          "Que se passe-t-il la première semaine après une rupture du tendon d'Achille ?",
        answer:
          "La première semaine, vous aurez besoin de soins médicaux immédiats. Vous vous rendrez probablement aux urgences où l'on vous administrera un traitement initial contre la douleur, on vous posera une attelle de traumatologie ou un plâtre pour maintenir votre pied en position de pointe et on vous donnera des béquilles. Un médicament anticoagulant peut être prescrit pour prévenir la thrombose. Une orientation vers un spécialiste sera organisée pour des soins supplémentaires.",
      },
      {
        question:
          "Quand dois-je prendre la décision entre un traitement chirurgical et non chirurgical ?",
        answer:
          "La décision de traitement est généralement prise entre la 1re et la 3e semaine après consultation avec un spécialiste. Il effectuera un examen détaillé et pourra demander une imagerie (généralement une échographie) pour vérifier si les extrémités du tendon sont proches. Le traitement non chirurgical est le plus courant, où le pied est maintenu en position de pointe avec une botte. La chirurgie n'est envisagée que s'il y a un écart important entre les extrémités du tendon.",
      },
      {
        question: "Quand puis-je passer de la botte à une attelle ?",
        answer:
          "Vers les semaines 4 à 6, si vous avez des difficultés à dormir dans la botte, votre professionnel de la santé peut vous recommander de passer à une attelle. L'attelle est plus légère que la botte et aide à maintenir une bonne position du pied pendant le sommeil tout en assurant la bonne cicatrisation du tendon.",
      },
      {
        question:
          "Quand la physiothérapie commence-t-elle généralement dans le processus de récupération ?",
        answer:
          "La physiothérapie commence généralement vers les semaines 10 à 12. C'est à ce moment-là que vous commencerez à abandonner la botte et à commencer un programme d'exercices guidé axé sur le renforcement des muscles du mollet. Il est important de suivre les conseils de votre physiothérapeute et d'éviter les exercices d'étirement vigoureux, même si le tendon semble raide.",
      },
      {
        question:
          "Combien de temps avant de pouvoir reprendre le sport après une rupture du tendon d'Achille ?",
        answer:
          "La plupart des programmes de rééducation visent un retour au sport vers 6 mois (semaine 26+). Cependant, cela varie d'un individu à l'autre et dépend de vos progrès en rééducation. L'accent pendant les semaines 13 à 25 est mis sur le renforcement progressif et le développement de l'endurance des muscles du mollet, ce qui est crucial pour un retour en toute sécurité aux activités sportives.",
      },
      {
        question:
          "Quels sont les jalons clés de la récupération d'une rupture du tendon d'Achille ?",
        answer:
          "Les jalons clés comprennent : Semaine 1 (traitement initial et immobilisation), Semaines 1-3 (décision de traitement), Semaines 4-6 (transition possible vers une attelle), Semaines 10-12 (début de la physiothérapie et transition de la botte), Semaines 13-25 (renforcement progressif) et Semaine 26+ (retour progressif aux activités normales, y compris le sport).",
      },
      {
        question:
          "Quelles précautions dois-je prendre pour éviter une nouvelle rupture pendant la récupération ?",
        answer:
          "Pour éviter une nouvelle rupture, suivez scrupuleusement les instructions de votre professionnel de la santé, en particulier pendant les 12 premières semaines où le tendon est le plus vulnérable. Ne retirez pas la botte sans instruction, évitez de marcher sans soutien et ne précipitez pas le processus de rééducation. Lorsque vous commencez la physiothérapie, évitez les étirements agressifs et suivez attentivement votre programme d'exercices.",
      },
      {
        question:
          "Comment savoir si mon tendon d'Achille guérit correctement ?",
        answer:
          "Votre professionnel de la santé surveillera la guérison par des contrôles réguliers, en particulier pendant les 9 premières semaines. Les signes d'une bonne guérison comprennent une diminution de la douleur, la capacité de supporter du poids comme conseillé dans votre botte et une amélioration progressive du mouvement lorsque cela est autorisé. Cependant, n'oubliez pas qu'il n'existe PAS de déchirure partielle - suivez toujours les conseils de votre spécialiste pour une évaluation correcte de la guérison.",
      },
    ],
  },
  de: {
    title:
      "Achillessehnenriss-Heilungszeitplan 2025: Woche-für-Woche-Anleitung (chirurgisch & nicht-chirurgisch)",
    description:
      "Umfassender Woche-für-Woche-Zeitplan für 2025 für die Genesung von einem Achillessehnenriss nach einer Operation oder einer nicht-chirurgischen Behandlung – Meilensteine, Übungen, Physiotherapie-Tipps und Ziele für die Rückkehr zum Sport.",
    timelineBlocks: [
      {
        time: "Woche 1",
        title: "Woche 1: Erstverletzung und Traumaschiene",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Erstverletzung</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Nach einem Achillessehnenriss ist sofortige ärztliche Hilfe entscheidend. Wenn Sie vermuten, dass Ihre Achillessehne gerissen ist, lesen Sie unseren Leitfaden: <a
                    href="/de/FAQs/is-my-achilles-ruptured"
                    class="text-primary underline">Ist meine Achillessehne gerissen?</a>
                </li>
                <li>
                  Eine genaue Beurteilung der Verletzungsschwere ist wichtig, um andere Verletzungen, wie z. B. einen Wadenmuskelriss, auszuschließen.
                </li>
                <li>
                  Vorübergehende Ruhigstellung mit einem Gipsverband oder einer <a
                    href="/de/trauma-splint"
                    class="text-primary underline">Traumaschiene</a>.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Notfallversorgung (A&E)</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Initiale Schmerzbehandlung. Der anfängliche "Knall" ist schmerzhaft, lässt aber in der Regel schnell nach.
                </li>
                <li>
                  Anlegen einer Traumaschiene oder eines Gipsverbandes, um den Fuß in einer Zehenspitzenposition zu halten.
                </li>
                <li>Sie werden wahrscheinlich Krücken erhalten, um Ihnen beim Gehen zu helfen.</li>
                <li>
                  Zur Vorbeugung einer Venenverstopfung (Thrombose) kann ein blutverdünnendes Medikament empfohlen werden.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Ärztliche Untersuchung</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Körperliche Untersuchung zur Beurteilung der Verletzung.</li>
                <li>Überweisung an einen Spezialisten zur weiteren Behandlung.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Wochen 1-3",
        title: "Wochen 1–3: Traumaschiene und Behandlungsentscheidung",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="mt-2 pb-1 font-semibold"
                >Facharztkonsultation</span
              >
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Detaillierte Untersuchung zur Bestätigung der Diagnose eines Achillessehnenrisses.
                </li>
                <li>
                  Eine Bildgebung (in der Regel eine Ultraschalluntersuchung) kann empfohlen werden, um sicherzustellen, dass die Sehnenenden nahe beieinander liegen. Dies hilft bei der Entscheidung, ob eine Operation eine Option ist.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Behandlungsentscheidung</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Nicht-chirurgische Behandlung (am häufigsten): Der Fuß wird in einer Zehenspitzenposition mit einem Stiefel gehalten, damit die Sehnenenden auf natürliche Weise heilen können.
                </li>
                <li>
                  Chirurgische Behandlung (in einigen Fällen): Eine Operation kann in Betracht gezogen werden, wenn eine Lücke zwischen den Sehnenenden besteht. Ziel ist es, die Enden zusammenzuführen, aber es macht die Sehne nicht stärker oder beschleunigt die Genesung. Erfahren Sie mehr über den <a
                    href="/de/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Behandlungspfad für Achillessehnenrisse</a
                  >.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Initiale Erholungsphase</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Anpassung und Einstellung des Stiefels, um sicherzustellen, dass sich der Fuß in der richtigen Position befindet. Eine <a
                    href="/de/night-splint"
                    class="text-primary underline">Schiene</a>
                   kann verwendet werden, um die richtige Fußposition während des Schlafs beizubehalten, wenn der Stiefel unbequem ist.
                </li>
                <li>Lernen, Krücken zum Gleichgewicht beim Gehen zu benutzen.</li>
                <li>
                  Keine oder teilweise Gewichtsbelastung nach Anweisung Ihres Arztes.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Wochen 4-6",
        title: "Wochen 4–6: Genesungsfortschritt mit Schiene",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Genesungsfortschritt</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Regelmäßige ärztliche Kontrolle zur Überwachung der Heilung.</li>
                <li>
                  Anpassungen des Stiefels können beginnen, um einen größeren Bewegungsumfang zu ermöglichen, wobei die Zehenspitzenposition allmählich reduziert wird. Dies geschieht in der Regel durch Entfernen von Keilen aus der Rückseite des Stiefels.
                </li>
                <li>
                  Bei Schlafschwierigkeiten im Stiefel kann eine <a
                    href="/de/night-splint"
                    class="text-primary underline">Schiene</a>
                   verwendet werden, um die richtige Fußposition während des Schlafs beizubehalten. Dies hilft, die häufige Beschwerde über das Schlafen in einem schweren Stiefel zu beheben.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Mobilität</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Befolgen Sie weiterhin die ärztlichen Anweisungen zur Gewichtsbelastung und Bewegung. Das Gehen im Stiefel wird im Allgemeinen gefördert.
                </li>
                <li>
                  Allmähliche Steigerung der Mobilitätsübungen nach Anweisung Ihres Physiotherapeuten. Die Physiotherapie beginnt in der Regel etwa 9-10 Wochen nach der Verletzung.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Wochen 7-9",
        title: "Wochen 7–9: Fortgesetzte Pflege und Überwachung",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Fortgesetzte Pflege</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Regelmäßige Überwachung des Heilungsfortschritts Ihrer Achillessehne.
                </li>
                <li>
                  Genaues Befolgen des etablierten Behandlungsplans, einschließlich Anpassungen des Stiefels.
                </li>
                <li>
                  Anpassungen des Behandlungsplans nach Bedarf, basierend auf Ihrem Fortschritt und der Beurteilung Ihres Arztes. Erfahren Sie mehr über die Optionen unter <a
                    href="/de/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Behandlungspfad für Achillessehnenrisse</a
                  >.
                </li>
                <li>Verwenden Sie die Schiene weiterhin für einen angenehmen Schlaf.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Wochen 10-12",
        title: "Wochen 10–12: Beginn der Rehabilitation",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Rehabilitation beginnt</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Beginn der Physiotherapie zur Wiedererlangung von Kraft und Flexibilität. Der Schwerpunkt liegt auf dem Aufbau der Wadenmuskulatur.
                </li>
                <li>
                  Übergang vom Stiefel zu normalerem Schuhwerk, in der Regel nach etwa 10 Wochen.
                </li>
                <li>
                  Befolgen eines geführten Übungsprogramms, das auf Ihre spezifischen Bedürfnisse zugeschnitten ist. Vermeiden Sie kräftige Dehnübungen, auch wenn sich die Sehne angespannt anfühlt. Eine detaillierte Beschreibung des Genesungsprozesses finden Sie in unserem Leitfaden: <a
                    href="/de/FAQs/torn-achilles-recovery"
                    class="text-primary underline">Genesung nach Achillessehnenriss</a
                  >.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Wochen 13-25",
        title: "Wochen 13–25: Progressive Genesung und Stärkung",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Progressive Genesung</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Allmähliche Steigerung des Aktivitätsniveaus unter Anleitung Ihres Physiotherapeuten.
                </li>
                <li>
                  Weiteres Befolgen der physiotherapeutischen Anleitung, um eine ordnungsgemäße Heilung zu gewährleisten und die Kraft wiederzugewinnen.
                </li>
                <li>
                  Aufbau von Kraft und Ausdauer in der Wade und den umliegenden Muskeln. Dies ist eine entscheidende Phase für die langfristige Genesung.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Woche 26+",
        title: "Wochen 26+: Rückkehr zur Aktivität und langfristige Genesung",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Rückkehr zur Aktivität</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Allmähliche Rückkehr zu normalen Aktivitäten, einschließlich Sport und Bewegung, nach ärztlicher Anweisung. Die meisten Rehabilitationsprogramme zielen auf eine Rückkehr zum Sport nach etwa 6 Monaten ab.
                </li>
                <li>
                  Der individuelle Fortschritt ist unterschiedlich, also hören Sie auf Ihren Körper und vermeiden Sie es, sich zu sehr anzustrengen.
                </li>
                <li>
                  Das Verständnis von <a
                    href="/de/FAQs/life-after-achilles-rupture"
                    class="text-primary underline"
                    >Leben nach einem Achillessehnenriss</a
                  > ist der Schlüssel zur Aufrechterhaltung der langfristigen Gesundheit und zur Vorbeugung von Wiederverletzungen.
                  Die verheilte Sehne bleibt wahrscheinlich dicker als zuvor, und der Wadenmuskel kann etwas kleiner sein.
                </li>
                <li>
                  Achten Sie darauf, einen erneuten Riss zu vermeiden. Befolgen Sie alle Anweisungen sorgfältig, insbesondere in den frühen Stadien der Genesung.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Hinweise",
        title: "Wichtige Hinweise",
        variant: "neutral",
        content: `<ul class="space-y-6 list-none">
            <li>
              Die Genesungszeiten sind ungefähre Angaben und können je nach individuellen Faktoren wie Alter, allgemeinem Gesundheitszustand und Schwere der Verletzung erheblich variieren.
            </li>
            <li>
              Befolgen Sie immer die spezifischen Anleitungen und Anweisungen Ihres Arztes. Dieser Zeitplan ist eine allgemeine Anleitung, kein Ersatz für eine persönliche medizinische Beratung.
            </li>
            <li>
              Nehmen Sie alle geplanten Nachsorgetermine wahr, um Ihren Fortschritt zu überwachen.
            </li>
            <li>
              Es gibt KEINEN teilweisen Riss der Achillessehne.
              Gehen Sie von einem vollständigen Riss aus, bis ein Spezialist Ihre Verletzung beurteilt hat.
            </li>
          </ul>`,
      },
    ],
    faqs: [
      {
        question:
          "Was passiert in der ersten Woche nach einem Achillessehnenriss?",
        answer:
          "In der ersten Woche benötigen Sie sofortige ärztliche Hilfe. Sie werden wahrscheinlich die Notaufnahme aufsuchen, wo Sie eine erste Schmerzbehandlung erhalten, eine Traumaschiene oder einen Gipsverband anlegen, um Ihren Fuß in einer Zehenspitzenposition zu halten, und Ihnen Krücken geben. Zur Vorbeugung einer Thrombose kann ein blutverdünnendes Medikament verschrieben werden. Zur weiteren Behandlung wird eine Überweisung an einen Spezialisten veranlasst.",
      },
      {
        question:
          "Wann muss ich die Entscheidung zwischen einer chirurgischen und einer nicht-chirurgischen Behandlung treffen?",
        answer:
          "Die Behandlungsentscheidung wird in der Regel in den Wochen 1-3 nach Rücksprache mit einem Spezialisten getroffen. Er wird eine detaillierte Untersuchung durchführen und möglicherweise eine Bildgebung (in der Regel Ultraschall) anfordern, um zu prüfen, ob die Sehnenenden nahe beieinander liegen. Die nicht-chirurgische Behandlung ist am häufigsten, bei der der Fuß mit einem Stiefel in einer Zehenspitzenposition gehalten wird. Eine Operation wird hauptsächlich in Betracht gezogen, wenn eine erhebliche Lücke zwischen den Sehnenenden besteht.",
      },
      {
        question: "Wann kann ich vom Stiefel auf eine Schiene umsteigen?",
        answer:
          "Etwa in den Wochen 4-6 kann Ihr Arzt Ihnen empfehlen, auf eine Schiene umzusteigen, wenn Sie Schwierigkeiten haben, im Stiefel zu schlafen. Die Schiene ist leichter als der Stiefel und hilft, die richtige Fußposition während des Schlafs beizubehalten und gleichzeitig sicherzustellen, dass die Sehne richtig heilt.",
      },
      {
        question:
          "Wann beginnt die Physiotherapie typischerweise im Genesungsprozess?",
        answer:
          "Die Physiotherapie beginnt in der Regel etwa in den Wochen 10-12. Dann beginnen Sie, den Stiefel abzulegen und ein geführtes Übungsprogramm zu starten, das sich auf den Aufbau der Wadenmuskulatur konzentriert. Es ist wichtig, die Anweisungen Ihres Physiotherapeuten zu befolgen und kräftige Dehnübungen zu vermeiden, auch wenn sich die Sehne angespannt anfühlt.",
      },
      {
        question:
          "Wie lange dauert es, bis ich nach einem Achillessehnenriss wieder Sport treiben kann?",
        answer:
          "Die meisten Rehabilitationsprogramme zielen auf eine Rückkehr zum Sport nach etwa 6 Monaten (Woche 26+). Dies ist jedoch individuell unterschiedlich und hängt von Ihrem Fortschritt in der Rehabilitation ab. Der Schwerpunkt in den Wochen 13-25 liegt auf der progressiven Stärkung und dem Aufbau der Ausdauer der Wadenmuskulatur, was für eine sichere Rückkehr zu sportlichen Aktivitäten entscheidend ist.",
      },
      {
        question:
          "Was sind die wichtigsten Meilensteine bei der Genesung nach einem Achillessehnenriss?",
        answer:
          "Zu den wichtigsten Meilensteinen gehören: Woche 1 (Erstbehandlung und Ruhigstellung), Wochen 1-3 (Behandlungsentscheidung), Wochen 4-6 (möglicher Übergang zur Schiene), Wochen 10-12 (Beginn der Physiotherapie und Übergang vom Stiefel), Wochen 13-25 (progressive Stärkung) und Woche 26+ (allmähliche Rückkehr zu normalen Aktivitäten einschließlich Sport).",
      },
      {
        question:
          "Welche Vorsichtsmaßnahmen sollte ich treffen, um einen erneuten Riss während der Genesung zu verhindern?",
        answer:
          "Um einen erneuten Riss zu verhindern, befolgen Sie die Anweisungen Ihres Arztes strikt, insbesondere in den ersten 12 Wochen, wenn die Sehne am anfälligsten ist. Entfernen Sie den Stiefel nicht ohne Anweisung, vermeiden Sie das Gehen ohne Unterstützung und überstürzen Sie den Rehabilitationsprozess nicht. Wenn Sie mit der Physiotherapie beginnen, vermeiden Sie aggressive Dehnungen und befolgen Sie Ihr Übungsprogramm sorgfältig.",
      },
      {
        question: "Woher weiß ich, ob meine Achillessehne richtig heilt?",
        answer:
          "Ihr Arzt wird die Heilung durch regelmäßige Kontrolluntersuchungen überwachen, insbesondere in den ersten 9 Wochen. Anzeichen für eine ordnungsgemäße Heilung sind nachlassende Schmerzen, die Fähigkeit, Gewicht wie in Ihrem Stiefel empfohlen zu tragen, und eine allmähliche Verbesserung der Bewegung, wenn dies erlaubt ist. Denken Sie jedoch daran, dass es KEINEN teilweisen Riss gibt - befolgen Sie immer die Anweisungen Ihres Spezialisten für eine ordnungsgemäße Beurteilung der Heilung.",
      },
    ],
  },
  it: {
    title:
      "Cronologia del recupero della rottura del tendine d'Achille 2025: Guida settimana per settimana (chirurgica e non chirurgica)",
    description:
      "Cronologia completa settimana per settimana del 2025 per il recupero dalla rottura del tendine d'Achille dopo un intervento chirurgico o un trattamento non chirurgico: traguardi, esercizi, consigli di fisioterapia e obiettivi per il ritorno allo sport.",
    timelineBlocks: [
      {
        time: "Settimana 1",
        title: "Settimana 1: Lesione iniziale e stecca traumatica",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Lesione iniziale</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  L'attenzione medica immediata è fondamentale dopo una rottura del tendine d'Achille. Se sospetti di esserti rotto il tendine d'Achille, consulta la nostra guida: <a
                    href="/it/FAQs/is-my-achilles-ruptured"
                    class="text-primary underline">Mi sono rotto il tendine d'Achille?</a>
                </li>
                <li>
                  Una valutazione accurata della gravità della lesione è importante per escludere altre lesioni, come uno strappo muscolare del polpaccio.
                </li>
                <li>
                  Immobilizzazione temporanea con un gesso o una <a
                    href="/it/trauma-splint"
                    class="text-primary underline">stecca traumatica</a>.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Pronto soccorso (A&E)</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Gestione iniziale del dolore. Lo "schiocco" iniziale è doloroso, ma di solito si attenua rapidamente.
                </li>
                <li>
                  Applicazione di una stecca traumatica o di un gesso per mantenere il piede in posizione di punta.
                </li>
                <li>Probabilmente ti verranno date delle stampelle per aiutarti a camminare.</li>
                <li>
                  Potrebbe essere consigliato un farmaco anticoagulante per prevenire un'ostruzione venosa (trombosi).
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Valutazione medica</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Esame fisico per valutare la lesione.</li>
                <li>Invio a uno specialista per ulteriori cure.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Settimane 1-3",
        title: "Settimane 1–3: Stecca traumatica e decisione sul trattamento",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="mt-2 pb-1 font-semibold"
                >Consulto specialistico</span
              >
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Esame dettagliato per confermare la diagnosi di rottura del tendine d'Achille.
                </li>
                <li>
                  Potrebbe essere raccomandata un'ecografia per assicurarsi che le estremità del tendine siano vicine. Questo aiuta a determinare se l'intervento chirurgico è un'opzione.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Decisione sul trattamento</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Trattamento non chirurgico (più comune): il piede viene tenuto in posizione di punta con un tutore per consentire alle estremità del tendine di guarire naturalmente.
                </li>
                <li>
                  Trattamento chirurgico (alcuni casi): l'intervento chirurgico può essere preso in considerazione se c'è uno spazio tra le estremità del tendine. L'obiettivo è unire le estremità, ma non rende il tendine più forte né accelera il recupero. Scopri di più sul <a
                    href="/it/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Percorso di trattamento della lesione d'Achille</a
                  >.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Fase di recupero iniziale</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Adattamento e regolazione del tutore per garantire che il piede sia nella posizione corretta. Una <a
                    href="/it/night-splint"
                    class="text-primary underline">stecca</a>
                   può essere utilizzata per mantenere la corretta posizione del piede durante il sonno, se il tutore è scomodo.
                </li>
                <li>Imparare a usare le stampelle per l'equilibrio durante la deambulazione.</li>
                <li>
                  Carico parziale o nullo come consigliato dal medico.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Settimane 4-6",
        title: "Settimane 4–6: Progresso del recupero con la stecca",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Progresso del recupero</span>
              <ul class="ml-4 list-disc list-inside">
                <li>Controllo medico regolare per monitorare la guarigione.</li>
                <li>
                  Le regolazioni del tutore possono iniziare a consentire una maggiore libertà di movimento, riducendo gradualmente la posizione di punta. Questo di solito viene fatto rimuovendo dei cunei dalla parte posteriore del tutore.
                </li>
                <li>
                  In caso di difficoltà a dormire con il tutore, è possibile utilizzare una <a
                    href="/it/night-splint"
                    class="text-primary underline">stecca</a>
                   per mantenere la corretta posizione del piede durante il sonno. Questo aiuta a risolvere il problema comune di dormire con un tutore pesante.
                </li>
              </ul>
            </li>
            <li>
              <span class="li-heading">Mobilità</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Continuare a seguire le indicazioni mediche per il carico e il movimento. In genere si incoraggia a camminare con il tutore.
                </li>
                <li>
                  Progressione graduale degli esercizi di mobilità come consigliato dal fisioterapista. La fisioterapia inizia in genere circa 9-10 settimane dopo l'infortunio.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Settimane 7-9",
        title: "Settimane 7–9: Cure e monitoraggio continui",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Cure continue</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Monitoraggio regolare dei progressi di guarigione del tendine d'Achille.
                </li>
                <li>
                  Seguire attentamente il piano di trattamento stabilito, comprese le regolazioni del tutore.
                </li>
                <li>
                  Adeguamenti al piano di trattamento secondo necessità, in base ai progressi e alla valutazione del medico. Scopri di più sulle opzioni su <a
                    href="/it/FAQs/achilles-tear-treatment"
                    class="text-primary underline"
                    >Percorso di trattamento della lesione d'Achille</a
                  >.
                </li>
                <li>Continuare a usare la stecca per un sonno confortevole.</li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Settimane 10-12",
        title: "Settimane 10–12: Inizio della riabilitazione",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Inizia la riabilitazione</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Inizio della fisioterapia per recuperare forza e flessibilità. L'obiettivo è rafforzare i muscoli del polpaccio.
                </li>
                <li>
                  Passaggio dal tutore a calzature più normali, in genere intorno alle 10 settimane.
                </li>
                <li>
                  Seguire un programma di esercizi guidato su misura per le proprie esigenze specifiche. Evitare esercizi di stretching energici, anche se il tendine sembra teso. Per uno sguardo dettagliato al processo di recupero, consulta la nostra guida: <a
                    href="/it/FAQs/torn-achilles-recovery"
                    class="text-primary underline">Recupero dalla lesione d'Achille</a
                  >.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Settimane 13-25",
        title: "Settimane 13–25: Recupero progressivo e rafforzamento",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Recupero progressivo</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Aumento graduale dei livelli di attività, sotto la guida del fisioterapista.
                </li>
                <li>
                  Continuare a seguire le indicazioni del fisioterapista per garantire una corretta guarigione e recuperare la forza.
                </li>
                <li>
                  Sviluppo di forza e resistenza nel polpaccio e nei muscoli circostanti. Questa è una fase cruciale per il recupero a lungo termine.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Settimana 26+",
        title: "Settimane 26+: Ritorno all'attività e recupero a lungo termine",
        content: `<ul class="space-y-6 list-none">
            <li>
              <span class="li-heading">Ritorno all'attività</span>
              <ul class="ml-4 list-disc list-inside">
                <li>
                  Ritorno graduale alle normali attività, compresi sport ed esercizio fisico, seguendo il consiglio del medico. La maggior parte dei programmi di riabilitazione mira a un ritorno allo sport intorno ai 6 mesi.
                </li>
                <li>
                  I progressi individuali variano, quindi ascolta il tuo corpo ed evita di sforzarti troppo.
                </li>
                <li>
                  Comprendere <a
                    href="/it/FAQs/life-after-achilles-rupture"
                    class="text-primary underline"
                    >La vita dopo la rottura del tendine d'Achille</a
                  > è la chiave per mantenere la salute a lungo termine e prevenire nuove lesioni.
                  Il tendine guarito rimarrà probabilmente più spesso di prima e il muscolo del polpaccio potrebbe essere leggermente più piccolo.
                </li>
                <li>
                  Fare attenzione a evitare una nuova rottura. Seguire attentamente tutte le istruzioni, soprattutto durante le prime fasi del recupero.
                </li>
              </ul>
            </li>
          </ul>`,
      },
      {
        time: "Note",
        title: "Note importanti",
        variant: "neutral",
        content: `<ul class="space-y-6 list-none">
            <li>
              I tempi di recupero sono approssimativi e possono variare in modo significativo a seconda di fattori individuali, come età, stato di salute generale e gravità della lesione.
            </li>
            <li>
              Seguire sempre le indicazioni e le istruzioni specifiche del proprio medico. Questa cronologia è una guida generale, non un sostituto di una consulenza medica personalizzata.
            </li>
            <li>
              Partecipare a tutti gli appuntamenti di controllo programmati per monitorare i propri progressi.
            </li>
            <li>
              NON ESISTE una lesione parziale del tendine d'Achille.
              Presumere di avere una rottura completa fino a quando uno specialista non avrà valutato la lesione.
            </li>
          </ul>`,
      },
    ],
    faqs: [
      {
        question:
          "Cosa succede nella prima settimana dopo una rottura del tendine d'Achille?",
        answer:
          "Nella prima settimana, avrai bisogno di cure mediche immediate. Probabilmente andrai al pronto soccorso dove ti forniranno una gestione iniziale del dolore, applicheranno una stecca traumatica o un gesso per mantenere il piede in posizione di punta e ti daranno delle stampelle. Potrebbe essere prescritto un farmaco anticoagulante per prevenire la trombosi. Verrà organizzato un invio a uno specialista per ulteriori cure.",
      },
      {
        question:
          "Quando devo prendere la decisione tra trattamento chirurgico e non chirurgico?",
        answer:
          "La decisione sul trattamento viene in genere presa durante le settimane 1-3 dopo aver consultato uno specialista. Eseguiranno un esame dettagliato e potrebbero richiedere un'ecografia per verificare se le estremità del tendine sono vicine. Il trattamento non chirurgico è il più comune, in cui il piede viene tenuto in posizione di punta con un tutore. L'intervento chirurgico viene preso in considerazione principalmente se c'è uno spazio significativo tra le estremità del tendine.",
      },
      {
        question: "Quando posso passare dal tutore a una stecca?",
        answer:
          "Intorno alle settimane 4-6, se hai difficoltà a dormire con il tutore, il tuo medico potrebbe consigliarti di passare a una stecca. La stecca è più leggera del tutore e aiuta a mantenere la corretta posizione del piede durante il sonno, garantendo al contempo che il tendine continui a guarire correttamente.",
      },
      {
        question:
          "Quando inizia in genere la fisioterapia nel processo di recupero?",
        answer:
          "La fisioterapia inizia in genere intorno alle settimane 10-12. È allora che inizierai a togliere il tutore e ad avviare un programma di esercizi guidato incentrato sul rafforzamento dei muscoli del polpaccio. È importante seguire le indicazioni del fisioterapista ed evitare esercizi di stretching energici, anche se il tendine sembra teso.",
      },
      {
        question:
          "Quanto tempo ci vorrà prima che possa tornare a fare sport dopo una rottura del tendine d'Achille?",
        answer:
          "La maggior parte dei programmi di riabilitazione mira a un ritorno allo sport intorno ai 6 mesi (settimana 26+). Tuttavia, questo varia da individuo a individuo e dipende dai tuoi progressi nella riabilitazione. L'obiettivo durante le settimane 13-25 è il rafforzamento progressivo e lo sviluppo della resistenza nei muscoli del polpaccio, che è fondamentale per un ritorno sicuro alle attività sportive.",
      },
      {
        question:
          "Quali sono le tappe fondamentali nel recupero dalla rottura del tendine d'Achille?",
        answer:
          "Le tappe fondamentali includono: Settimana 1 (trattamento iniziale e immobilizzazione), Settimane 1-3 (decisione sul trattamento), Settimane 4-6 (possibile passaggio alla stecca), Settimane 10-12 (inizio della fisioterapia e passaggio dal tutore), Settimane 13-25 (rafforzamento progressivo) e Settimana 26+ (ritorno graduale alle normali attività, compreso lo sport).",
      },
      {
        question:
          "Quali precauzioni dovrei prendere per prevenire una nuova rottura durante il recupero?",
        answer:
          "Per prevenire una nuova rottura, segui scrupolosamente le istruzioni del tuo medico, soprattutto durante le prime 12 settimane, quando il tendine è più vulnerabile. Non rimuovere il tutore se non indicato, evita di camminare senza supporto e non affrettare il processo di riabilitazione. Quando inizi la fisioterapia, evita lo stretching aggressivo e segui attentamente il tuo programma di esercizi.",
      },
      {
        question:
          "Come faccio a sapere se il mio tendine d'Achille sta guarendo correttamente?",
        answer:
          "Il tuo medico monitorerà la guarigione attraverso controlli regolari, in particolare durante le prime 9 settimane. I segni di una corretta guarigione includono una diminuzione del dolore, la capacità di caricare il peso come consigliato nel tutore e un graduale miglioramento del movimento quando consentito. Tuttavia, ricorda che NON ESISTE una lesione parziale: segui sempre le indicazioni del tuo specialista per una corretta valutazione della guarigione.",
      },
    ],
  },
};
