import {
  ChatIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
} from "@/features/shared/components/icons";

const benefits = [
  {
    icon: TruckIcon,
    title: "Envíos a todo el país",
    description: "Recibí tus productos donde estés, con coordinación directa.",
  },
  {
    icon: ChatIcon,
    title: "Atención personalizada",
    description: "Consultanos y recibí asesoramiento para elegir mejor.",
  },
  {
    icon: SparklesIcon,
    title: "Variedad de productos",
    description: "Opciones para distintos objetivos y momentos de tu rutina.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Compra sencilla",
    description: "Elegí tus productos y cerramos el pedido por WhatsApp.",
  },
];

export function Benefits() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container-page grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div key={benefit.title} className="flex items-start gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-sm font-bold text-ink">{benefit.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
