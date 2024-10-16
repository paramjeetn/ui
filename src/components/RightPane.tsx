import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, FileText } from 'lucide-react'

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

interface RightPaneProps {
  patient: PatientData;
}

export default function RightPane({ patient }: RightPaneProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Lab Reports
          </CardTitle>
          <Droplet className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm">
            {patient.lab_reports.split(',').map((report, index) => (
              <li key={index}>{report.trim()}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Diagnostic Tests and Results
          </CardTitle>
          <FileText className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm">
            {patient.diagnostic_tests_and_results.split(',').map((test, index) => (
              <li key={index}>{test.trim()}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}