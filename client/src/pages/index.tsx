import Hero from '@/components/Hero';
import PageLayout from '@/layouts/PageLayout';

export default function Home() {
  return (
    <PageLayout title="Inicio" bgGradient>
      <Hero />
      <div className="flex flex-row gap-20 p-16">
        <section className="w-full">
          <div className="mb-16 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-bold">Grandes retos</h4>
              <span className="font-semibold text-gray-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <div className="h-[1px] bg-white w-9" />
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint magni, aspernatur
              dignissimos at blanditiis fugiat? Recusandae magnam modi, esse harum magni id
              excepturi quisquam? Incidunt laudantium architecto omnis, est dicta, perferendis
              eveniet odit harum tempora, dignissimos quo necessitatibus. Cupiditate, non!
            </p>
            <button className="btn-primary bg-cyan-600 ml-auto mr-10">Click me!</button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-bold">Nunca pares de aprender</h4>
              <span className="font-semibold text-gray-300">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <div className="h-[1px] bg-white w-9" />
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint magni, aspernatur
              dignissimos at blanditiis fugiat? Recusandae magnam modi, esse harum magni id
              excepturi quisquam? Incidunt laudantium architecto omnis, est dicta, perferendis
              eveniet odit harum tempora, dignissimos quo necessitatibus. Cupiditate, non!
            </p>
            <button className="btn-primary bg-cyan-600 ml-auto mr-10">Click me!</button>
          </div>
        </section>
        <section className="w-full grid gap-8 grid-rows-3 grid-cols-2">
          {Array(6)
            .fill('test')
            .map((_, index) => (
              <div key={index} className="flex justify-center items-center bg-gray-800 rounded-md">
                Card {index + 1}
              </div>
            ))}
        </section>
      </div>
    </PageLayout>
  );
}
