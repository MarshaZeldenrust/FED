import TextBlock from './TextBlock';

export default function Description() {
  return (
    <section className="border p-4 rounded shadow bg-white flex flex-col gap-4">
      <TextBlock label="Personality Traits" />
      <TextBlock label="Ideals" />
      <TextBlock label="Bonds" />
      <TextBlock label="Flaws" />
    </section>
  );
}
