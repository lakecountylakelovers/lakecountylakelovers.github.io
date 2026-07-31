import Link from 'next/dist/client/link';
import { FAQTabs, FAQItem } from './faq-tabs';

const faqData: FAQItem[] = [
  {
  id: 'why-matters',
  title: 'Why Does Phosphorus Matter?',
  content: (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
        <p>
          Phosphorus is a nutrient that helps plants, and algae in lakes grow and survive.
        </p>
        <p>
          A small amount is essential for a healthy lake, but when the lake is oversaturated with nutrients (known as eutrophication), algae can quickly grow out of control.
        </p>
        <p>
          This makes the water green and reduces oxygen levels in the water, which can harm aquatic life.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 aspect-[4/3] flex items-center justify-center">
        <img
          src="/algal-bloom.png"
          alt="Algal bloom in lake water"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  ),
},
{
  id: 'where-is-the-phosphorus',
  title: 'Where is the Phosphorus?',
  content: (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            Some phosphorus in a lake is immediately <strong>bioavailable</strong>, meaning plants and algae can easily absorb and use it for growth.
          </p>
          <p>
            Dissolved Reactive Phosphorus (DRP), also known as Soluble Reactive Phosphorus (SRP) is the most common form of bioavailable phosphorus. Because it is dissolved in water, it is used by algae rapidly.
          </p>
        </div>

        <div className="relative rounded-2xl border border-slate-200 bg-slate-50 aspect-[4/3] flex items-center justify-center overflow-hidden">
          <img
            src="/bioavailable-phosphorus.png"
            alt="Bioavailable phosphorus absorption diagram"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed md:order-2">
          <p>
            Other forms of phosphorus, on the other hand, are stored in stable forms or attached to the sediments in the bottom of the lake.
          </p>
          <p>
            They are not immediately available for biological growth but some of them can become available if the conditions in the lake change.
          </p>
        </div>

        <div className="relative rounded-2xl border border-slate-200 bg-slate-50 aspect-[4/3] flex items-center justify-center overflow-hidden md:order-1">
          <img
            src="/sediment-phosphorus.png"
            alt="Phosphorus attached to lake bottom sediment"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>Nutrient cycling</strong> is the natural movement of phosphorus between the water, sediments, and living organisms.
          </p>
          <p>
            This process recycles phosphorus and can release stored phosphorus back into the water over time.
          </p>
        </div>

        <div className="relative rounded-2xl border border-slate-200 bg-slate-50 aspect-[5/3] flex items-center justify-center overflow-hidden">
          <img
            src="/nutrient-cycling.png"
            alt="Nutrient cycling diagram"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

    </div>
  ),
},
  {
  id: 'phosphorus-budget',
  title: 'What is the Phosphorus Budget?',
  content: (
    <div className="space-y-6">
      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
        A phosphorus budget tracks how phosphorus moves through a lake. Understanding this balance helps explain why phosphorus levels and water quality change over time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="">
          <h4 className="font-bold text-slate-900 text-sm mb-1 text-blue-900">
            External Loading
          </h4>
          <p className="text-sm sm:text-sm text-slate-700 leading-relaxed">
            Phosphorus enters the lake from sources such as fertilizer, leaking septic systems, stormwater runoff, soil erosion, wastewater, and animal feces.
          </p>
        </div>

        <div className="">
          <h4 className="font-bold text-slate-900 text-sm mb-1 text-indigo-900">
            Internal Loading
          </h4>
          <p className="text-sm sm:text-sm text-slate-800 leading-relaxed">
            Phosphorus previously stored in bottom sediments gets recycled and released back into the water column during warm or low-oxygen conditions.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center">
        <img
          src="/phosphorus-budget.png"
          alt="Phosphorus budget inputs and outputs diagram"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>

      <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
        <p>
          <strong className="text-slate-900">Outputs:</strong> Phosphorus leaves the lake through water outflow, permanent burial in sediments, and, to a lesser extent, uptake by living organisms.
        </p>

        <p>
          <strong>When phosphorus enters a lake faster than it leaves, it builds up in the sediments, making internal loading an important driver of long-term water quality that becomes more difficult to manage than preventing the phosphorus from entering in the first place.</strong>
        </p>
      </div>
    </div>
  ),
},
{
  id: 'how-is-phosphorus-measured',
  title: 'How is Phosphorus Measured?',
  content: (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            Scientists measure phosphorus in lakes using different methods depending on what they want to understand.
          </p>
          <p>
            All of these measurements usually involve filtering and/or digesting a water sample with acid, then measuring the phosphorus concentration with a <strong>photometer</strong>, a device that measures how much light a substance absorbs.
          </p>
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <p className="font-bold text-slate-900">Phosphorus vs. Phosphate</p>
            <p>
              Phosphorus (P) is an element, while phosphate (PO4) is a compound consisting of oxygen as well. So, mg/L of phosphate is different from mg/L of phosphorus by a factor of about <strong>3</strong>, and <strong>it is important to note this distinction for the calculator, which reports the internal loading in terms of phosphorus</strong>.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 h-full justify-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[16/9] flex items-center justify-center">
            <img
              src="/water-sample.png"
              alt="Filtering water sample"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[16/13] flex items-center justify-center">
            <img
              src="/colorimeter.png"
              alt="Colorimeter device"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      <p className="font-bold text-slate-900 text-md sm:text-lg">
        Below Are 3 Ways of Measuring Phosphorus:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
          <img
            src="/srp-test.png"
            alt="Filtered soluble reactive phosphorus test"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            1. Soluble Reactive Phosphorus (SRP) / DRP / Orthophosphate
          </h3>
          <p>
            Measures the phosphorus that algae and plants can immediately use for growth. Because it is readily available, even small changes in SRP can affect algal growth quickly.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> The sample is not digested, but only filtered to isolate the reactive phosphorus that can be measured with a photometer.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            2. Total Phosphorus (TP)
          </h3>
          <p>
            Measures all phosphorus in the water column, including phosphorus dissolved in the water (SRP), attached to particles, and stored in living organisms. It is used to determine the overall nutrient level of a lake.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> The sample undergoes a rigorous digestion process with strong acids and heat to turn all phosphorus into reactive phosphorus that can then be filtered and measured with a photometer.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
          <img
            src="/total-phosphorus-test.png"
            alt="Total phosphorus digestion sample"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/*
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
          <img
            src="/total-reactive-test.png"
            alt="Total reactive phosphorus direct colorimeter measurement"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

      
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed md:order-2">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            3. Total Reactive Phosphorus (TRP)
          </h3>
          <p>
            Includes SRP and other forms of phosphorus that are reactive, such as those weakly attached to particles.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> The sample is neither digested nor filtered, and it is measured with a photometer directly.
          </p>
        </div>
      </div>
      */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
          <img
            src="/sediment-tp-test.png"
            alt="Soil phosphorus fractionation test"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            3. Total Phosphorus of the Sediment (TP<sub>sed</sub>)
          </h3>
          <p>
            A measure of all of the phosphorus in the lake's sediment, including phosphorus which is not readily used by algae.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> Found by completing a soil phosphorus fractionation test, which quantifies different forms of phosphorus in the sediment.
          </p>
        </div>
      </div>
    </div>
  ),
},
{
  id: 'lake-types',
  title: 'What Are the Types of Lakes?',
  content: (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="font-semibold text-slate-900">
            A lake’s structure can affect how phosphorus moves.
          </p>
          <p>
            Shallow lakes mix frequently, meaning phosphorus moves easily between sediments and water, making the internal loading of phosphorus harder to measure. These lakes are known as <strong>polymictic</strong>, with <em>poly</em> meaning many and <em>mictic</em> referring to mixing, also referred to as turnover.
          </p>
          <p>
            In deeper lakes, layers of water with different temperatures can form, which limits the movement of water across the layers. The bottom layers, with less sunlight and contact with the atmosphere, typically have lower oxygen levels, and these layers can trap phosphorus in the bottom waters. These lakes mix less frequently, and can be classified in different ways based on the number of times they mix, such as <strong>dimictic</strong>, where <em>di</em> means two.
          </p>
        </div>

        <div className="flex flex-col gap-3 h-full justify-center">
  <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[16/9] flex items-center justify-center">
    <img
      src="/lake-stratification.png"
      alt="Diagram of lake stratification by temperature"
      className="w-full h-auto object-contain"
    />
  </div>
  <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
    <img
      src="/lake-mixing.png"
      alt="Diagram of lake mixing and turnover for dimictic lake"
      className="w-full h-full object-contain"
    />
  </div>
</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center md:order-1">
          <img
            src="/iron-sediment-release.png"
            alt="Iron minerals releasing phosphorus under low oxygen conditions"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed md:order-2">
          <p>
            Much of the phosphorus stored in sediments is held by <strong>iron-rich minerals</strong>.
          </p>
          <p>
            When bottom waters lose oxygen (known as anoxia), this changes the chemistry of the sediment, releasing the phosphorus back into the water.
          </p>
          
          <p>
            This recycled phosphorus can become available to algae and contribute to <strong>algal blooms even when external inputs are reduced</strong>.
          </p>
        </div>
      </div>
    </div>
  ),
},
{
  id: 'how-can-i-help',
  title: 'How Can I Help My Lake?',
  content: (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">

        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            Reducing phosphorus pollution is an important step toward improving lake health, but <strong>recovery often takes time</strong>.
          </p>
          <p>
            Even after phosphorus entering the lake is reduced, phosphorus stored in sediments can continue fueling algal growth through internal loading. This calculator
            emphasizes internal loading because it is often more neglected compared to external loading.
          </p>
          <p>
            The relative amount of internal loading and external phosphorus loading in your lake can be represented as a pie chart. <strong>Each and every lake has a different balance between the two.</strong>
          </p>
          <p>
            To understand what type of phosphorus loading is more prominent and thus key to address, you can use this calculator
            to help <strong>estimate</strong> the amount of internal phosphorus that is released annually. To understand external loading, you can
            measure the phosphorus from many point sources in your lake.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[3/5] flex items-center justify-center">
          <img
            src="/pie-chart.png"
            alt="Pie-Chart of Phosphorus"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/4] flex items-center justify-center">
          <img
            src="/fertilizer.png"
            alt="Stormwater retention and watershed management practices"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>Treating internal loading is expensive.</strong> Ensure that <strong>internal loading is limited</strong> by preventing phosphorus from entering your lake in the first place!
          </p>
          <p>
            Pay attention to external sources of phosphorus in your lake and look for ways to mitigate those. <strong>For example, encourage the use of phosphorus-free fertilizer in agriculture, implement stormwater retention measures, take proper care of the septic system,or control the number of geese.</strong>
          </p>
        </div>

        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            Consider effective management strategies for internal loading, <strong>such as phosphorus-binding treatments (e.g., Phoslock, EutroSORB), sediment management, or, in some cases, aeration.</strong>
          </p>
          <p>
            This calculator provides an estimate of the amount of internal loading <strong>released annually</strong>. Meanwhile, a contractor would likely provide an estimate of internal phosphorus inventory, <strong>which will be released over many years.</strong> Addressing annual internal loading can lower costs while still providing observable results.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[6/5] flex items-center justify-center">
          <img
            src="/phosphorus-binding-treatments.png"
            alt="Application of phosphorus binding treatments to lake water"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center md:order-1">
          <img
            src="/aeration-system.png"
            alt="Lake aeration system mixing water column"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed md:order-2">
          <p>
            However, while aeration may improve oxygen levels, it also mixes the water column and can disturb bottom sediments, <strong>potentially releasing additional phosphorus into the water.</strong>
          </p>

          <p>
            For this reason, aeration alone is often not the most effective long-term solution for controlling internal loading.
          </p>
        </div>
      </div>
      <div className='space-y-3'>
        <p>Lake County's Lakes have been working towards improvement and effective management. These <Link className='text-blue-500 hover:underline' href='https://www.youtube.com/@lakecountylakelovers/videos'>stories on YouTube</Link> showcase the progress and success of these efforts.</p>
        <p>To know more about your lake's impairment status, visit the <Link className='text-blue-500 hover:underline' href='https://www.epa.gov/waterways/how-my-waterway'>EPA's How's My Waterway Tool</Link>.</p>
      </div>
    </div>
  ),
},
{
    id: 'calculator-work',
    title: 'How Does This Calculator Work?',
    content: (
      <div className="space-y-6 text-slate-200">
        <section className="space-y-3">
          <p>
            <Link href='https://scholar.google.com/citations?user=OSxitWgAAAAJ&hl=en' className='text-blue-400 hover:underline'>Dr. Gertrud Nürnberg</Link> provides multiple experimental approaches for estimating internal phosphorus loading. 
            This calculator uses only one of those approaches, because the other approaches either do not provide
            a whole estimate, or they require large amounts of data from throughout a lake, which is often unfeasible
            for volunteer lake teams to collect. The approach used in the calculator is represented below:
          </p>

          <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg text-center font-mono text-base text-cyan-400 my-2">
            Internal Load = Surface Area × Anoxic Factor × Release Rate
          </div>
        </section>

        <section className="space-y-3">
          <ul className="space-y-3 text-sm text-slate-900">
            <li>
              <strong className="">Surface Area (A):</strong> Expressed in m<sup>2</sup>, the overall lake's surface area, defining the area across which the sediment is present. Larger lakes thus naturally have more internal loading.
            </li>
            <li>
              <strong className="">Anoxic Factor (AF): </strong> Expressed in days/year, AF quantifies the extent of anoxia (dissolved oxygen &lt; 2.0 mg/L) at the lake's sediment surface.
              It represents the number of days that an area equivalent to the total lake surface experiences anoxic conditions. In shallow lakes, this is also known as active release area.
            </li>
            <li>
              <strong className="">Release Rate (RR):</strong> Expressed in mg of Phosphorus / m<sup>2</sup> - day, the rate at which phosphorus is actively released from the anoxic sediments into the water column.
            </li>
          </ul>
        </section>
        <section className="space-y-4 pt-2">
          <div className="bg-slate-900 border-l-4 border-cyan-500 p-4 rounded-r-lg space-y-2">
            <h5 className="font-semibold text-white">1. Anoxic Factor (AF) Equation</h5>
            <ul className="list-none pl-5 text-sm space-y-1 font-mono text-cyan-300">
              <li>AF = -35.4 + 44.2 × log<sub>10</sub>(TP<sub>Water Column</sub>) + 0.95 × (z / A<sup>0.5</sup>)</li>
              
            </ul>
            <ul className="list-disc pl-5 text-sm space-y-1 font-mono text-cyan-300">
              <li>TP<sub>Water Column</sub> is the total phosphorus concentration in the water column, in ug/l</li>
              <li>z is the average depth of the lake, in meters</li>
              <li>A is the surface area of the lake, in km²</li>
            </ul>
          </div>

          <div>
            <p className="text-sm text-slate-900">
              There are multiple ways of estimating release rates, and the sources can be found in the references. This calculator allows for these different methods to be used.
            </p>
          </div>

          <div className="bg-slate-900 border-l-4 border-emerald-500 p-4 rounded-r-lg space-y-2">
            <h5 className="font-semibold text-white">2. Sediment Release Rate (RR) Equation</h5>
            <ul className="list-none pl-5 text-sm space-y-1 font-mono text-emerald-300">
              <li>From Total Phosphorus of the Sediment: log<sub>10</sub>(RR) = 0.80 + 0.76 × log<sub>10</sub>(TP<sub>sed</sub>)</li>
              <li>From Secchi Depth: log₁₀(RR) = 0.818 - 0.985 × log₁₀(SD)</li>
              <li>From Total Phosphorus of the Water Column: RR = 12.116 × log₁₀(TP<sub>Water Column</sub>) - 9.708</li>
            </ul>
            <ul className="list-disc pl-5 text-sm space-y-1 font-mono text-emerald-300">
              <li>TP<sub>Water Column</sub> is the total phosphorus concentration in the water column, in ug/l</li>
              <li>TP<sub>Sed</sub> is the Total Phosphorus in the Sediment, in mg/g</li>
              <li>SD is the Secchi Depth, in meters</li>
            </ul>
          </div>
        </section>

        <section className="space-y-2">
          <p className="text-sm text-slate-800">
            Of the methods used by this calculator, Sediment TP is placed at the top of our hierarchy (highest confidence) because directly measuring 
            the phosphorus in the sediment gives a better estimate of the actual phosphorus reservoir available for release under anoxic conditions. 
            Water column TP and Secchi depth serve as indirect proxies, because they reflect nutrient levels 
            and biological productivity caused by internal loading. The Water Column TP's accuracy relative to the
            Secchi Depth depends on how recent the TP data is, because older TP data is representative of an older
            state of the lake.
          </p>
        </section>
      </div>
    ),
  },
  {
    id: 'where-find-info',
    title: 'Where Can I Find The Required Information For The Tool?',
    content: (
      <div className="space-y-6 text-slate-200">
        <section className="space-y-3">
          <p>
            There are multiple ways of estimating the internal loading of phosphorus. It is always better to use data that is most representative of the current conditions in your lake.
          </p>
          <p>
            All estimation methods require basic morphometric information such as the lake’s <strong>average depth</strong> and <strong>surface area</strong>, along with information about the lake's phosphorus levels through <strong>Total Phosphorus in the water column</strong>. For lakes enrolled in the Lake County Lake Lovers monitoring program, these measurements are pulled in automatically.
            For other lakes in Lake County, this information is available through the <a href="https://www.lakecountyil.gov/2400/Lakes-Reports" className="text-blue-400 hover:underline font-medium">Lake County Health Department’s Lake Health Reports</a>. Click on the link for the most recent year available for your lake. On page 2, the sidebar will have the average depth and surface area, and the 
            water column total phosphorus will be mentioned in the 4th bullet point.
          </p>
          <img src='lake-report.png' alt="Lake Report" className='w-full h-auto rounded-2xl border border-slate-700'/>
        </section>

        <section className="space-y-3">
          <p className="text-lg font-medium"><strong>The Four Estimation Methods (Ordered by Confidence):</strong></p>
          <ol className="list-decimal pl-6 space-y-4 text-slate-800">
            <li>
              <div>
                <strong className="text-slate-800">Using Total Phosphorus in Sediment (Highest Confidence)</strong>
                <p className="text-sm text-slate-700 mt-0.5">
                  <em>Required supplemental data:</em> Total Phosphorus of sediment (TP<sub>sed</sub>).
                  This data is obtainable by hiring a lab or contractor to conduct a sediment phosphorus fractionation test at least level 1.
                </p>
              </div>
            </li>
            <li>
              <div>
                <strong className="text-slate-800">Using Current Seasonal Average Water Column Total Phosphorus</strong>
                <p className="text-sm text-slate-700 mt-0.5">
                  <em>Required supplemental data:</em> Average Total Phosphorus measured in the water column during the active year. 
                  Rather than accept the Lake County Health Department's Lake Health Report, which contains older data,
                  you can provide your own water column total phosphorus data collected across the current season. The more values you can provide that are spread throughout the season, the more accurate your results will be.
                </p>
              </div>
            </li>
            <li>
              <div className="space-y-2">
                <strong className="text-slate-800">Using Current Seasonal Average Secchi Depth</strong>
                <p className="text-sm text-slate-700 mt-0.5">
                  <em>Required supplemental data:</em> Average Secchi Depth during the active year. You can provide multiple Secchi depth readings you have taken throughout the current season. 
                  The more values you can provide that are spread throughout the season, the more accurate your results will be.
                  For lakes in Lake County Lake Lovers, you can find that information on the <Link href='https://vpnww-299518.projects.earthengine.app/view/lcllpilot' className='text-blue-400 hover:underline font-medium'>Google Earth Website </Link>
                  by clicking on the red dot inside your lake and opening the link "Click to see trend data." Then, a graph will display the water clarity, in inches, over the season.
                </p>

                <img src='gearth.png' alt="Historical Data" className='w-full h-auto rounded-2xl border border-slate-700'/>
              </div>
            </li>
            <li>
              <div className="">
                <strong className="text-slate-800">Using Historical Seasonal Average Water Column Total Phosphorus (Backup Method)</strong>
                <p className="text-sm text-slate-700 mt-0.5">
                  <em>Required supplemental data:</em> None. This method serves as a backup when current seasonal data is unavailable. Historical data is pulled directly from the{' '}
                  <a 
                    href="https://www.lakecountyil.gov/2400/Lakes-Reports" 
                    className="text-blue-400 hover:underline font-medium"
                  >
                    Lake County Health Department’s Lake Health Reports
                  </a>{' '}
                  automatically for lakes in our monitoring program.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <div className="">
          <p className=''>
            We recommend inputting as much supplemental data as you have available to generate a complete and bounded range of estimated internal phosphorus loading values.
          </p>
        </div>
      </div>
    ),
  },
{
    id: 'references',
    title: 'Where Are Your References & Additional Resources?',
    content: (
      <div className="space-y-6 text-slate-700">
        <p>
          The models, estimates, and parameters used throughout this calculator rely on established limnological literature, direct expert consultations, and government water quality datasets. Here is how each reference informs our methodology:
        </p>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-slate-900">Limnological Literature & Expert Consultations</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Base Formula & Polymictic Lakes:</strong> Nürnberg, Gertrud K. &ldquo;Quantification of Internal Phosphorus Loading in Polymictic Lakes.&rdquo; <em>Verhandlungen Des Internationalen Verein Limnologie</em>, vol. 29, no. 1, 2005, pp. 623–626. DOI: <a href="https://doi.org/10.1080/03680770.2005.11902000" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">10.1080/03680770.2005.11902000</a>.
              <br />
              <span className="text-sm text-slate-700"><em>Informs the core mathematical formula used to calculate internal phosphorus loading.</em></span>
            </li>
            <li>
              <strong>Deep In-Depth Analysis & Variable Definitions:</strong> Nürnberg, Gertrud K. <em>Lake Functioning: Internal Phosphorus Loading, Cyanobacteria, and Climate Change</em>. CRC Press, 2024.
              <br />
              <span className="text-sm text-slate-700"><em>Informed our deeper analysis of concepts, variables, and alternative equations.</em></span>
            </li>
            <li>
              <strong>Direct Expert Consultations:</strong> Nürnberg, Gertrud K. <em>Direct Interview & Consulting Guidance</em>.
              <br />
              <span className="text-sm text-slate-700"><em>Dr. Nürnberg was directly interviewed with specific questions to refine the calculator's logic and reference materials.</em></span>
            </li>
            <li>
              <strong>Alternative Modeling Methods:</strong> Carter, Lindsey D., and Andrew R. Dzialowski. &ldquo;Predicting Sediment Phosphorus Release Rates Using Land-Use and Water-Quality Data.&rdquo; <em>Lake and Reservoir Management</em>, vol. 35, no. 4, 2019, pp. 382–392. DOI: <a href="https://doi.org/10.1080/10402381.2019.1633800" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">10.1080/10402381.2019.1633800</a>.
              <br />
              <span className="text-sm text-slate-700"><em>Informs alternative phosphorus release rate prediction methods used alongside Nürnberg’s primary models.</em></span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-slate-900">Data, Regional Water Quality & Government Resources</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Local Water Quality & Ecological Data:</strong> <a href="https://www.lakecountyil.gov/2400/Lake-Reports" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lake County Health Department</a>
              <br />
              <span className="text-sm text-slate-700"><em>Provides regional lake management reports, historical sampling data, and explanatory guidance for local inland lakes.</em></span>
            </li>
            <li>
              <strong>Impaired Waterways Identification:</strong> <a href="https://epa.illinois.gov/topics/water-quality/watershed-management/tmdls/303d-list.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Illinois EPA Clean Water Act Section 303(d) List</a>
              <br />
              <span className="text-sm text-slate-700"><em>Identifies which Illinois waterbodies are officially listed as impaired and outlines local phosphorus pollution benchmarks.</em></span>
            </li>
            <li>
              <strong>State Lake Management Guidelines:</strong> <a href="https://epa.illinois.gov/content/dam/soi/en/web/epa/documents/water/surface-water/lake-management-guide.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IEPA Lake Management Guide for Illinois Lakes (PDF)</a>
              <br />
              <span className="text-sm text-slate-700"><em>Provides guidelines for managing nutrients and inland water quality.</em></span>
            </li>
            <li>
              <strong>National Water Quality & Watershed Tools:</strong> <a href="https://mywaterway.epa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">U.S. EPA How&rsquo;s My Waterway</a> and <a href="https://www.waterqualitydata.us/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Water Quality Portal (WQP)</a>
              <br />
              <span className="text-sm text-slate-700"><em>Supplies historical water quality impairment and monitoring data from across the United States.</em></span>
            </li>
            <li>
              <strong>Best Management Practices (BMPs):</strong> <a href="https://www.epa.gov/nutrientpollution/best-management-practices-bmp-and-treatment-technologies-clearinghouse" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">U.S. EPA BMP &amp; Treatment Technologies Clearinghouse</a>
              <br />
              <span className="text-sm text-slate-700"><em>Offers reference standards for nutrient management and watershed treatment solutions.</em></span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-slate-900">Questions &amp; Contact</h3>
          <p>
            Have questions about these references or need further clarification on the calculator? Reach out to us at <a href="mailto:info@lakecountylakelovers.org" className="text-blue-600 hover:underline font-medium">info@lakecountylakelovers.org</a>.
          </p>
        </div>
      </div>
    ),
  }
];

export default function BackgroundPage() {
  return <FAQTabs items={faqData} />;
}