"use client"

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

type HelpKey = 'overview' | 'lake' | 'surfaceArea' | 'meanDepth' | 'lakePhosphorus' | 'sedimentPhosphorus' | 'secchi'
type UnitKey = 'surfaceArea' | 'meanDepth' | 'lakePhosphorus' | 'sedimentPhosphorus' | 'secchi'

interface LakeDetails {
  surfaceArea: number
  meanDepth: number
  lakePhosphorus: number
  sedimentPhosphorus?: number
  dataYear?: number
  [key: string]: any
}

const helpCopy: Record<HelpKey, { title: string; description: string; note: string }> = {
  overview: {
    title: 'How to use this calculator',
    description:
      'In order to use this calculator, you will need information about your lakes, including surface area, average depth, and total phosphorus measurements. If you select your lake from the dropdown, values will pre-fill automatically. Units can be adjusted via unit options next to each input.',
    note: 'General Instructions',
  },
  lake: {
    title: 'Choose a lake',
    description:
      'Use the dropdown to select a lake. With a recognized lake, the calculator can prefill known values such as surface area and average depth. If your lake is not listed, leave blank and manually enter your lake\'s metrics.',
    note: 'Dropdown control',
  },
  surfaceArea: {
    title: 'Surface area',
    description: `Enter the surface area of your lake. If you selected a lake from the dropdown, this field has been filled automatically. In Lake County, find recent Health Department measurements here: `,
    note: 'Required input',
  },
  meanDepth: {
    title: 'Average depth',
    description:
      'Enter the mean, or average, depth of your lake. If you selected a lake from the dropdown, this field has been filled automatically. In Lake County, find recent Health Department measurements here: ',
    note: 'Required input',
  },
  lakePhosphorus: {
    title: 'Total phosphorus in the lake water',
    description:
      'This measures the total phosphorus concentration 3 feet below the water surface. If selected from the dropdown, this pre-fills automatically. However, total phosphorus concentration in the water column changes over the years, and beware that the lake report data can be a decade old. If you have a more recent measurement of Total Phosphorus, use that. Otherwise, in Lake County, you can find the most recently available reports here: ',
    note: 'Required input',
  },
  sedimentPhosphorus: {
    title: 'Total Phosphorous (Sediment)',
    description:
      'Enter the total phosphorus in the lake\'s sediment. This is typically received from a professional sediment fractionation test. If unavailable, leave this blank and use alternative estimation methods.',
    note: 'Optional input',
  },
  secchi: {
    title: 'Secchi depth measurements',
    description:
      'Enter secchi depth measurements available for your lake. Enter single values or comma-separated numbers (e.g. 5.2, 6.1, 4.8) and click the add button to add each measurement. Try to add measurements from over the course of the season to get a more accurate average. You can add up to 12 measurements.',
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
    label: 'Average Depth',
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
    dataYear: string
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
  type LakeOption = string | { id?: string; value?: string; name?: string; label?: string };
  const [lakeOptions, setLakeOptions] = useState<LakeOption[]>([])
  const [loading, setLoading] = useState(true)

  const [activeInlineTooltip, setActiveInlineTooltip] = useState<HelpKey | null>(null)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (key: HelpKey) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => {
      setActiveInlineTooltip(key)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = setTimeout(() => {
      setActiveInlineTooltip(null)
    }, 200)
  }
  
  const [selectedLake, setSelectedLake] = useState('')
  const [isPrefilled, setIsPrefilled] = useState(false)
  const [dataYear, setDataYear] = useState<string>('')

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
  const [reportDate, setReportDate] = useState(() => new Date().toISOString().split('T')[0])

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

  const canAddSecchi = secchiDraft.trim().length > 0

  const handleLakeChange = (lakeName: string) => {
    setSelectedLake(lakeName)
    
    const data = lakeData[lakeName]
    
    if (lakeName && data) {
      if (data.surfaceArea != null) setSurfaceAreaDraft(data.surfaceArea.toString())
      if (data.meanDepth != null) setMeanDepthDraft(data.meanDepth.toString())
      if (data.lakePhosphorus != null) setLakePhosphorusDraft(data.lakePhosphorus.toString())
      if (data.sedimentPhosphorus != null) setSedimentPhosphorusDraft(data.sedimentPhosphorus.toString())
      if (data.dataYear != null) setDataYear(data.dataYear.toString())
      setIsPrefilled(true)
      
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
    } else {
      setIsPrefilled(false)
      setDataYear('')
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
    } else if (saValue <= 0) {
      errors.surfaceArea = 'Value must be greater than 0.'
    }

    if (mdValue == null) {
      errors.meanDepth = 'Average depth is required.'
    } else if (mdValue <= 0) {
      errors.meanDepth = 'Value must be greater than 0.'
    }

    if (lpValue == null) {
      errors.lakePhosphorus = 'Total Phosphorus is required.'
    } else if (lpValue <= 0) {
      errors.lakePhosphorus = 'Value must be greater than 0.'
    }

    if (sedValue != null && sedValue <= 0) {
      errors.sedimentPhosphorus = 'Value must be greater than 0.'
    }

    setValidationErrors(errors)

    const hasAnyError = Object.values(errors).some(msg => msg !== '')
    if (hasAnyError) {
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
        dataYear: dataYear,
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addSecchiMeasurement = () => {
    const rawInput = secchiDraft.trim()
    if (!rawInput) return

    const tokens = rawInput.split(/[\s,]+/).filter(Boolean)
    const newEntries: SecchiEntry[] = []
    let hasInvalid = false

    for (const token of tokens) {
      const valNum = Number(token)
      if (isNaN(valNum) || valNum <= 0) {
        hasInvalid = true;
        break;
      }
      if (secchiEntries.length + newEntries.length >= 12) {
        setValidationErrors(prev => ({ ...prev, secchi: 'Cannot exceed a total of 12 Secchi measurements.' }))
        break;
      }
      newEntries.push({ id: crypto.randomUUID(), value: token })
    }

    if (hasInvalid) {
      setValidationErrors(prev => ({ ...prev, secchi: 'Please enter valid positive numbers greater than 0 separated by commas.' }))
      return
    }

    if (newEntries.length > 0) {
      setValidationErrors(prev => ({ ...prev, secchi: '' }))
      setSecchiEntries((current) => [...current, ...newEntries])
      setSecchiDraft('')
    }
  }

  const removeSecchiMeasurement = (entryIdToRemove: string) => {
    const updatedEntries = secchiEntries.filter((entry) => entry.id !== entryIdToRemove)
    setSecchiEntries(updatedEntries)
    if (updatedEntries.length < 12) {
      setValidationErrors(prev => ({ ...prev, secchi: '' }))
    }
  }

  const downloadPdfReport = () => {
    window.print()
  }

  const activeErrorsList = Object.entries(validationErrors)
    .filter(([_, msg]) => msg !== '')
    .map(([key, msg]) => ({ key, msg }))

  const renderTooltipCard = (key: HelpKey) => {
    if (activeInlineTooltip !== key) return null
    const content = helpCopy[key]
    return (
      <div className="mt-2 rounded-xl border border-blue-200 bg-blue-50/90 p-3 text-xs text-slate-800 shadow-sm animate-fadeIn">
        <div className="font-bold text-blue-900 mb-1">{content.title}</div>
        <div>
          {content.description}
          {(key === 'surfaceArea' || key === 'meanDepth' || key === 'lakePhosphorus') && (
            <Link href="https://www.lakecountyil.gov/2400/Lake-Reports" target="_blank" className="text-blue-700 font-semibold underline ml-1">
              Lake Reports
            </Link>
          )}
        </div>
        <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">{content.note}</div>
      </div>
    )
  }

  if (view === 'results' && results) {
    return (
      <main className="mx-auto w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
        <section className="w-full flex flex-col gap-5 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 p-4 backdrop-blur-md">
          
          <header className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Phosphorus Loading Results: {results.inputs.lake ? results.inputs.lake : 'Unlisted Lake'}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                Report Date:
                <input 
                  type="date" 
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-1.5 font-semibold text-slate-800 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <button
                type="button"
                onClick={downloadPdfReport}
                className="rounded-xl border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 print:hidden"
              >
                Download PDF Report
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setView('input')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 print:hidden"
              >
                Edit Inputs
              </button>
            </div>
          </header>

          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Your Inputs</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="block text-xs text-slate-500">Lake County Health Data Year</span>
                <strong className="text-slate-800">{results.inputs.dataYear == '' ? 'N/A' : results.inputs.dataYear}</strong>
              </div>
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
              {results.inputs.secchiEntries.length == 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200/60 text-sm">
                <span className="block text-xs text-slate-500 mb-1">Secchi Readings</span>
                <strong className="text-slate-800">
                  Skipped
                </strong>
              </div>
              )}
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
                  The result labeled Est. Internal Phosphorus Loading is the 
                  most reliable estimate. <strong>Treat all of the measurements 
                  as a range of possible values</strong> rather than believing in a single precise 
                  value. <strong>The Total Phosphorus model must be used with caution</strong>, since if the data was 
                  from an old lake report, it is representative of an older condition of the lake.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center border-b border-dashed border-rose-200/50 pb-1.5">
                    <span className="text-xs text-slate-700">Sediment Model:</span>
                    <strong className="text-sm font-mono text-slate-900">{results.internalSed ? `${Number(results.internalSed).toFixed(0)} lbs/yr` : '—'}</strong>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed border-rose-200/50 pb-1.5">
                    <span className="text-xs text-slate-700">Secchi Model:</span>
                    <strong className="text-sm font-mono text-slate-900">{results.internalSecchi ? `${Number(results.internalSecchi).toFixed(0)} lbs/yr` : '—'}</strong>
                  </div>
                  <div className="flex justify-between items-center pb-1.5">
                    <span className="text-xs text-slate-700">Lake TP Model:</span>
                    <strong className="text-sm font-mono text-slate-900">{results.internalLake ? `${Number(results.internalLake).toFixed(0)} lbs/yr` : '—'}</strong>
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
              </div>
              <div className="mt-4 bg-sky-100 border border-sky-300 rounded-xl p-2.5 text-center text-sky-800 text-xs font-semibold">
                Placeholder
              </div>
            </div>
            
            <div className="flex flex-col justify-between rounded-2xl bg-emerald-50/50 p-5 shadow-sm border border-emerald-100">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800">3. Algal Blooms</h4>
              </div>
              <div className="mt-4 bg-emerald-100 border border-emerald-300 rounded-xl p-2.5 text-center text-emerald-800 text-xs font-semibold">
                Placeholder
              </div>
            </div>
          </div>

          <footer className="mt-6 border-t border-slate-200 pt-5 text-xs text-slate-500 space-y-4">
            <div className="p-1">
              <span className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Disclaimer & Modeling Limitations</span>
              <p className="leading-relaxed text-xs">
                The output is just an estimate of the phosphorus load based on published formulas from Gertrud Nernberg's book Lake Functioningand extensive research on lakes in Northern America. This estimate provides an in-the-ballpark value helpful for treatment decisions rather than a precise one. It is not equivalent to site-specific data produced by certified environmental professionals.
              </p>
            </div>
            <div className="p-1">
              <span className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Academic Literature Framework</span>
              <p className="leading-relaxed text-xs">
              The major formulas utilized come from Gertrud Nurnberg's authoritative volume Lake Functioning, as well as peer-reviewed research papers authored by Gertrud Nurnberg, Lindsey D. Carter, and Andrew R. Dzialowski published in reputable Freshwater Science Journals. See detailed references in the background section.
              </p>
            </div>
            <div className="p-1">
              <span className="block font-bold text-slate-700 uppercase tracking-wide mb-1.5">Scientific Advisory Board</span>
              <p className="leading-relaxed text-xs">
              Developed under the technical advisement of Paul Spiewak (former analytical chemist & science enthusiast), Allen Melcer (former environmental manager at the US Environmental Protection Agency), and James Bland (former contributor to freshwater ecosystems at the Shedd Aquarium and environmental sciences professor). Project management was coordinated by Becky Sawle (former AbbVie Innovation Projects Lead).
              </p>
            </div>
          </footer>

        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
      <section className="w-full flex flex-col gap-3 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 p-3 backdrop-blur-md md:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:p-4">
        <header className="border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-center">
            <h1 className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">
              Lake County Lake Lovers' Phosphorus Loading Calculator
            </h1>
          </div>
        </header>

        {/* Global Guidance Notice */}
        <div className="rounded-2xl p-3 text-xs text-black-900">
          <p className="font-semibold">Important Guidelines:</p>
          <ul className="mt-1 list-none list-inside space-y-0.5 text-slate-900">
            <li>Multiple units are supported for each input. <strong>Select your preferred unit using the dropdown</strong> next to each field.</li>
            <li>Especially be careful about the distinction between <strong>Phosphorus & Phosphate</strong></li>
            <li>Ensure all entered data inputs are collected from the <strong>same calendar year</strong> for consistency, but <strong>Total Phosphorus is an exception to this rule</strong></li>
          </ul>
        </div>

        {/* Active Errors List */}
        {activeErrorsList.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700">
            <ul className="list-none space-y-1 text-xs">
              {activeErrorsList.map(({ key, msg }) => (
                <li key={key}>
                  <strong>{msg}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex min-h-0 flex-row overflow-hidden">
          <div className="grid min-h-0 flex-1 gap-4 overflow-hidden md:grid-cols-2">
            
            {/* REQUIRED INPUTS SECTION */}
            <div>
              <div className="mb-4 border-b-2 border-blue-600 pb-2">
                <h2 className="text-base font-extrabold uppercase tracking-wider text-blue-950">
                  1. Required Inputs
                </h2>
              </div>

              {/* Lake Select Row */}
              <div>
                <div 
                  onMouseEnter={() => handleMouseEnter('lake')}
                  onMouseLeave={handleMouseLeave}
                  className={`grid gap-2 rounded-2xl border p-2.5 shadow-sm transition-colors duration-200 sm:grid-cols-[130px_1fr] sm:items-center ${
                    selectedLake ? 'border-indigo-300 bg-indigo-50/60' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="rounded-xl bg-slate-100 px-3 py-2">
                    <div className="text-sm font-bold text-slate-900">Lake</div>
                  </div>
                  
                  <div className="relative min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      disabled={loading}
                      className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2 text-left text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
                    >
                      <span className="truncate">
                        {loading ? 'Loading Lakes...' : selectedLake || 'Choose Lake'}
                      </span>
                      <span aria-hidden="true" className="ml-2 text-xs text-slate-500">▾</span>
                    </button>

                    {isDropdownOpen && !loading && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                        <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                handleLakeChange('')
                                setIsDropdownOpen(false)
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-slate-500 hover:bg-slate-50"
                            >
                              Clear Selection
                            </button>
                          </li>
                          {(lakeOptions || []).slice(1).map((lake, index) => {
                            const lakeLabel = typeof lake === 'string' ? lake : lake?.name || lake?.label || String(lake)
                            const lakeValue = typeof lake === 'string' ? lake : lake?.value || lake?.id || lakeLabel
                            return (
                              <li key={lakeValue || index}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleLakeChange(lakeValue)
                                    setIsDropdownOpen(false)
                                  }}
                                  className={`w-full px-4 py-2 text-left text-sm ${
                                    selectedLake === lakeValue ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  {lakeLabel}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* INPUT PAGE BANNER INDICATOR */}
                {selectedLake && (
                  <div className="mt-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-800 bg-indigo-100/80 rounded-lg flex items-center justify-between shadow-sm">
                    <span>Auto-filled from Lake County Health Dept. Lake Reports (Year: {dataYear ?? 'N/A'})</span>
                  </div>
                )}

                {renderTooltipCard('lake')}
              </div>

              {/* Required Input Rows */}
              <div className="mt-3 grid gap-3">
                {inputRows.map((row) => {
                  const hasError = validationErrors[row.key] !== '';
                  return (
                    <div key={row.key}>
                      <div
                        onMouseEnter={() => handleMouseEnter(row.key)}
                        onMouseLeave={handleMouseLeave}
                        className={`grid gap-2 rounded-2xl border p-2.5 shadow-sm sm:grid-cols-[130px_1fr] sm:items-center transition-colors duration-200 ${
                          hasError 
                            ? 'border-red-400 bg-red-50/50' 
                            : isPrefilled
                              ? 'border-indigo-200 bg-indigo-50/40'
                              : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className={`rounded-xl px-3 py-2 ${hasError ? 'bg-red-100/50' : 'bg-slate-100'}`}>
                          <div className={`text-sm font-bold leading-tight ${hasError ? 'text-red-900' : 'text-slate-900'}`}>
                            {row.label}
                          </div>
                        </div>

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
                              setValidationErrors((current) => ({ ...current, [row.key]: '' }))
                              if (row.key === 'surfaceArea') setSurfaceAreaDraft(event.target.value)
                              else if (row.key === 'meanDepth') setMeanDepthDraft(event.target.value)
                              else setLakePhosphorusDraft(event.target.value)
                            }}
                            placeholder={row.placeholder}
                            className={`min-w-0 flex-1 rounded-xl border px-3 py-2 text-center text-slate-800 shadow-sm outline-none transition focus:ring-2 ${
                              hasError 
                                ? 'border-red-300 focus:border-red-400 focus:ring-red-100 bg-red-50/30' 
                                : 'border-slate-300 focus:border-blue-300 focus:ring-blue-100 bg-white'
                            }`}
                          />

                          <label className="relative min-w-0 sm:w-36 sm:shrink-0">
                            <span className="sr-only">{row.label} units</span>
                            <select
                              value={activeUnit[row.key]}
                              onChange={(event) =>
                                setActiveUnit((current) => ({ ...current, [row.key]: event.target.value }))
                              }
                              className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 pr-8 text-xs sm:text-sm text-slate-700 shadow-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                            >
                              {row.unitOptions.map((unit) => (
                                <option key={unit} value={unit}>
                                  {unit}
                                </option>
                              ))}
                            </select>
                            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-500">▾</span>
                          </label>
                        </div>
                      </div>
                      {renderTooltipCard(row.key)}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* OPTIONAL INPUTS SECTION */}
            <div>
              <div className="mb-4 border-b-2 border-sky-400 pb-2">
                <h2 className="text-base font-extrabold uppercase tracking-wider text-emerald-950">
                  2. Optional & Supplemental Inputs
                </h2>
              </div>

              <div className="space-y-3">
                {/* Sediment Phosphorus Row */}
                <div>
                  <div 
                    onMouseEnter={() => handleMouseEnter('sedimentPhosphorus')}
                    onMouseLeave={handleMouseLeave}
                    className={`grid gap-2 rounded-2xl border p-2.5 shadow-sm sm:grid-cols-[130px_1fr] sm:items-center ${
                      validationErrors.sedimentPhosphorus !== '' ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="rounded-xl bg-slate-100 px-3 py-2">
                      <div className="text-sm font-bold text-slate-900">{optionalUnitRow.label}</div>
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
                        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-center text-slate-800 shadow-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                      />

                      <label className="relative min-w-0 sm:w-36 sm:shrink-0">
                        <select
                          value={activeUnit[optionalUnitRow.key]}
                          onChange={(event) =>
                            setActiveUnit((current) => ({ ...current, [optionalUnitRow.key]: event.target.value }))
                          }
                          className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 pr-8 text-xs sm:text-sm text-slate-700 shadow-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                        >
                          {optionalUnitRow.unitOptions.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-500">▾</span>
                      </label>
                    </div>
                  </div>
                  {renderTooltipCard('sedimentPhosphorus')}
                </div>

                {/* Secchi Depth Row */}
                <div>
                  <div 
                    onMouseEnter={() => handleMouseEnter('secchi')}
                    onMouseLeave={handleMouseLeave}
                    className={`flex flex-col gap-2 rounded-2xl border p-2.5 shadow-sm ${
                      validationErrors.secchi !== '' ? 'border-red-400 bg-red-50/50' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-col justify-center gap-2 sm:flex-row w-full">
                      <div className="rounded-xl w-full bg-slate-100 px-3 py-2">
                        <div className="text-sm font-bold text-slate-900">Secchi Depth</div>
                      </div>
                    </div>
                  
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row w-full">
                      <input
                        type="text"
                        value={secchiDraft}
                        onChange={(event) => {
                          setValidationErrors(current => ({ ...current, secchi: '' }))
                          setSecchiDraft(event.target.value)
                        }}
                        placeholder="e.g. 5.2, 6.1, 4.8"
                        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                      />
                      
                      <button
                        type="button"
                        onClick={addSecchiMeasurement}
                        disabled={!canAddSecchi}
                        className="rounded-xl border border-blue-300 bg-blue-100/80 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        Add
                      </button>
                      
                      <label className="relative min-w-0 flex-none sm:w-[148px]">
                        <select
                          value={activeUnit.secchi}
                          onChange={(event) =>
                            setActiveUnit((current) => ({ ...current, secchi: event.target.value }))
                          } 
                          className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 pr-9 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                        >
                          {secchiUnitOptions.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">▾</span>
                      </label>
                    </div>
                
                    <div className="flex flex-wrap gap-2 w-full pt-1">
                      {secchiEntries.map((entry) => (
                        <button
                          type="button"
                          key={entry.id}
                          onClick={() => removeSecchiMeasurement(entry.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm hover:bg-blue-100"
                        >
                          <span>{entry.value}</span>
                          <span aria-hidden="true" className="text-sm font-bold leading-none text-slate-500">×</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {renderTooltipCard('secchi')}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Action Controls */}
        <aside className="mt-2">
          <div className="rounded-3xl p-3 bg-slate-100/80 flex flex-col sm:flex-row gap-3 justify-end items-center">
            <Link
              href="/background"
              className="w-full sm:w-auto rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Background Reference
            </Link>
            <button
              type="button"
              onClick={calculatePhosphorusLoading}
              className="w-full sm:w-auto rounded-2xl bg-blue-600 px-6 py-2.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              Calculate Phosphorus Loading
            </button>
          </div>
        </aside>
      </section>
    </main>
  )
}