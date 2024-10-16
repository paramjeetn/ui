import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar, Activity, AlertTriangle, Pill } from 'lucide-react'

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

interface LeftPaneProps {
  patient: PatientData;
}

export default function LeftPane({ patient }: LeftPaneProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {patient.patient_name} (manage)
        </CardTitle>
        <div className="flex space-x-1">
          {/* Add your action buttons here */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Patient Name</p>
              <p className="font-medium">{patient.patient_name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="font-medium">{patient.age}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <p className="font-medium text-sm">Current Symptoms</p>
          </div>
          <ul className="list-disc list-inside text-sm">
            {patient.current_symptoms.split(',').map((symptom, index) => (
              <li key={index}>{symptom.trim()}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Pill className="h-4 w-4 text-red-500" />
            <p className="font-medium text-sm">Current Medications</p>
          </div>
          <ul className="list-disc list-inside text-sm">
            {patient.current_medications.split(',').map((medication, index) => (
              <li key={index}>{medication.trim()}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <p className="font-medium text-sm">Patient Risk Factors</p>
          </div>
          <ul className="list-disc list-inside text-sm">
            {patient.patient_risk_factors.split(',').map((factor, index) => (
              <li key={index}>{factor.trim()}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-medium text-sm mb-2">Profile Summary</p>
          <p className="text-sm">{patient.profile_summary}</p>
        </div>
      </CardContent>
    </Card>
  )
}