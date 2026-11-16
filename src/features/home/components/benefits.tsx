const steps = [
  {
    number: "01",
    title: "Elegí tu producto",
    description: "Explorá proteínas y creatinas y compará presentaciones y precios.",
  },
  {
    number: "02",
    title: "Consultá stock",
    description: "Escribinos por WhatsApp para confirmar disponibilidad y sabores.",
  },
  {
    number: "03",
    title: "Recibí en tu casa",
    description: "Coordinamos el envío a todo el país y el pago de forma directa.",
  },
];

export function Benefits() {
  return (
    <section className="section-space border-t border-line bg-paper">
      <div className="container-page">
        <h2 className="font-display text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[40px]">
          Cómo comprar
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] text-signal">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-[1.05] tracking-[-0.03em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[65ch] text-base leading-[1.6] text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
