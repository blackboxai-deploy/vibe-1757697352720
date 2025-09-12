'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Line } from 'recharts'
import { Download, Sun, Moon } from 'lucide-react'

interface CampaignData {
  name: string
  gasto: number
  ctr: number
  cpc: number
  costoResultado: number
  resultadoLabel: string
  impresiones: number
  alcance: number
  resultados: number
  clicks: number
  embudo: 'TOFU' | 'MOFU' | 'BOFU'
}

const campaignData: CampaignData[] = [
  {
    name: 'TOFU: WSP Prospección',
    gasto: 1100.00,
    ctr: 1.60,
    cpc: 0.314,
    costoResultado: 0.80,
    resultadoLabel: 'Costo/Conversación',
    impresiones: 218750,
    alcance: 95000,
    resultados: 1375,
    clicks: 3500,
    embudo: 'TOFU'
  },
  {
    name: 'MOFU: Interacción',
    gasto: 900.00,
    ctr: 0.52,
    cpc: 0.360,
    costoResultado: 0.004,
    resultadoLabel: 'Costo/Interacción',
    impresiones: 477397,
    alcance: 226000,
    resultados: 225000,
    clicks: 2500,
    embudo: 'MOFU'
  },
  {
    name: 'TOFU: VideoViews',
    gasto: 350.00,
    ctr: 0.20,
    cpc: 0.720,
    costoResultado: 0.015,
    resultadoLabel: 'Costo/Thruplay',
    impresiones: 243000,
    alcance: 59000,
    resultados: 23333,
    clicks: 486,
    embudo: 'TOFU'
  },
  {
    name: 'BOFU: RM LPV',
    gasto: 200.00,
    ctr: 6.60,
    cpc: 0.057,
    costoResultado: 0.08,
    resultadoLabel: 'Costo/LPV',
    impresiones: 53030,
    alcance: 35000,
    resultados: 2500,
    clicks: 3500,
    embudo: 'BOFU'
  },
  {
    name: 'BOFU: RM Tráfico',
    gasto: 183.79,
    ctr: 7.50,
    cpc: 0.040,
    costoResultado: 0.040,
    resultadoLabel: 'Costo/Clic',
    impresiones: 61253,
    alcance: 24000,
    resultados: 4594,
    clicks: 4594,
    embudo: 'BOFU'
  }
]

const funnelData = [
  { name: 'TOFU (Top)', value: 1450.00, color: '#3B82F6' },
  { name: 'MOFU (Middle)', value: 900.00, color: '#F59E0B' },
  { name: 'BOFU (Bottom)', value: 383.79, color: '#10B981' }
]

const kpiData = {
  gastoTotal: 2733.79,
  alcance: 404763,
  impresiones: 1053430,
  clicksEnlace: 14580,
  resultadosTotales: 275400,
  costoResultado: 0.0099
}

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setIsDarkMode(savedTheme === 'dark')
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'gasto' ? `Gasto: S/ ${entry.value.toFixed(2)}` :
               entry.dataKey === 'ctr' ? `CTR: ${entry.value}%` :
               entry.dataKey === 'costoResultado' ? `Costo: S/ ${entry.value.toFixed(3)}` :
               `${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Dashboard de Resultados de Campaña
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Periodo: 20-ago-2025 → 12-sep-2025
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </header>

        {/* KPIs Section */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="kpi-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gasto Total</h3>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                S/ {kpiData.gastoTotal.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="kpi-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Alcance</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {kpiData.alcance.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="kpi-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Impresiones</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {kpiData.impresiones.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="kpi-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Clicks en Enlace</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {kpiData.clicksEnlace.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="kpi-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resultados Totales</h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {kpiData.resultadosTotales.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="kpi-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Costo/Resultado</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                S/ {kpiData.costoResultado.toFixed(4)}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Charts & Downloads Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Charts Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Gasto vs. CTR por Campaña</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={campaignData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar yAxisId="left" dataKey="gasto" fill="#4F46E5" opacity={0.7} />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="ctr" 
                        stroke="#22C55E" 
                        strokeWidth={3}
                        dot={{ fill: '#22C55E', strokeWidth: 2, r: 6 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Costo por Resultado Específico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={campaignData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={100}
                      />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="costoResultado">
                        {campaignData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            index === 0 ? '#DB2777' :
                            index === 1 ? '#F59E0B' :
                            index === 2 ? '#10B981' :
                            index === 3 ? '#3B82F6' : '#8B5CF6'
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Side Column: Pie Chart & Downloads */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Gasto por Embudo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={funnelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`S/ ${value.toFixed(2)}`, 'Gasto']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {funnelData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">S/ {item.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recursos Descargables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 transform hover:scale-105 transition-all duration-200"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Descargar Excel Completo
                </Button>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 transform hover:scale-105 transition-all duration-200"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Descargar PDF con Gráficos
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why it works section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Por qué SÍ conviene la inversión
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: "1. Eficiencia de Awareness",
                content: "Pagando solo S/ 2.60 por mil impresiones, maximizamos el alcance para calentar audiencias a un costo mínimo.",
                highlight: "S/ 2.60 por mil impresiones"
              },
              {
                title: "2. Prueba Social Masiva",
                content: "Se lograron +225,000 interacciones a un costo de S/ 0.004. Esto construye credibilidad sin agotar el presupuesto.",
                highlight: "+225,000 interacciones"
              },
              {
                title: "3. Tráfico Cualificado",
                content: "En Remarketing, el CPC baja a S/ 0.040 con CTRs de hasta 7.5%, capturando demanda de alta intención a bajo costo.",
                highlight: "CTRs de hasta 7.5%"
              },
              {
                title: "4. Conversaciones a < S/ 1",
                content: "El costo por conversación en WhatsApp fue de S/ 0.80, una palanca de ventas directa y rentable para el equipo comercial.",
                highlight: "S/ 0.80"
              },
              {
                title: "5. Estrategia de Embudo",
                content: "La mezcla TOFU, MOFU y BOFU funciona: reconocimiento barato, prueba social masiva y cierres eficientes.",
                highlight: "TOFU, MOFU y BOFU"
              }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Campaign Details Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Resumen por Campaña
          </h2>
          <div className="space-y-4">
            {[
              {
                name: "TOFU – Ventas‑WSP Prospección",
                data: { gasto: 1100.00, impresiones: 218750, ctr: 1.60, cpc: 0.314, resultado: "1,375 convers.", costoRes: 0.80 }
              },
              {
                name: "MOFU – Interacción (Prueba Social)",
                data: { gasto: 900.00, impresiones: 477397, ctr: 0.52, cpc: 0.360, resultado: "225,000 interac.", costoRes: 0.004 }
              },
              {
                name: "TOFU – VideoViews / Alcance",
                data: { gasto: 350.00, impresiones: 243000, ctr: 0.20, cpc: 0.720, resultado: "23,333 thruplays", costoRes: 0.015 }
              },
              {
                name: "BOFU – Remarketing (Interacción → LPV)",
                data: { gasto: 200.00, impresiones: 53030, ctr: 6.60, cpc: 0.057, resultado: "2,500 LPVs", costoRes: 0.08 }
              },
              {
                name: "BOFU – Remarketing (Tráfico Web Max Clic)",
                data: { gasto: 183.79, impresiones: 61253, ctr: 7.50, cpc: 0.040, resultado: "4,594 clics", costoRes: 0.040 }
              }
            ].map((campaign, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100">
                    {campaign.name}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm text-center">
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400 block">Gasto</span>
                      <span className="text-gray-800 dark:text-gray-100">S/ {campaign.data.gasto.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400 block">Impresiones</span>
                      <span className="text-gray-800 dark:text-gray-100">{campaign.data.impresiones.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400 block">CTR</span>
                      <span className={`${campaign.data.ctr > 5 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-100'}`}>
                        {campaign.data.ctr}%
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400 block">CPC</span>
                      <span className={`${campaign.data.cpc < 0.1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-100'}`}>
                        S/ {campaign.data.cpc.toFixed(3)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400 block">Resultado</span>
                      <span className="text-green-600 dark:text-green-400">{campaign.data.resultado}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400 block">Costo/Res.</span>
                      <span className="text-green-600 dark:text-green-400">S/ {campaign.data.costoRes.toFixed(3)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}