import { redirect } from 'next/navigation';
import Image from 'next/image'

const handleButtons = async (formData: FormData) => {
  'use server'

  const buttonClicked = formData.get('intent');

  if (buttonClicked === 'get-started') {
    redirect('/calculator');
  } 
  
  if (buttonClicked === 'learn-more') {
    redirect('/background');
  }
}

const Home = () => {
  return (
    <main className="mx-auto flex w-full items-center px-6 sm:px-8 lg:px-12">
      <section className="flex w-full flex-col gap-20 rounded-[2rem] border border-white/85 bg-white/65 p-7 shadow-[0_24px_80px_rgba(23,38,58,0.16)] backdrop-blur-md sm:p-8 lg:p-10">
        <h1 className="w-full max-w-5xl text-center mx-auto">The Phosphorus Calculator</h1>

        <div className="grid gap-7 lg:grid-cols-[0.95fr_0.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[1.9rem] aspect-[16/10] shadow-2xl shadow-slate-900/20 ring-1 ring-white/70 lg:aspect-[4/3]">
            <div className="absolute inset-0">
              <Image
                src="/Lake_Image.jpg"
                width={1600}
                height={1200}
                priority
                className="h-full w-full object-cover"
                alt="Picture of Summer in Lake County's Lakes"
              />
            </div>
          </div>

          <div className="flex h-full flex-col justify-center text-center lg:text-left">
            <div className="space-y-4 text-slate-800">
              <p>
                Phosphorus is a key nutrient for plants and algae. With too much phosphorus,
                especially <em> internal loading </em> of phosphorus, algae can quickly grow out of control,
                making the water green and unclear.
              </p>
              <p>
                Phosphorus is a problem that can be handled in many ways, ranging from 
                <em> phosphorus-binding treatments </em> to <em> preventing internal loading </em> in the first place by
                limiting sources of <em> external phosphorus </em>.
              </p>
              <p>
                By quantifying the internal loading in your lake, <em> even an estimate </em>, you will be able to make better decisions about how to manage your lakes in an impactful manner.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center sm:flex-row lg:justify-center">
              <form action={handleButtons} className="w-full flex flex-col items-center gap-5 sm:flex-row">
                <button type="submit" name="intent" value="get-started" className="inline-flex w-full items-center justify-center rounded-full bg-blue-500/10 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-blue-100/25">
                  Get Started
                </button>
                <button type="submit" name="intent" value="learn-more" className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-base font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
                  Learn More
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home