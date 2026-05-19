export function getMonths() {
  return Array.from({ length: 12 }, (_, i) => {
    const name = new Date(2000, i).toLocaleString("pt-BR", {
      month: "long",
    });

    return {
      value: i,
      label: name.charAt(0).toUpperCase() + name.slice(1),
    };
  });
}
