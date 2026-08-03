import { redirect } from 'next/navigation';
import Image from 'next/image';

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
    <main className="mx-auto flex w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8 py-10">
      <section className="flex w-full flex-col gap-4 rounded-[2.5rem] border border-white/80 bg-slate-50/90 p-6 sm:p-10 lg:p-12">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
            The Internal Phosphorus Calculator
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[280px] w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/10">
            <Image
              src="/Lake_Image.jpg"
              fill
              priority
              className="object-cover"
              alt="Picture of Summer in Lake County's Lakes"
            />
          </div>

          <div className="flex flex-col justify-center text-slate-700 text-base leading-relaxed space-y-4">
            <p>
              Phosphorus is a key nutrient for plants and algae. With too much phosphorus,
              especially <strong className="text-slate-900 font-semibold">internal loading</strong>, algae can quickly grow out of control, turning water green and turbid.
            </p>
            <p>
              Addressing phosphorus ranges from <strong className="text-slate-900 font-semibold">phosphorus-binding treatments</strong> to <strong className="text-slate-900 font-semibold">preventing internal loading</strong> at the source by limiting external runoff.
            </p>
            <p>
              By quantifying internal loading in your lake, <em>even as an estimate</em>, you can make informed, impactful management decisions.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />
        
        <div className="space-y-6 text-slate-800 text-base leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl tracking-tight">
              Methods for Estimating Internal Loading
            </h2>
            <p className="text-slate-800 text-sm sm:text-base">
              It is always best to use data that represents your lake's current conditions. 
              All methods require basic morphometry (<strong>average depth and surface area</strong>) 
              and <strong>water column total phosphorus</strong>, which are pre-filled automatically 
              for Lake County Lake Lovers monitoring lakes. The following methods are listed in order of confidence, 
              with the most reliable method listed first.
            </p>
          </div>

          <div className="pt-2">
            <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
              
              <div className="p-5 sm:p-6 transition-colors hover:bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      1
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      Sediment Total Phosphorus
                    </h4>
                  </div>
                </div>
                <p className="pl-10 text-slate-700 text-sm sm:text-base">
                  Calculated using total phosphorus concentration measured in lake sediment
                </p>
                <div className="pl-10 text-sm font-semibold tracking-wider text-slate-800">
                  Required Data: <span className="text-slate-900 font-medium">Sediment Total Phosphorus</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 transition-colors hover:bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      2
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      Current Seasonal Water Column TP
                    </h4>
                  </div>
                </div>
                <p className="pl-10 text-slate-700 text-sm sm:text-base">
                  Calculated using the current seasonal average total phosphorus concentration in the water column
                </p>
                <div className="pl-10 text-sm font-semibold tracking-wider text-slate-800">
                  Required Data: <span className="text-slate-900 font-medium">Current year seasonal Total Phosphorus values</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 transition-colors hover:bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      3
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      Current Seasonal Secchi Depth
                    </h4>
                  </div>
                </div>
                <p className="pl-10 text-slate-700 text-sm sm:text-base">
                  Calculated using current seasonal average secchi depth
                </p>
                <div className="pl-10 text-sm font-semibold tracking-wider text-slate-800">
                  Required Data: <span className="text-slate-900 font-medium">Seasonal Secchi Depth measurements</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 transition-colors hover:bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      4
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      Historical Water Column TP
                    </h4>
                  </div>
                </div>
                <p className="pl-10 text-slate-700 text-sm sm:text-base">
                  Backup calculation using historical seasonal average water column TP when no current data is provided
                </p>
                <div className="pl-10 text-sm font-semibold tracking-wider text-slate-800">
                  Required Data: <span className="text-slate-900 font-medium">None (Pre-filled automatically)</span>
                </div>
              </div>

            </div>
          </div>

          <p className="text-slate-800 text-sm sm:text-base italic text-center">
            Entering as much supplemental data as you have produces a more complete range of estimated loading values.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center pt-4">
          <form action={handleButtons} className="w-full flex flex-col items-center gap-4 sm:flex-row sm:justify-center max-w-md">
            <button
              type="submit"
              name="intent"
              value="get-started"
              className="inline-flex w-full sm:w-auto min-w-[160px] items-center justify-center rounded-xl bg-blue-600 px-2 py-2 text-base font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started
            </button>
            <button
              type="submit"
              name="intent"
              value="learn-more"
              className="inline-flex w-full sm:w-auto min-w-[160px] items-center justify-center rounded-xl border border-slate-300 bg-white px-2 py-2 text-base font-semibold text-slate-700 shadow-xs transition hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Learn More
            </button>
          </form>
        </div>

      </section>
    </main>
  );
};

export default Home;