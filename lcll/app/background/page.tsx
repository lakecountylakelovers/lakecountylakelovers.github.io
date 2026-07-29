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
            Some phosphorus in a lake is <strong>bioavailable</strong>, meaning plants and algae can easily absorb and use it for growth.
          </p>
          <p>
            Dissolved Reactive Phosphorus (DRP) or Soluble Reactive Phosphorus (SRP) is the most common form of bioavailable phosphorus. Because it is dissolved in water, it is used by algae rapidly.
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
            <strong>Inert phosphorus</strong>, on the other hand, is stored in stable forms or attached to the sediments in the bottom of the lake.
          </p>
          <p>
            It is not immediately available for biological growth but can become available if the conditions of the lake change.
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
            Phosphorus enters the lake from sources such as fertilizer, stormwater runoff, soil erosion, wastewater, and animal feces.
          </p>
        </div>

        <div className="">
          <h4 className="font-bold text-slate-900 text-sm mb-1 text-indigo-900">
            Internal Loading
          </h4>
          <p className="text-sm sm:text-sm text-slate-800 leading-relaxed">
            Phosphorus previously stored in deep bottom sediments gets recycled and released back into the water column during warm or low-oxygen conditions.
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
          <strong className="text-slate-900">Outputs:</strong> Phosphorus leaves the lake through water outflow, permanent burial in sediments, and, to a lesser extent, living organisms.
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
            Scientists measure phosphorus in lakes using different forms depending on what they want to understand.
          </p>
          <p>
            All of these measurements usually involve filtering and/or digesting a water sample with acid, then measuring the phosphorus concentration with a <strong>colorimeter</strong>, a device that measures how much light a substance absorbs.
          </p>
          <div className="text-xs sm:text-sm text-slate-800 space-y-1">
            <p className="font-bold text-slate-900">Phosphorus vs. Phosphate</p>
            <p>
              Phosphorus is an element, while phosphate is a compound consisting of oxygen as well. mg/L of phosphate is different from mg/L of phosphorus by a factor of about <strong>95/31</strong>.
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
          <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[16/9] flex items-center justify-center">
            <img
              src="/colorimeter.png"
              alt="Colorimeter device"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center md:order-1">
          <img
            src="/total-phosphorus-test.png"
            alt="Total phosphorus digestion sample"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed md:order-2">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            Total Phosphorus (TP)
          </h3>
          <p>
            Measures all phosphorus in the water column, including phosphorus dissolved in the water, attached to particles, and stored in living organisms. It is used to determine the overall nutrient level of a lake.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> The sample undergoes a rigorous digestion process with strong acids and heat to turn all phosphorus into reactive phosphorus that can then be filtered and measured with a colorimeter.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            Soluble Reactive Phosphorus (SRP) / DRP / Orthophosphate
          </h3>
          <p>
            Measures the phosphorus that algae and plants can immediately use for growth. Because it is readily available, even small changes in SRP can affect algal growth.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> The sample is not digested, but only filtered to isolate the reactive phosphorus that can be measured with a colorimeter.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
          <img
            src="/srp-test.png"
            alt="Filtered soluble reactive phosphorus test"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center md:order-1">
          <img
            src="/total-reactive-test.png"
            alt="Total reactive phosphorus direct colorimeter measurement"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed md:order-2">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            Total Reactive Phosphorus
          </h3>
          <p>
            Includes SRP and other forms of phosphorus that are reactive, such as those weakly attached to particles.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> The sample is neither digested nor filtered, and it is measured with a colorimeter directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            Total Phosphorus of the Sediment (TP<sub>sed</sub>)
          </h3>
          <p>
            A measure of all of the phosphorus in the lake's sediment, including phosphorus which is not readily used by algae.
          </p>
          <p className="text-sm sm:text-sm text-slate-800">
            <strong>Testing Process:</strong> Found by completing a soil phosphorus fractionation test, which quantifies different forms of phosphorus in the soil.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
          <img
            src="/sediment-tp-test.png"
            alt="Soil phosphorus fractionation test"
            className="w-full h-full object-cover rounded-xl"
          />
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
            In deeper lakes, layers of water can form based on temperature and encourage phosphorus in the bottom waters, especially when oxygen levels become low. These lakes mix less frequently, and can be classified in different ways based on the number of times they mix, such as <strong>dimictic</strong>, where <em>di</em> means two.
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
            Much of the phosphorus stored in sediments is held by <strong>iron minerals</strong>.
          </p>
          <p>
            When bottom waters lose oxygen, this changes the chemistry of the water, and minerals can then release phosphorus back into the water.
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
            Treating internal loading is expensive. The most cost-effective way to help your lake is to ensure that internal loading does not occur in the first place!
          </p>
          <p>
            Pay attention to sources of phosphorus in your lake and look for ways to mitigate those. For example, consider encouraging phosphorus-free fertilizer in agriculture, working toward stormwater retention, or controlling the number of geese.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
          <img
            src="/fertilizer.png"
            alt="Stormwater retention and watershed management practices"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center md:order-1">
          <img
            src="/geese.png"
            alt="Lake ecosystem recovery over time"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed md:order-2">
          <p>
            Reducing phosphorus pollution is an important step toward improving lake health, but recovery often takes time.
          </p>
          <p>
            Even after phosphorus entering the lake is reduced, phosphorus stored in sediments can continue fueling algal growth through internal loading.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-slate-100 pb-6">
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p>
            By measuring phosphorus levels and understanding how they move through a lake, you can choose the most effective management strategy, such as phosphorus-binding treatments (e.g., Phoslock, EutroSORB), sediment management, or, in some cases, aeration.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden aspect-[4/3] flex items-center justify-center">
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
            However, while aeration may improve oxygen levels, it also mixes the water column and can disturb bottom sediments, sometimes releasing additional phosphorus into the water.
          </p>

          <p>
            For this reason, aeration alone is often not the most effective long-term solution for controlling internal loading.
          </p>
        </div>
      </div>
    </div>
  ),
},
  {
    id: 'calculator-work',
    title: 'How Does This Calculator Work?',
    content: (
      <>
      </>
    ),
  },
  {
    id: 'where-find-info',
    title: 'Where Can I Find The Required Information For The Tool?',
    content: (
      <>
      </>
    ),
  },
  {
    id: 'references',
    title: 'Where Are Your References & Additional Resources?',
    content: (
      <>
      </>
    ),
  }
];

export default function BackgroundPage() {
  return <FAQTabs items={faqData} />;
}