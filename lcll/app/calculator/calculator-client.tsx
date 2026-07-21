"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

type HelpKey = 'overview' | 'lake' | 'surfaceArea' | 'meanDepth' | 'lakePhosphorus' | 'sedimentPhosphorus' | 'secchi'
type UnitKey = 'surfaceArea' | 'meanDepth' | 'lakePhosphorus' | 'sedimentPhosphorus' | 'secchi'

interface LakeDetails {
  surfaceArea: number
  meanDepth: number
  lakePhosphorus: number
}

const helpCopy: Record<HelpKey, { title: string; description: string; note: string }> = {
  overview: {
    title: 'How to use this calculator',
    description:
      'In order to use this calculator, you will need information about your lakes, including surface area, mean depth, and the total phosphorus measurements in your water column. If you are in LCLL, select your lake from the dropdown, and surface area/mean depth will be available by default. For more information about obtaining each measurement please select the information button to the right of that variable. You do not need to do unit conversions, because there are multiple units you can choose from below.',
    note: 'General Instructions',
  },
  lake: {
    title: 'Choose a lake',
    description:
      'Use the dropdown to select a lake. With a recognized lake, the calculator can prefill known values such as surface area and mean depth. If your lake is not listed, you can leave the dropdown blank, and you will have to manually enter your lake\'s surface area and mean depth.',
    note: 'Dropdown control',
  },
  surfaceArea: {
    title: 'Surface area',
    description: `Enter the surface area of your lake. If you already selected a lake from the dropdown, this field has been filled automatically. In Lake County, you can find the most recent measurements for your lake, performed by the Health Department, here: `,
    note: 'Required input',
  },
  meanDepth: {
    title: 'Mean depth',
    description:
      'Enter the mean, or average, depth of your lake. If you already selected a lake from the dropdown, this field has been filled automatically. In Lake County, you can find the most recent measurements for your lake, performed by the Health Department, here: ',
    note: 'Required input',
  },
  lakePhosphorus: {
    title: 'Total phosphorus in the lake water',
    description:
      'Enter the annual average total phosphorus concentration in the water column. If you already selected a lake from the dropdown, this field has been filled automatically. However, be extra cautious, as total phosphorus concentration changes over time, and the data may be as old as 10 years. In Lake County, you can find the most recent measurements for your lake, performed by the Health Department, here: ',
    note: 'Required input',
  },
  sedimentPhosphorus: {
    title: 'Total Phosphorous (Sediment)',
    description:
      'Enter the total phosphorus concentration in the sediment. Typically, you would receive this value from a professional sediment phosphorus fractionation test. If you do not have this value, you can leave it blank, and the calculator will use alternative methods.',
    note: 'Optional input',
  },
  secchi: {
    title: 'Secchi depth measurements',
    description:
      'Enter the secchi depth measurements available for your lake. You can enter multiple measurements for an annual overview of the water clarity and the calculator will average these measurements for you. Once you enter the secchi depth, click the "Add" button to add it to the list of measurements. Note: You can add up to 12 total readings.',
    note: 'Optional input, Multiple entries allowed (Max 12 readings)',
  },
}

const inputRows = [
  {
    key: 'surfaceArea' as const,
    label: 'Surface Area',
    placeholder: '',
    kind: 'number',
    unitOptions: ['acres', 'hectares', 'sq mi', 'sq km'],
  },
  {
    key: 'meanDepth' as const,
    label: 'Mean Depth',
    placeholder: '',
    kind: 'number',
    unitOptions: ['ft', 'm'],
  },
  {
    key: 'lakePhosphorus' as const,
    label: 'Total Phosphorus (Lake Water)',
    placeholder: '',
    kind: 'number',
    unitOptions: ['mg/L as P', 'ug/L as P', 'mg/L as PO4', 'ug/L as PO4'],
  },
] satisfies Array<{
  key: UnitKey
  label: string
  placeholder: string
  kind: 'number'
  unitOptions: string[]
}>

const optionalUnitRow = {
  key: 'sedimentPhosphorus' as const,
  label: 'Total Phosphorus (Sediment)',
  placeholder: '',
  kind: 'number',
  unitOptions: ['mg/kg as P', 'mg/g as P', 'mg/kg as PO4', 'mg/g as PO4'],
}

const secchiUnitOptions = ['ft', 'm', 'in']

type CalculationDraft = {
  surfaceArea?: string
  meanDepth?: string
  lakePhosphorus?: string
  sedimentPhosphorus?: string
  secchiEntries?: string[]
}

type NormalizedCalculationDraft = {
  surfaceAreaSqKm?: number
  meanDepthM?: number
  lakePhosphorusUgLP?: number
  sedimentPhosphorusMgGP?: number
  secchiM?: number
}

const PO4_TO_P_RATIO = 30.973761998 / 94.969761998

const parseOptionalNumber = (value?: string) => {
  if (value == null) return null
  const trimmedValue = value.trim()
  if (!trimmedValue) return null
  const parsedValue = Number(trimmedValue)
  return Number.isFinite(parsedValue) ? parsedValue : null
}

const convertSurfaceAreaToSqKm = (value: number, unit: string) => {
  switch (unit) {
    case 'sq km': return value
    case 'hectares': return value * 0.01
    case 'acres': return value * 0.0040468564224
    case 'sq mi': return value * 2.589988110336
    default: return null
  }
}

const convertMeanDepthToM = (value: number, unit: string) => {
  switch (unit) {
    case 'm': return value
    case 'ft': return value * 0.3048
    default: return null
  }
}

const convertPhosphorusToUgL = (value: number, unit: string) => {
  switch (unit) {
    case 'ug/L as P': return value
    case 'ug/L as PO4': return value * PO4_TO_P_RATIO
    case 'mg/L as P': return value * 1000
    case 'mg/L as PO4': return value * 1000 * PO4_TO_P_RATIO
    default: return null
  }
}

const convertSedimentPhosphorusToMgG = (value: number, unit: string) => {
  switch (unit) {
    case 'mg/g as P': return value
    case 'mg/kg as P': return value / 1000
    case 'mg/g as PO4': return value * PO4_TO_P_RATIO
    case 'mg/kg as PO4': return (value / 1000) * PO4_TO_P_RATIO
    default: return null
  }
}

const convertSecchiToM = (value: number, unit: string) => {
  switch (unit) {
    case 'm': return value
    case 'ft': return value * 0.3048
    case 'in': return value * (1.0 / 12.0) * 0.3048
    default: return null
  }
}

const normalizeCalculationDraft = (
  draft: CalculationDraft,
  units: Record<UnitKey, string>,
) => {
  const normalized: NormalizedCalculationDraft = {}

  const surfaceAreaValue = parseOptionalNumber(draft.surfaceArea)
  if (surfaceAreaValue != null) {
    const convertedValue = convertSurfaceAreaToSqKm(surfaceAreaValue, units.surfaceArea)
    if (convertedValue != null) normalized.surfaceAreaSqKm = convertedValue
  }

  const meanDepthValue = parseOptionalNumber(draft.meanDepth)
  if (meanDepthValue != null) {
    const convertedValue = convertMeanDepthToM(meanDepthValue, units.meanDepth)
    if (convertedValue != null) normalized.meanDepthM = convertedValue
  }

  const lakePhosphorusValue = parseOptionalNumber(draft.lakePhosphorus)
  if (lakePhosphorusValue != null) {
    const convertedValue = convertPhosphorusToUgL(lakePhosphorusValue, units.lakePhosphorus)
    if (convertedValue != null) normalized.lakePhosphorusUgLP = convertedValue
  }

  const sedimentPhosphorusValue = parseOptionalNumber(draft.sedimentPhosphorus)
  if (sedimentPhosphorusValue != null) {
    const convertedValue = convertSedimentPhosphorusToMgG(sedimentPhosphorusValue, units.sedimentPhosphorus)
    if (convertedValue != null) normalized.sedimentPhosphorusMgGP = convertedValue
  }

  const secchiValues = draft.secchiEntries
  if (secchiValues?.length) {
    const convertedSecchiValues = secchiValues
      .map((entry) => parseOptionalNumber(entry))
      .filter((entry): entry is number => entry != null)
      .map((entry) => convertSecchiToM(entry, units.secchi))
      .filter((entry): entry is number => entry != null)

    if (convertedSecchiValues.length > 0) {
      normalized.secchiM = convertedSecchiValues.reduce((sum, current) => sum + current, 0) / convertedSecchiValues.length
    }
  }

  return normalized
}

type SecchiEntry = {
  id: string
  value: string
}

type ViewState = 'input' | 'results'

interface CalculationResults {
  inputs: {
    lake: string
    surfaceArea: string
    surfaceAreaUnit: string
    meanDepth: string
    meanDepthUnit: string
    lakePhosphorus: string
    lakePhosphorusUnit: string
    sedimentPhosphorus: string
    sedimentPhosphorusUnit: string
    secchiEntries: string[]
    secchiUnit: string
  }
  internalLake: string | null
  internalSecchi: string | null
  internalSed: string | null
}

export default function CalculatorClient() {
  const [lakeData, setLakeData] = useState<Record<string, LakeDetails>>({})
  const [lakeOptions, setLakeOptions] = useState<string[]>([''])
  const [loading, setLoading] = useState(true)

  const [selectedHelp, setSelectedHelp] = useState<HelpKey>('overview')
  const [selectedLake, setSelectedLake] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [surfaceAreaDraft, setSurfaceAreaDraft] = useState('')
  const [meanDepthDraft, setMeanDepthDraft] = useState('')
  const [lakePhosphorusDraft, setLakePhosphorusDraft] = useState('')
  const [sedimentPhosphorusDraft, setSedimentPhosphorusDraft] = useState('')
  const [secchiDraft, setSecchiDraft] = useState('')
  const [secchiEntries, setSecchiEntries] = useState<SecchiEntry[]>([])
  const [activeUnit, setActiveUnit] = useState<Record<UnitKey, string>>({
    surfaceArea: 'acres',
    meanDepth: 'ft',
    lakePhosphorus: 'mg/L as P',
    sedimentPhosphorus: 'mg/kg as P',
    secchi: 'in',
  })
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({
    surfaceArea: '',
    meanDepth: '',
    lakePhosphorus: '',
    sedimentPhosphorus: '',
    secchi: '',
  })

  const [view, setView] = useState<ViewState>('input')
  const [results, setResults] = useState<CalculationResults | null>(null)
  const [reportYear, setReportYear] = useState(new Date().getFullYear().toString())

  useEffect(() => {
    async function fetchLakes() {
      try {
        const res = await fetch('/api/lakes')
        if (res.ok) {
          const data: Record<string, LakeDetails> = await res.json()
          setLakeData(data)
          setLakeOptions(['', ...Object.keys(data).sort()])
        } else {
          console.error("API response error loading dynamic lake data.")
        }
      } catch (err) {
        console.error("Fetch network error loading dynamic lake data: ", err)
      } finally {
        setLoading(false)
      }
    }
    fetchLakes()
  }, [])

  const selectedHelpContent = helpCopy[selectedHelp]
  const canAddSecchi = secchiDraft.trim().length > 0

  const handleLakeChange = (lakeName: string) => {
    setSelectedLake(lakeName)
    
    if (lakeName && lakeData[lakeName]) {
      const data = lakeData[lakeName]
      setSurfaceAreaDraft(data.surfaceArea.toString())
      setMeanDepthDraft(data.meanDepth.toString())
      setLakePhosphorusDraft(data.lakePhosphorus.toString())
      
      setActiveUnit((current) => ({
        ...current,
        surfaceArea: 'acres',
        meanDepth: 'ft',
        lakePhosphorus: 'mg/L as P'
      }))

      setValidationErrors({
        surfaceArea: '',
        meanDepth: '',
        lakePhosphorus: '',
        sedimentPhosphorus: '',
        secchi: '',
      })
    }
  }

  const calculatePhosphorusLoading = () => {
    const errors: Record<string, string> = {
      surfaceArea: '',
      meanDepth: '',
      lakePhosphorus: '',
      sedimentPhosphorus: '',
      secchi: validationErrors.secchi,
    }

    const saValue = parseOptionalNumber(surfaceAreaDraft)
    const mdValue = parseOptionalNumber(meanDepthDraft)
    const lpValue = parseOptionalNumber(lakePhosphorusDraft)
    const sedValue = parseOptionalNumber(sedimentPhosphorusDraft)

    if (saValue == null) {
      errors.surfaceArea = 'Surface area is required.'
    } else if (saValue < 0) {
      errors.surfaceArea = 'Value cannot be negative.'
    }

    if (mdValue == null) {
      errors.meanDepth = 'Mean depth is required.'
    } else if (mdValue < 0) {
      errors.meanDepth = 'Value cannot be negative.'
    }

    if (lpValue == null) {
      errors.lakePhosphorus = 'Total Phosphorus is required.'
    } else if (lpValue < 0) {
      errors.lakePhosphorus = 'Value cannot be negative.'
    }

    if (sedValue != null && sedValue < 0) {
      errors.sedimentPhosphorus = 'Value cannot be negative.'
    }

    setValidationErrors(errors)

    const hasAnyError = Object.values(errors).some(msg => msg !== '')
    if (hasAnyError) {
      setSelectedHelp('overview')
      return
    }

    const calculationDraft: CalculationDraft = {
      surfaceArea: surfaceAreaDraft,
      meanDepth: meanDepthDraft,
      lakePhosphorus: lakePhosphorusDraft,
      sedimentPhosphorus: sedimentPhosphorusDraft,
      secchiEntries: secchiEntries.map((entry) => entry.value),
    }

    const normalized = normalizeCalculationDraft(calculationDraft, activeUnit)

    const surfaceAreaMSq = normalized.surfaceAreaSqKm != null ? normalized.surfaceAreaSqKm * 1000000 : null
    const osgood = normalized.meanDepthM != null && normalized.surfaceAreaSqKm != null ? normalized.meanDepthM / (normalized.surfaceAreaSqKm ** 0.5) : null
    const anoxicFactor = normalized.lakePhosphorusUgLP != null && osgood != null ? (-35.4 + 44.2 * Math.log10(normalized.lakePhosphorusUgLP) + 0.95 * (osgood)) : null
    const releaseRateLake = normalized.lakePhosphorusUgLP != null ? 12.116 * Math.log10(normalized.lakePhosphorusUgLP) - 9.708 : null
    const releaseRateSecchi = normalized.secchiM != null ? 10 ** (0.818 - 0.985 * Math.log10(normalized.secchiM)) : null
    const releaseRateSed = normalized.sedimentPhosphorusMgGP != null ? 10 ** (0.80 + 0.76 * Math.log10(normalized.sedimentPhosphorusMgGP)) : null
    
    const internalLoadingLake = surfaceAreaMSq != null && anoxicFactor != null && releaseRateLake != null ? Number((surfaceAreaMSq * anoxicFactor * releaseRateLake) * (2.20462 * 10 ** (-6))).toFixed(1) : null
    const internalLoadingSecchi = surfaceAreaMSq != null && anoxicFactor != null && releaseRateSecchi != null ? Number((surfaceAreaMSq * anoxicFactor * releaseRateSecchi) * (2.20462 * 10 ** (-6))).toFixed(1) : null
    const internalLoadingSed = surfaceAreaMSq != null && anoxicFactor != null && releaseRateSed != null ? Number((surfaceAreaMSq * anoxicFactor * releaseRateSed) * (2.20462 * 10 ** (-6))).toFixed(1) : null
    
    setResults({
      inputs: {
        lake: selectedLake || 'Custom/Unlisted Lake',
        surfaceArea: surfaceAreaDraft,
        surfaceAreaUnit: activeUnit.surfaceArea,
        meanDepth: meanDepthDraft,
        meanDepthUnit: activeUnit.meanDepth,
        lakePhosphorus: lakePhosphorusDraft,
        lakePhosphorusUnit: activeUnit.lakePhosphorus,
        sedimentPhosphorus: sedimentPhosphorusDraft,
        sedimentPhosphorusUnit: activeUnit.sedimentPhosphorus,
        secchiEntries: secchiEntries.map((e) => e.value),
        secchiUnit: activeUnit.secchi,
      },
      internalLake: internalLoadingLake,
      internalSecchi: internalLoadingSecchi,
      internalSed: internalLoadingSed,
    })

    setView('results')
  }

  const addSecchiMeasurement = () => {
    const valueStr = secchiDraft.trim()
    if (!valueStr) return

    const valNum = Number(valueStr)
    if (isNaN(valNum)) {
      setValidationErrors(prev => ({ ...prev, secchi: 'Please enter a valid number.' }))
      setSelectedHelp('secchi')
      return
    }

    if (valNum < 0) {
      setValidationErrors(prev => ({ ...prev, secchi: 'Value cannot be negative.' }))
      setSelectedHelp('secchi')
      return
    }

    if (secchiEntries.length >= 12) {
      setValidationErrors(prev => ({ ...prev, secchi: 'You cannot exceed a total of 12 Secchi measurements.' }))
      setSelectedHelp('secchi')
      return
    }

    setValidationErrors(prev => ({ ...prev, secchi: '' }))
    setSecchiEntries((current) => [...current, { id: crypto.randomUUID(), value: valueStr }])
    setSecchiDraft('')
    setSelectedHelp('secchi')
  }

  const removeSecchiMeasurement = (entryIdToRemove: string) => {
    const updatedEntries = secchiEntries.filter((entry) => entry.id !== entryIdToRemove)
    setSecchiEntries(updatedEntries)
    
    if (updatedEntries.length < 12) {
      setValidationErrors(prev => ({ ...prev, secchi: '' }))
    }
    setSelectedHelp('secchi')
  }

  const downloadPdfReport = () => {
    window.print()
  }

  const activeErrorsList = Object.entries(validationErrors)
    .filter(([_, msg]) => msg !== '')
    .map(([key, msg]) => ({ key, msg }))

  if (view === 'results' && results) {
    return (
      <main className="mx-auto w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
        <section className="w-full flex flex-col gap-5 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-[0_24px_80px_rgba(23,38,58,0.16)] backdrop-blur-md">
          
          <header className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Phosphorus Loading Results: {results.inputs.lake ? results.inputs.lake : 'Unlisted Lake'}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                Year:
                <input 
                  type="number" 
                  value={reportYear}
                  onChange={(e) => setReportYear(e.target.value)}
                  className="w-20 rounded-xl border border-slate-300 px-2 py-1.5 text-center font-bold text-slate-800 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <button
                type="button"
                onClick={downloadPdfReport}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 print:hidden"
              >
                Download PDF Report
              </button>
              
              <button
                type="button"
                onClick={() => setView('input')}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 print:hidden"
              >
                Edit Inputs
              </button>
            </div>
          </header>

          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Your Inputs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="block text-xs text-slate-500">Surface Area</span>
                <strong className="text-slate-800">{results.inputs.surfaceArea} {results.inputs.surfaceAreaUnit}</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Mean Depth</span>
                <strong className="text-slate-800">{results.inputs.meanDepth} {results.inputs.meanDepthUnit}</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Lake Phosphorus</span>
                <strong className="text-slate-800">{results.inputs.lakePhosphorus} {results.inputs.lakePhosphorusUnit}</strong>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Sediment TP</span>
                <strong className="text-slate-800">
                  {results.inputs.sedimentPhosphorus ? `${results.inputs.sedimentPhosphorus} ${results.inputs.sedimentPhosphorusUnit}` : 'Skipped'}
                </strong>
              </div>
            </div>

            {results.inputs.secchiEntries.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200/60 text-sm">
                <span className="block text-xs text-slate-500 mb-1">Secchi Readings ({results.inputs.secchiUnit})</span>
                <div className="flex flex-wrap gap-1.5">
                    {results.inputs.secchiEntries.map((val, idx) => (
                        <span key={idx} className="inline-block bg-white border border-slate-200 rounded-md px-2 py-0.5 text-slate-800 text-xs font-medium">
                            {val}
                        </span>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl bg-rose-50/50 p-5 shadow-sm border border-rose-100">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-800">1. Internal Loading</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Calculations provide estimates of internal phosphorus loading using alternative configurations. The secchi model provides highly reliable calibrations.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center border-b border-dashed border-rose-200/50 pb-1.5">
                    <span className="text-xs text-slate-700">Lake TP Model:</span>
                    <strong className="text-sm font-mono text-slate-900">{results.internalLake ? `${Number(results.internalLake).toFixed(0)} lbs/yr` : '—'}</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed border-rose-200/50 pb-1.5">
                    <span className="text-xs text-slate-700">Secchi Model:</span>
                    <strong className="text-sm font-mono text-slate-900">{results.internalSecchi ? `${Number(results.internalSecchi).toFixed(0)} lbs/yr` : '—'}</strong>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-xs text-slate-700">Sediment Model:</span>
                    <strong className="text-sm font-mono text-slate-900">{results.internalSed ? `${Number(results.internalSed).toFixed(0)} lbs/yr` : '—'}</strong>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-rose-100 border border-rose-300 rounded-xl p-2.5 text-center text-rose-800 text-xs font-semibold">
                Est. Internal Phosphorus Loading: {results.internalSed ? `${Number(results.internalSed).toFixed(0)} lbs/year` : results.internalSecchi ? `${Number(results.internalSecchi).toFixed(0)} lbs/year` : results.internalLake ? `${Number(results.internalLake).toFixed(0)} lbs/year` : '—'}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-sky-50/50 p-5 shadow-sm border border-sky-100">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-sky-800">2. External Loading</h4>
                <p className="text-xs text-slate-600 mt-1">Estimates regional watershed runoffs and secondary inflows alongside system calculations.</p>
                <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-sky-300 bg-white/60 p-4">
                  <span className="text-xs font-bold text-sky-700 uppercase">Placeholder Target</span>
                </div>
              </div>
              <div className="mt-4 bg-sky-100 border border-sky-300 rounded-xl p-2.5 text-center text-sky-800 text-xs font-semibold">
                External Models: Pending
              </div>
            </div>
            
            <div className="flex flex-col justify-between rounded-2xl bg-emerald-50/50 p-5 shadow-sm border border-emerald-100">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800">3. Algal Blooms</h4>
                <p className="text-xs text-slate-600 mt-1">Calculates potential bloom frequencies and risk thresholds based on stagnant conditions.</p>
                <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-emerald-300 bg-white/60 p-4">
                  <span className="text-xs font-bold text-emerald-700 uppercase">Placeholder Target</span>
                </div>
              </div>
              <div className="mt-4 bg-emerald-100 border border-emerald-300 rounded-xl p-2.5 text-center text-emerald-800 text-xs font-semibold">
                Bloom Risk Rate: Pending
              </div>
            </div>
          </div>

          <footer className="mt-6 border-t border-slate-200 pt-5 text-xs text-slate-500 space-y-4">
            <div className="p-1">
              <span className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Disclaimer & Modeling Limitations</span>
              <p className="leading-relaxed text-xs">
                The output is just an estimate of the phosphorus load based on published formulas from Gertrud Nernberg's book and extensive research on lakes in Northern America. This estimate provides an in-the-ballpark value helpful for treatment decisions rather than a precise one. It is not equivalent to site-specific data produced by certified environmental professionals.
              </p>
            </div>
            <div className="p-1">
              <span className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Academic Literature Framework</span>
              <p className="leading-relaxed text-xs">
                The major formulas utilized come from Gertrud Nurnberg's authoritative volume <em>Lake Functioning</em>, as well as peer-reviewed research papers authored by Gertrud Nurnberg, Lindsey D. Carter, and Andrew R. Dzialowski published in reputable Freshwater Science Journals. See detailed references in the background section.
              </p>
            </div>
            <div className="p-1">
              <span className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Scientific Advisory Board</span>
              <p className="leading-relaxed text-xs">
                Developed under the technical advisement of <strong>Paul Spiewak</strong> (former analytical chemist & science enthusiast), <strong>Allen Melcer</strong> (former environmental manager at the US Environmental Protection Agency), and <strong>James Bland</strong> (former contributor to freshwater ecosystems at the Shedd Aquarium and environmental sciences professor). Project management was coordinated by <strong>Becky Sawle</strong> (former AbbVie Innovation Projects Lead).
              </p>
            </div>
          </footer>

        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
      <section className="w-full flex flex-col gap-3 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 p-3 shadow-[0_24px_80px_rgba(23,38,58,0.16)] backdrop-blur-md md:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:p-4">
        <header className="border-b border-slate-200 rounded-2xl px-4 py-3">
            <div className="flex items-center justify-center gap-2 text-center">
              <h1 className="mt-1 text-lg font-semibold leading-tight text-slate-900 sm:text-xl">
                Lake County Lake Lovers' Phosphorus Loading Calculator
              </h1>
              <button
                type="button"
                onClick={() => {
                  setValidationErrors({
                    surfaceArea: '',
                    meanDepth: '',
                    lakePhosphorus: '',
                    sedimentPhosphorus: '',
                    secchi: '',
                  })
                  setSelectedHelp('overview')
                }}
                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-blue-50"
                aria-label="Calculator instructions"
              >
                i
              </button>
            </div>
        </header>
        
        <div className="rounded-3xl p-3">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Active Help & Diagnostics
            </div>

            <div className="mt-1.5 text-base font-semibold text-slate-900">
              {selectedHelpContent.title}
            </div>
            <div className="mt-1.5 text-sm leading-5 text-slate-700">
              <span>{selectedHelpContent.description}</span>
              {(selectedHelpContent.title === 'Surface area' || 
                selectedHelpContent.title === 'Mean depth' || 
                selectedHelpContent.title === 'Total phosphorus in the lake water') && (
                <Link href="https://www.lakecountyil.gov/2400/Lake-Reports" target="_blank" className="text-blue-600 hover:underline ml-1">
                  Lake Reports
                </Link>
              )}
            </div>
            <div className="mt-2 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {selectedHelpContent.note}
            </div>

            {activeErrorsList.length > 0 ? (
              <div className="my-3 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700">
                <ul className="list-none list-inside space-y-1 text-xs">
                  {activeErrorsList.map(({ key, msg }) => (
                    <li key={key}>
                      <strong>{msg}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

        <div className="flex min-h-0 flex-row overflow-hidden">
          <div className="grid min-h-0 flex-1 gap-3 overflow-hidden md:grid-cols-2">
            <div className="rounded-3xl p-3">
              <div className="mb-3 flex text-center justify-between border-b border-slate-200 pb-2.5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Required Inputs
                </div>
              </div>

              <div className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_32px] sm:items-center">
                <div className="rounded-xl bg-slate-50 px-3 py-2">
                  <div className="text-sm font-semibold leading-tight text-slate-900">Lake</div>
                </div>
                
                <div className="relative block min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen)
                      setSelectedHelp('lake')
                    }}
                    onFocus={() => setSelectedHelp('lake')}
                    disabled={loading}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2 text-left text-slate-700 shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
                  >
                    <span className="truncate">
                      {loading ? 'Loading Lakes...' : selectedLake || 'Choose Lake'}
                    </span>
                    <span aria-hidden="true" className="text-slate-500 text-s ml-2">
                      ▾
                    </span>
                  </button>

                  {isDropdownOpen && !loading && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsDropdownOpen(false)} 
                      />
                      
                      <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              handleLakeChange('')
                              setIsDropdownOpen(false)
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-slate-500 hover:bg-slate-50 transition"
                          >
                            Clear Selection
                          </button>
                        </li>
                        
                        {lakeOptions.slice(1).map((lake) => (
                          <li key={lake}>
                            <button
                              type="button"
                              onClick={() => {
                                handleLakeChange(lake)
                                setIsDropdownOpen(false)
                              }}
                              className={`w-full px-4 py-2 text-left text-sm transition ${
                                selectedLake === lake 
                                  ? 'bg-blue-50 font-semibold text-blue-700' 
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {lake}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedHelp('lake')}
                  className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-600 shadow-sm"
                  aria-label="Lake selector information"
                >
                  i
                </button>
              </div>

<div className="mt-3 grid gap-4 sm:grid-rows-2">
  {inputRows.map((row) => {
    const hasError = validationErrors[row.key] !== '';
    return (
      <div
        key={row.key}
        className={`grid gap-2 rounded-2xl border p-2.5 shadow-sm sm:grid-cols-[130px_1fr_32px] sm:items-center transition-colors duration-200 ${
          hasError 
            ? 'border-red-400 bg-red-50/50' 
            : 'border-slate-200 bg-white'
        }`}
      >
        {/* Fixed Width Label Box */}
        <div className={`rounded-xl px-3 py-2 transition-colors duration-200 ${hasError ? 'bg-red-100/50' : 'bg-slate-50'}`}>
          <div className={`text-sm font-semibold leading-tight ${hasError ? 'text-red-900' : 'text-slate-900'}`}>
            {row.label}
          </div>
        </div>

        {/* Flexible Input + Unit Dropdown Container */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row">
          <input
            type={row.kind}
            value={
              row.key === 'surfaceArea'
                ? surfaceAreaDraft
                : row.key === 'meanDepth'
                  ? meanDepthDraft
                  : lakePhosphorusDraft
            }
            onChange={(event) => {
              setValidationErrors((current) => ({
                ...current,
                [row.key]: '',
              }))

              if (row.key === 'surfaceArea') {
                setSurfaceAreaDraft(event.target.value)
                return
              }

              if (row.key === 'meanDepth') {
                setMeanDepthDraft(event.target.value)
                return
              }

              setLakePhosphorusDraft(event.target.value)
            }}
            placeholder={row.placeholder}
            className={`min-w-0 flex-1 rounded-xl border px-3 py-2 text-center text-slate-800 shadow-sm outline-none transition focus:ring-2 ${
              hasError 
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
                : 'border-slate-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 bg-white'
            }`}
          />

          <label className="relative min-w-0 sm:w-36 sm:shrink-0">
            <span className="sr-only">{row.label} units</span>
            <select
              value={activeUnit[row.key]}
              onChange={(event) =>
                setActiveUnit((current) => ({
                  ...current,
                  [row.key]: event.target.value,
                }))
              }
              className={`w-full appearance-none rounded-xl border px-3 py-2 pr-8 text-left text-xs sm:text-sm text-slate-700 shadow-sm outline-none transition focus:ring-2 ${
                hasError 
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-white' 
                  : 'border-slate-300 focus:border-blue-300 focus:ring-blue-100 bg-white'
              }`}
            >
              {row.unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-500">
              ▾
            </span>
          </label>
        </div>

        {/* Info Button pinned to right column */}
        <button
          type="button"
          onClick={() => setSelectedHelp(row.key)}
          className={`mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white text-sm font-semibold shadow-sm transition-colors duration-200 ${
            hasError ? 'border-red-300 text-red-600 hover:bg-red-50' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
          }`}
          aria-label={`${row.label} information`}
        >
          i
        </button>
      </div>
    )
  })}
</div>
            </div>

            <div className="rounded-3xl p-3">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Optional & Supplemental Inputs
              </div>

              <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                
                <div className={`grid gap-2 rounded-2xl border p-2.5 shadow-sm sm:grid-cols-[130px_1fr_32px] sm:items-center transition-colors duration-200 ${
  validationErrors.sedimentPhosphorus !== '' 
    ? 'border-red-400 bg-red-50/50' 
    : 'border-slate-200 bg-white'
}`}>
  <div className={`rounded-xl px-3 py-2.5 ${validationErrors.sedimentPhosphorus !== '' ? 'bg-red-100/50' : 'bg-slate-50'}`}>
    <div className={`text-sm font-semibold leading-tight ${validationErrors.sedimentPhosphorus !== '' ? 'text-red-900' : 'text-slate-900'}`}>
      {optionalUnitRow.label}
    </div>
  </div>

  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row">
    <input
      type={optionalUnitRow.kind}
      value={sedimentPhosphorusDraft}
      onChange={(event) => {
        setValidationErrors(current => ({ ...current, sedimentPhosphorus: '' }))
        setSedimentPhosphorusDraft(event.target.value)
      }}
      placeholder={optionalUnitRow.placeholder}
      className={`min-w-0 flex-1 rounded-xl border px-3 py-2 text-center text-slate-800 shadow-sm outline-none transition focus:ring-2 ${
        validationErrors.sedimentPhosphorus !== '' 
          ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
          : 'border-slate-300 focus:border-blue-300 focus:ring-blue-100 bg-white'
      }`}
    />

    <label className="relative min-w-0 sm:w-36 sm:shrink-0">
      <span className="sr-only">{optionalUnitRow.label} units</span>
      <select
        value={activeUnit[optionalUnitRow.key]}
        onChange={(event) =>
          setActiveUnit((current) => ({
            ...current,
            [optionalUnitRow.key]: event.target.value,
          }))
        }
        className={`w-full appearance-none rounded-xl border px-3 py-2 pr-8 text-left text-xs sm:text-sm text-slate-700 shadow-sm outline-none transition focus:ring-2 ${
          validationErrors.sedimentPhosphorus !== '' 
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-white' 
            : 'border-slate-300 focus:border-blue-300 focus:ring-blue-100 bg-white'
        }`}
      >
        {optionalUnitRow.unitOptions.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-500">
        ▾
      </span>
    </label>
  </div>

  <button
    type="button"
    onClick={() => setSelectedHelp('sedimentPhosphorus')}
    className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-600 shadow-sm"
    aria-label="Sediment phosphorus information"
  >
    i
  </button>
</div>

                <div className={`flex flex-col gap-2 rounded-2xl border p-2.5 shadow-sm sm:grid-cols-[minmax(0,1fr)_minmax(132px,150px)_32px] sm:items-start transition-colors duration-200 ${
                  validationErrors.secchi !== '' 
                    ? 'border-red-400 bg-red-50/50' 
                    : 'border-slate-200 bg-white'
                }`}>
                    <div className="flex flex-col justify-center gap-2 sm:flex-row w-full">
                      <div className={`rounded-xl w-full px-3 py-2.5 ${validationErrors.secchi !== '' ? 'bg-red-100/50' : 'bg-slate-50'}`}>
                        <div className={`text-sm font-semibold leading-tight ${validationErrors.secchi !== '' ? 'text-red-900' : 'text-slate-900'}`}>Secchi Depth</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedHelp('secchi')}
                        className="mx-auto flex h-8 min-w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-600 shadow-sm"
                        aria-label="Secchi depth information"
                      >
                        i
                      </button>
                    </div>
                  
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row w-full">
                      <input
                        type="number"
                        value={secchiDraft}
                        onChange={(event) => {
                          setValidationErrors(current => ({ ...current, secchi: '' }))
                          setSecchiDraft(event.target.value)
                        }}
                        placeholder=""
                        className={`min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-slate-800 shadow-sm outline-none transition focus:ring-2 ${
                          validationErrors.secchi !== '' 
                            ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
                            : 'border-slate-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 bg-white'
                        }`}
                      />
                      
                      <button
                        type="button"
                        onClick={addSecchiMeasurement}
                        disabled={!canAddSecchi}
                        className="rounded-xl border border-blue-300 bg-blue-100/80 px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Add
                      </button>
                      
                      <label className="relative min-w-0 flex-none sm:w-[148px]">
                        <span className="sr-only">Secchi units</span>
                        <select
                          value={activeUnit.secchi}
                          onChange={(event) =>
                            setActiveUnit((current) => ({
                              ...current,
                              secchi: event.target.value,
                            }))
                          } 
                          className={`w-full appearance-none rounded-xl border px-3 py-2.5 pr-9 text-left text-sm text-slate-700 shadow-sm outline-none transition focus:ring-2 ${
                            validationErrors.secchi !== '' 
                              ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-white' 
                              : 'border-slate-300 focus:border-blue-300 focus:ring-blue-100 bg-white'
                          }`}
                        >
                          {secchiUnitOptions.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                          ▾
                        </span>
                      </label>
                    </div>
                
                    <div className="flex flex-wrap gap-2 w-full">
                      {secchiEntries.map((entry) => (
                        <button
                          type="button"
                          key={entry.id}
                          onClick={() => removeSecchiMeasurement(entry.id)}
                          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-slate-800 shadow-sm transition hover:bg-blue-100"
                          aria-label={`Remove secchi measurement ${entry.value}`}
                        >
                          <span>{entry.value}</span>
                          <span aria-hidden="true" className="text-base leading-none">
                            ×
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <aside className="grid min-h-0 gap-3 overflow-hidden">
          <div className="rounded-3xl p-3 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Actions
            </div>
            <div className="mt-2 grid gap-2">
              <Link
                href="/background"
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-center text-base font-semibold text-slate-800 shadow-sm transition hover:bg-blue-50"
              >
                Background Reference
              </Link>
              <button
                type="button"
                onClick={calculatePhosphorusLoading}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-center text-base font-semibold text-slate-800 shadow-sm transition hover:bg-blue-50"
              >
                Calculate
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}