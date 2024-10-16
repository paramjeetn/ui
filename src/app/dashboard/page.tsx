// 'use client'

// import { useState, useEffect } from 'react'
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { Card } from "@/components/ui/card"
// import { Search, Activity, User } from 'lucide-react'

// interface ApiData {
//   patient: { [key: string]: string };
//   guideline: { [key: string]: string };
// }

// export default function DashboardPage() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [apiData, setApiData] = useState<ApiData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState<'patients' | 'guidelines'>('patients')
//   const [filteredOptions, setFilteredOptions] = useState<string[]>([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/v1');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setApiData(data);
//         setFilteredOptions(Object.values(data.patient));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (apiData) {
//       const options = Object.values(apiData[activeTab === 'patients' ? 'patient' : 'guideline']);
//       setFilteredOptions(options.filter(option => 
//         option.toLowerCase().includes(searchQuery.toLowerCase())
//       ));
//     }
//   }, [searchQuery, activeTab, apiData]);

//   const handleTabChange = (value: string) => {
//     setActiveTab(value as 'patients' | 'guidelines');
//     setSearchQuery('');
//     if (apiData) {
//       setFilteredOptions(Object.values(apiData[value === 'patients' ? 'patient' : 'guideline']));
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 space-y-6">
//       <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
//         <Card className="p-1">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="patients" className="flex items-center justify-center">
//               <Activity className="w-4 h-4 mr-2" />
//               Patients
//             </TabsTrigger>
//             <TabsTrigger value="guidelines" className="flex items-center justify-center">
//               <User className="w-4 h-4 mr-2" />
//               Guidelines
//             </TabsTrigger>
//           </TabsList>
//         </Card>

//         <Card className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <Input
//               type="search"
//               placeholder={`Search ${activeTab}...`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 w-full"
//             />
//           </div>
//           {filteredOptions.length > 0 && (
//             <div className="mt-2 max-h-60 overflow-auto border border-gray-200 rounded-md">
//               {filteredOptions.map((option, index) => (
//                 <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
//                   {option}
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>

//         <TabsContent value="patients">
//           <Card className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Patients</h2>
//             <p>Select a patient from the search bar above to view details.</p>
//           </Card>
//         </TabsContent>

//         <TabsContent value="guidelines">
//           <Card className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Guidelines</h2>
//             <p>Select a guideline from the search bar above to view details.</p>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Activity, User, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import LeftPane from '@/components/LeftPane'
import RightPane from '@/components/RightPane'

interface ApiData {
  patient: { [key: string]: string };
  guideline: { [key: string]: string };
}

interface PatientData {
  patient_id: string;
  patient_name: string;
  age: string;
  gender: string;
  current_symptoms: string;
  current_medications: string;
  patient_risk_factors: string;
  lab_reports: string;
  diagnostic_tests_and_results: string;
  profile_summary: string;
}

interface GuidelineData {
  guideline_key: number;
  guideline_id: string;
  guideline_data: {
    guideline_text: string;
    guideline_medical_condition: string;
    guideline_criteria: string;
    guideline_pdf: string;
    guideline_text_verified: boolean;
    guideline_medical_condition_verified: boolean;
    guideline_criteria_verified: boolean;
    guideline_text_lgtm: boolean;
    guideline_medical_condition_lgtm: boolean;
    guideline_criteria_lgtm: boolean;
  };
  updated_by: string | null;
  timestamp: string;
}


// ... (keep other interfaces as they are)

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [apiData, setApiData] = useState<ApiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'patient' | 'guideline'>('patient')
  const [selectedPatientData, setSelectedPatientData] = useState<PatientData | null>(null)
  const [selectedGuidelineData, setSelectedGuidelineData] = useState<GuidelineData | null>(null)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('/api/v1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Add this line for debugging
        setApiData(data);

        // Fetch initial patient and guideline data
        if (data.patient && Object.keys(data.patient).length > 0) {
          const firstPatientId = Object.keys(data.patient)[0];
          await handleItemClick('patient', firstPatientId);
        }
        if (data.guideline && Object.keys(data.guideline).length > 0) {
          const firstGuidelineId = Object.keys(data.guideline)[0];
          await handleItemClick('guideline', firstGuidelineId);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleItemClick = async (tab: 'patient' | 'guideline', id: string) => {
    try {
      const response = await fetch(`/api/${tab}s/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (tab === 'patient') {
        setSelectedPatientData(data);
      } else {
        setSelectedGuidelineData(data);
      }
    } catch (error) {
      console.error(`Error fetching ${tab} details:`, error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredItems = apiData && apiData[activeTab]
    ? Object.entries(apiData[activeTab]).filter(([_, name]) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white border-r">
        <Tabs defaultValue="patient" value={activeTab} onValueChange={(value) => setActiveTab(value as 'patient' | 'guideline')} className="space-y-4">
          <Card className="p-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient" className="flex items-center justify-center">
                <Activity className="w-4 h-4 mr-2" />
                Patients
              </TabsTrigger>
              <TabsTrigger value="guideline" className="flex items-center justify-center">
                <User className="w-4 h-4 mr-2" />
                Guidelines
              </TabsTrigger>
            </TabsList>
          </Card>

          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder={`Search ${activeTab}s...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </Card>

          <Card className="p-4 max-h-[calc(100vh-250px)] overflow-y-auto">
            {filteredItems.length > 0 ? (
              <ul className="space-y-2">
                {filteredItems.map(([id, name]) => (
                  <li
                    key={id}
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                    onClick={() => handleItemClick(activeTab, id)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No {activeTab}s found</p>
            )}
          </Card>
        </Tabs>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {activeTab === 'patient' && selectedPatientData && (
          <>
            <LeftPane patient={selectedPatientData} />
            <RightPane patient={selectedPatientData} />
          </>
        )}
        {activeTab === 'guideline' && selectedGuidelineData && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedGuidelineData.guideline_data.guideline_medical_condition}</h2>
            <p className="mb-4">{selectedGuidelineData.guideline_data.guideline_text}</p>
            <h3 className="text-xl font-bold mb-2">Criteria</h3>
            <p>{selectedGuidelineData.guideline_data.guideline_criteria}</p>
            <a href={selectedGuidelineData.guideline_data.guideline_pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 block">
              View PDF
            </a>
          </div>
        )}
      </div>
    </div>
  )
}