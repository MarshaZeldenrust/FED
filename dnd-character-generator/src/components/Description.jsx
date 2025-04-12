import TextBlock from './TextBlock';

export default function Description() {
  return (
    <section className="bg-[#e1d3b8] border p-4 rounded shadow flex flex-col gap-4">
      <TextBlock label="Personality Traits" />
      <TextBlock label="Ideals" />
      <TextBlock label="Bonds" />
      <TextBlock label="Flaws" />
    </section>
  );
}
