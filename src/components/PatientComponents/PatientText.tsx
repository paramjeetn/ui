// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
// import { Button } from "@/components/ui/button";
// import { Pencil, X, Check } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";

// interface PatientTextProps {
//   text: string;
//   verified: boolean;
//   lgtm: boolean;
//   onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
//   onReset: () => void;
//   onTextChange: (newText: string) => void;
// }

// const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(text);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedText(text);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     onTextChange(editedText);
//   };

//   const handleThumbsUp = () => {
//     onUpdate(true, true);
//   };

//   const handleThumbsDown = () => {
//     onUpdate(true, false);
//   };

//   return (
//     <Card className="mb-4">
//       <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
//   <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
//   <div className="flex items-center space-x-2 flex-grow mr-2 ml-2"> {/* Added flex-grow here */}
//           <StatusIndicator
//             verified={verified}
//             lgtm={lgtm}
//             onThumbsUp={handleThumbsUp}
//             onThumbsDown={handleThumbsDown}
//             onReset={onReset}
//           />
//           {!isEditing && (
//             <Button variant="ghost" size="sm" onClick={handleEdit}>
//               <Pencil size={16} />
//             </Button>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//           {isEditing ? (
//             <>
//               <Textarea
//                 value={editedText}
//                 onChange={(e) => setEditedText(e.target.value)}
//                 className="min-h-[calc(100vh-250px)]"
//               />
//               <div className="mt-4 flex justify-end space-x-2">
//                 <Button variant="outline" size="sm" onClick={handleCancel}>
//                   <X size={16} className="mr-2" /> Cancel
//                 </Button>
//                 <Button variant="default" size="sm" onClick={handleSave}>
//                   <Check size={16} className="mr-2" /> Save
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <p className="text-sm">{text}</p>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default PatientText;

// ======================================= 1 ===================================================

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
// import { Button } from "@/components/ui/button";
// import { Pencil, X, Check } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";

// interface PatientTextProps {
//   text: string;
//   verified: boolean;
//   lgtm: boolean;
//   onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
//   onReset: () => void;
//   onTextChange: (newText: string) => void;
// }

// interface PatientData {
//   patient_text: string;
//   medical_condition: string;
//   final_recommendation: string;
//   retrieved_docs: string;
//   patient_text_verified: boolean;
//   medical_condition_verified: boolean;
//   final_recommendation_verified: boolean;
//   retrieved_docs_verified: boolean;
//   patient_text_lgtm: boolean;
//   medical_condition_lgtm: boolean;
//   final_recommendation_lgtm: boolean;
//   retrieved_docs_lgtm: boolean;
// }

// const initialPatientData: PatientData = {
//   patient_text: "",
//   medical_condition: "",
//   final_recommendation: "",
//   retrieved_docs: "",
//   patient_text_verified: false,
//   medical_condition_verified: false,
//   final_recommendation_verified: false,
//   retrieved_docs_verified: false,
//   patient_text_lgtm: false,
//   medical_condition_lgtm: false,
//   final_recommendation_lgtm: false,
//   retrieved_docs_lgtm: false,
// };

// const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [initialText, setInitialText] = useState(text);
//   const [jsonData, setJsonData] = useState<PatientData>(initialPatientData);

//   useEffect(() => {
//     setInitialText(text);
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData({ ...initialPatientData, ...parsedData });
//     } catch (error) {
//       console.error("Error parsing initial JSON:", error);
//       setJsonData(initialPatientData);
//     }
//   }, [text]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     try {
//       const parsedData = JSON.parse(initialText);
//       setJsonData({ ...initialPatientData, ...parsedData });
//     } catch (error) {
//       console.error("Error parsing JSON on cancel:", error);
//       setJsonData(initialPatientData);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     const updatedText = JSON.stringify(jsonData, null, 2);
//     onTextChange(updatedText);
//   };

//   const handleFieldChange = (field: keyof PatientData, value: any) => {
//     setJsonData(prevData => ({
//       ...prevData,
//       [field]: value
//     }));
//   };

//   const handleThumbsUp = () => {
//     onUpdate(true, true);
//   };

//   const handleThumbsDown = () => {
//     onUpdate(true, false);
//   };

//   return (
//     <Card className="mb-4">
//       <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
//   <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
//   <div className="flex items-center space-x-2 flex-grow mr-2 ml-2"> {/* Added flex-grow here */}
//           <StatusIndicator
//             verified={verified}
//             lgtm={lgtm}
//             onThumbsUp={handleThumbsUp}
//             onThumbsDown={handleThumbsDown}
//             onReset={onReset}
//           />
//           {!isEditing && (
//             <Button variant="ghost" size="sm" onClick={handleEdit}>
//               <Pencil size={16} />
//             </Button>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//         {isEditing ? (
//   <>
//     <Textarea
//       value={JSON.stringify(jsonData, null, 2)}
//       onChange={(e) => {
//         try {
//           const newData = JSON.parse(e.target.value);
//           setJsonData(prevData => ({ ...prevData, ...newData }));
//         } catch (error) {
//           console.error("Invalid JSON:", error);
//         }
//       }}
//       className="min-h-[calc(100vh-250px)]"
//     />
//     <div className="mt-4 flex justify-end space-x-2">
//       <Button variant="outline" size="sm" onClick={handleCancel}>
//         <X size={16} className="mr-2" /> Cancel
//       </Button>
//       <Button variant="default" size="sm" onClick={handleSave}>
//         <Check size={16} className="mr-2" /> Save
//       </Button>
//     </div>
//   </>
// ) : (
//   <div>
//     {Object.entries(jsonData).map(([key, value]) => {
//       // Only display non-empty string fields or non-false boolean fields
//       if ((typeof value === 'string' && value !== '') || (typeof value === 'boolean' && value === true)) {
//         return (
//           <div key={key} className="mb-4">
//             <h3 className="font-semibold">{key}</h3>
//             <p>{typeof value === 'boolean' ? value.toString() : value}</p>
//           </div>
//         );
//       }
//       return null;
//     })}
//   </div>
// )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default PatientText;

// ======================================= 2 ===================================================

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
// import { Button } from "@/components/ui/button";
// import { Pencil, X, Check } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";

// interface PatientTextProps {
//   text: string;
//   verified: boolean;
//   lgtm: boolean;
//   onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
//   onReset: () => void;
//   onTextChange: (newText: string) => void;
// }

// interface PatientData {
//   patient_text: string;
//   medical_condition: string;
//   final_recommendation: string;
//   retrieved_docs: string;
//   patient_text_verified: boolean;
//   medical_condition_verified: boolean;
//   final_recommendation_verified: boolean;
//   retrieved_docs_verified: boolean;
//   patient_text_lgtm: boolean;
//   medical_condition_lgtm: boolean;
//   final_recommendation_lgtm: boolean;
//   retrieved_docs_lgtm: boolean;
//   [key: string]: any; // To allow for additional fields
// }

// type PatientDataKey = keyof PatientData;

// const initialPatientData: PatientData = {
//   patient_text: "",
//   medical_condition: "",
//   final_recommendation: "",
//   retrieved_docs: "",
//   patient_text_verified: false,
//   medical_condition_verified: false,
//   final_recommendation_verified: false,
//   retrieved_docs_verified: false,
//   patient_text_lgtm: false,
//   medical_condition_lgtm: false,
//   final_recommendation_lgtm: false,
//   retrieved_docs_lgtm: false,
// };

// const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [initialText, setInitialText] = useState(text);
//   const [jsonData, setJsonData] = useState<PatientData>(initialPatientData);
//   const [editingField, setEditingField] = useState<PatientDataKey | null>(null);

//   useEffect(() => {
//     setInitialText(text);
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData({ ...initialPatientData, ...parsedData });
//     } catch (error) {
//       console.error("Error parsing initial JSON:", error);
//       setJsonData(initialPatientData);
//     }
//   }, [text]);

//   const parseKeyValueString = (str: string): Record<string, string> => {
//     return str.split(', ').reduce((acc, pair) => {
//       const [key, value] = pair.split(': ');
//       acc[key.trim()] = value.trim();
//       return acc;
//     }, {} as Record<string, string>);
//   };

//   const stringifyKeyValuePairs = (obj: Record<string, string>): string => {
//     return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');
//   };

//   const parseArrayLikeString = (str: string): string[] => {
//     return str.split(',').map(item => item.trim());
//   };

//   const stringifyArray = (arr: string[]): string => {
//     return arr.join(', ');
//   };

//   const renderField = (key: PatientDataKey, value: any) => {
//     if (key === 'lab_reports' || key === 'diagnostic_tests_and_results') {
//       const parsedValue = parseKeyValueString(value as string);
//       return (
//         <div>
//           {Object.entries(parsedValue).map(([subKey, subValue]) => (
//             <p key={subKey}><strong>{subKey}:</strong> {subValue}</p>
//           ))}
//         </div>
//       );
//     } else if (['current_symptoms', 'current_medications', 'patient_risk_factors'].includes(key as string)) {
//       const arrayValue = Array.isArray(value) ? value : parseArrayLikeString(value as string);
//       return (
//         <ul className="list-disc list-inside">
//           {arrayValue.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       );
//     } else {
//       return <p>{typeof value === 'boolean' ? value.toString() : value}</p>;
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditingField(null);
//     try {
//       const parsedData = JSON.parse(initialText);
//       setJsonData({ ...initialPatientData, ...parsedData });
//     } catch (error) {
//       console.error("Error parsing JSON on cancel:", error);
//       setJsonData(initialPatientData);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     setEditingField(null);
//     const updatedText = JSON.stringify(jsonData, null, 2);
//     onTextChange(updatedText);
//   };

//   const handleFieldChange = (field: PatientDataKey, value: any) => {
//     setJsonData(prevData => {
//       let processedValue = value;
//       if (['lab_reports', 'diagnostic_tests_and_results'].includes(field as string)) {
//         processedValue = stringifyKeyValuePairs(parseKeyValueString(value));
//       } else if (['current_symptoms', 'current_medications', 'patient_risk_factors'].includes(field as string)) {
//         processedValue = stringifyArray(parseArrayLikeString(value));
//       }
//       return {
//         ...prevData,
//         [field]: processedValue
//       };
//     });
//   };

//   const renderEditableField = (key: PatientDataKey, value: any) => {
//     if (editingField === key) {
//       return (
//         <div className="flex items-center space-x-2">
//           <Input
//             value={value}
//             onChange={(e) => handleFieldChange(key, e.target.value)}
//             className="flex-grow"
//           />
//           <Button size="sm" onClick={() => setEditingField(null)}>
//             <Check size={16} />
//           </Button>
//         </div>
//       );
//     }
//     return (
//       <div className="flex items-center justify-between">
//         {renderField(key, value)}
//         <Button variant="ghost" size="sm" onClick={() => setEditingField(key)}>
//           <Pencil size={16} />
//         </Button>
//       </div>
//     );
//   };

//   const handleThumbsUp = () => {
//     onUpdate(true, true);
//   };

//   const handleThumbsDown = () => {
//     onUpdate(true, false);
//   };

//   return (
//     <Card className="mb-4">
//       <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
//         <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
//         <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
//           <StatusIndicator
//             verified={verified}
//             lgtm={lgtm}
//             onThumbsUp={handleThumbsUp}
//             onThumbsDown={handleThumbsDown}
//             onReset={onReset}
//           />
//           {!isEditing && (
//             <Button variant="ghost" size="sm" onClick={handleEdit}>
//               <Pencil size={16} />
//             </Button>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//           {isEditing ? (
//             <>
//               <Textarea
//                 value={JSON.stringify(jsonData, null, 2)}
//                 onChange={(e) => {
//                   try {
//                     const newData = JSON.parse(e.target.value);
//                     setJsonData(prevData => ({ ...prevData, ...newData }));
//                   } catch (error) {
//                     console.error("Invalid JSON:", error);
//                   }
//                 }}
//                 className="min-h-[calc(100vh-250px)]"
//               />
//               <div className="mt-4 flex justify-end space-x-2">
//                 <Button variant="outline" size="sm" onClick={handleCancel}>
//                   <X size={16} className="mr-2" /> Cancel
//                 </Button>
//                 <Button variant="default" size="sm" onClick={handleSave}>
//                   <Check size={16} className="mr-2" /> Save
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <div>
//               {(Object.keys(jsonData) as Array<keyof PatientData>).map((key) => {
//                 const value = jsonData[key];
//                 if ((typeof value === 'string' && value !== '') || (typeof value === 'boolean' && value === true) || (Array.isArray(value) && value.length > 0)) {
//                   return (
//                     <div key={key} className="mb-4">
//                       <h3 className="font-semibold">{key}</h3>
//                       {renderEditableField(key, value)}
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default PatientText;

// ======================================= 3 ===================================================

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
// import { Button } from "@/components/ui/button";
// import { Pencil, X, Check } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";

// interface PatientTextProps {
//   text: string;
//   verified: boolean;
//   lgtm: boolean;
//   onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
//   onReset: () => void;
//   onTextChange: (newText: string) => void;
// }

// interface PatientData {
//   patient_text: string;
//   medical_condition: string;
//   final_recommendation: string;
//   retrieved_docs: string;
//   patient_text_verified: boolean;
//   medical_condition_verified: boolean;
//   final_recommendation_verified: boolean;
//   retrieved_docs_verified: boolean;
//   patient_text_lgtm: boolean;
//   medical_condition_lgtm: boolean;
//   final_recommendation_lgtm: boolean;
//   retrieved_docs_lgtm: boolean;
//   [key: string]: any;
// }

// const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [jsonData, setJsonData] = useState<PatientData>({} as PatientData);

//   useEffect(() => {
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing initial JSON:", error);
//       setJsonData({} as PatientData);
//     }
//   }, [text]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing JSON on cancel:", error);
//       setJsonData({} as PatientData);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     const updatedText = JSON.stringify(jsonData, null, 2);
//     onTextChange(updatedText);
//   };

//   const handleThumbsUp = () => {
//     onUpdate(true, true);
//   };

//   const handleThumbsDown = () => {
//     onUpdate(true, false);
//   };

//   const renderField = (key: string, value: any) => {
//     if (['current_symptoms', 'current_medications', 'patient_risk_factors'].includes(key)) {
//       const items = value.split(',').map((item: string) => item.trim());
//       return (
//         <ul className="list-disc list-inside">
//           {items.map((item: string, index: number) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       );
//     } else if (typeof value === 'boolean') {
//       return <p>{value.toString()}</p>;
//     } else {
//       return <p>{value}</p>;
//     }
//   };

//   return (
//     <Card className="mb-4">
//       <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
//         <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
//         <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
//           <StatusIndicator
//             verified={verified}
//             lgtm={lgtm}
//             onThumbsUp={handleThumbsUp}
//             onThumbsDown={handleThumbsDown}
//             onReset={onReset}
//           />
//           {!isEditing && (
//             <Button variant="ghost" size="sm" onClick={handleEdit}>
//               <Pencil size={16} />
//             </Button>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//           {isEditing ? (
//             <>
//               <Textarea
//                 value={JSON.stringify(jsonData, null, 2)}
//                 onChange={(e) => {
//                   try {
//                     const newData = JSON.parse(e.target.value);
//                     setJsonData(newData);
//                   } catch (error) {
//                     console.error("Invalid JSON:", error);
//                   }
//                 }}
//                 className="min-h-[calc(100vh-250px)]"
//               />
//               <div className="mt-4 flex justify-end space-x-2">
//                 <Button variant="outline" size="sm" onClick={handleCancel}>
//                   <X size={16} className="mr-2" /> Cancel
//                 </Button>
//                 <Button variant="default" size="sm" onClick={handleSave}>
//                   <Check size={16} className="mr-2" /> Save
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <div>
//               {Object.entries(jsonData).map(([key, value]) => {
//                 if (value !== '' && value !== false) {
//                   return (
//                     <div key={key} className="mb-4">
//                       <h3 className="font-semibold">{key}</h3>
//                       {renderField(key, value)}
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default PatientText;

// ======================================= 3 ===================================================

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
// import { Button } from "@/components/ui/button";
// import { Pencil, X, Check } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";

// interface PatientTextProps {
//   text: string;
//   verified: boolean;
//   lgtm: boolean;
//   onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
//   onReset: () => void;
//   onTextChange: (newText: string) => void;
// }

// interface PatientData {
//   patient_text: string;
//   medical_condition: string;
//   final_recommendation: string;
//   retrieved_docs: string;
//   patient_text_verified: boolean;
//   medical_condition_verified: boolean;
//   final_recommendation_verified: boolean;
//   retrieved_docs_verified: boolean;
//   patient_text_lgtm: boolean;
//   medical_condition_lgtm: boolean;
//   final_recommendation_lgtm: boolean;
//   retrieved_docs_lgtm: boolean;
//   lab_reports: string;
//   diagnostic_tests_and_results: string;
//   [key: string]: any;
// }

// interface KeyValuePair {
//   key: string;
//   value: string;
// }

// const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [jsonData, setJsonData] = useState<PatientData>({} as PatientData);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [localEdits, setLocalEdits] = useState<{[key: string]: KeyValuePair[]}>({});

//   useEffect(() => {
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing initial JSON:", error);
//       setJsonData({} as PatientData);
//     }
//   }, [text]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditingField(null);
//     setLocalEdits({});
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing JSON on cancel:", error);
//       setJsonData({} as PatientData);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     setEditingField(null);
//     const updatedText = JSON.stringify(jsonData, null, 2);
//     onTextChange(updatedText);
//   };

//   const handleThumbsUp = () => {
//     onUpdate(true, true);
//   };

//   const handleThumbsDown = () => {
//     onUpdate(true, false);
//   };

//   const parseKeyValueString = (str: string): KeyValuePair[] => {
//     return str.split(', ').map(pair => {
//       const [key, value] = pair.split(': ');
//       return { key, value };
//     });
//   };

//   const stringifyKeyValuePairs = (pairs: KeyValuePair[]): string => {
//     return pairs.map(pair => `${pair.key}: ${pair.value}`).join(', ');
//   };

//   const handleLabReportChange = (index: number, newValue: string, field: 'lab_reports' | 'diagnostic_tests_and_results') => {
//     setLocalEdits(prev => {
//       const currentEdits = prev[field] || parseKeyValueString(jsonData[field]);
//       const updatedEdits = [...currentEdits];
//       updatedEdits[index] = { ...updatedEdits[index], value: newValue };
//       return { ...prev, [field]: updatedEdits };
//     });
//   };

//   const handleLocalSave = (field: 'lab_reports' | 'diagnostic_tests_and_results') => {
//     if (localEdits[field]) {
//       setJsonData(prev => ({
//         ...prev,
//         [field]: stringifyKeyValuePairs(localEdits[field] || [])
//       }));
//       setLocalEdits(prev => {
//         const { [field]: _, ...rest } = prev;
//         return rest;
//       });
//     }
//     setEditingField(null);
//   };

//   const renderField = (key: string, value: any) => {
//     if (['current_symptoms', 'current_medications', 'patient_risk_factors'].includes(key)) {
//       const items = value.split(',').map((item: string) => item.trim());
//       return (
//         <ul className="list-disc list-inside">
//           {items.map((item: string, index: number) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       );
//     } else if (['lab_reports', 'diagnostic_tests_and_results'].includes(key)) {
//       const pairs = localEdits[key] || parseKeyValueString(value);
//       return (
//         <div>
//           {pairs.map((pair, index) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <span className="font-medium">{pair.key}:</span>
//               {editingField === key ? (
//                 <Input
//                   value={pair.value}
//                   onChange={(e) => handleLabReportChange(index, e.target.value, key as 'lab_reports' | 'diagnostic_tests_and_results')}
//                   className="flex-grow"
//                 />
//               ) : (
//                 <span>{pair.value}</span>
//               )}
//             </div>
//           ))}
//           {editingField === key ? (
//             <Button size="sm" onClick={() => handleLocalSave(key as 'lab_reports' | 'diagnostic_tests_and_results')}>
//               <Check size={16} className="mr-2" /> Save
//             </Button>
//           ) : (
//             <Button variant="ghost" size="sm" onClick={() => setEditingField(key)}>
//               <Pencil size={16} className="mr-2" /> Edit Values
//             </Button>
//           )}
//         </div>
//       );
//     } else if (typeof value === 'boolean') {
//       return <p>{value.toString()}</p>;
//     } else {
//       return <p>{value}</p>;
//     }
//   };

//   return (
//     <Card className="mb-4">
//       <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
//         <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
//         <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
//           <StatusIndicator
//             verified={verified}
//             lgtm={lgtm}
//             onThumbsUp={handleThumbsUp}
//             onThumbsDown={handleThumbsDown}
//             onReset={onReset}
//           />
//           {!isEditing && (
//             <Button variant="ghost" size="sm" onClick={handleEdit}>
//               <Pencil size={16} />
//             </Button>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//           {isEditing ? (
//             <>
//               <Textarea
//                 value={JSON.stringify(jsonData, null, 2)}
//                 onChange={(e) => {
//                   try {
//                     const newData = JSON.parse(e.target.value);
//                     setJsonData(newData);
//                   } catch (error) {
//                     console.error("Invalid JSON:", error);
//                   }
//                 }}
//                 className="min-h-[calc(100vh-250px)]"
//               />
//               <div className="mt-4 flex justify-end space-x-2">
//                 <Button variant="outline" size="sm" onClick={handleCancel}>
//                   <X size={16} className="mr-2" /> Cancel
//                 </Button>
//                 <Button variant="default" size="sm" onClick={handleSave}>
//                   <Check size={16} className="mr-2" /> Save
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <div>
//               {Object.entries(jsonData).map(([key, value]) => {
//                 if (value !== '' && value !== false) {
//                   return (
//                     <div key={key} className="mb-4">
//                       <h3 className="font-semibold">{key}</h3>
//                       {renderField(key, value)}
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default PatientText;

// ======================================= 4 ===================================================

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
// import { Button } from "@/components/ui/button";
// import { Pencil, X, Check } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";

// interface PatientTextProps {
//   text: string;
//   verified: boolean;
//   lgtm: boolean;
//   onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
//   onReset: () => void;
//   onTextChange: (newText: string) => void;
// }

// interface PatientData {
//   patient_text: string;
//   medical_condition: string;
//   final_recommendation: string;
//   retrieved_docs: string;
//   patient_text_verified: boolean;
//   medical_condition_verified: boolean;
//   final_recommendation_verified: boolean;
//   retrieved_docs_verified: boolean;
//   patient_text_lgtm: boolean;
//   medical_condition_lgtm: boolean;
//   final_recommendation_lgtm: boolean;
//   retrieved_docs_lgtm: boolean;
//   lab_reports: string;
//   diagnostic_tests_and_results: string;
//   [key: string]: any;
// }

// const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [jsonData, setJsonData] = useState<PatientData>({} as PatientData);

//   useEffect(() => {
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing initial JSON:", error);
//       setJsonData({} as PatientData);
//     }
//   }, [text]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing JSON on cancel:", error);
//       setJsonData({} as PatientData);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     const updatedText = JSON.stringify(jsonData, null, 2);
//     onTextChange(updatedText);
//   };

//   const handleThumbsUp = () => {
//     onUpdate(true, true);
//   };

//   const handleThumbsDown = () => {
//     onUpdate(true, false);
//   };

//   const handleFieldChange = (key: string, value: any) => {
//     setJsonData(prev => ({ ...prev, [key]: value }));
//   };

//   const renderEditableField = (key: string, value: any) => {
//     if (['current_symptoms', 'current_medications', 'patient_risk_factors', 'lab_reports', 'diagnostic_tests_and_results'].includes(key)) {
//       return (
//         <Textarea
//           value={value}
//           onChange={(e) => handleFieldChange(key, e.target.value)}
//           className="w-full"
//         />
//       );
//     } else if (typeof value === 'boolean') {
//       return (
//         <Input
//           type="checkbox"
//           checked={value}
//           onChange={(e) => handleFieldChange(key, e.target.checked)}
//         />
//       );
//     } else {
//       return (
//         <Input
//           value={value}
//           onChange={(e) => handleFieldChange(key, e.target.value)}
//           className="w-full"
//         />
//       );
//     }
//   };

//   const renderField = (key: string, value: any) => {
//     if (['current_symptoms', 'current_medications', 'patient_risk_factors'].includes(key)) {
//       const items = value.split(',').map((item: string) => item.trim());
//       return (
//         <ul className="list-disc list-inside">
//           {items.map((item: string, index: number) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       );
//     } else if (['lab_reports', 'diagnostic_tests_and_results'].includes(key)) {
//       const pairs = value.split(', ').map((pair: string) => {
//         const [key, value] = pair.split(': ');
//         return { key, value };
//       });
//       return (
//         <div>
//           {pairs.map((pair: { key: string; value: string }, index: number) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <span className="font-medium">{pair.key}:</span>
//               <span>{pair.value}</span>
//             </div>
//           ))}
//         </div>
//       );
//     } else if (typeof value === 'boolean') {
//       return <p>{value.toString()}</p>;
//     } else {
//       return <p>{value}</p>;
//     }
//   };

//   return (
//     <Card className="mb-4">
//       <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
//         <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
//         <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
//           <StatusIndicator
//             verified={verified}
//             lgtm={lgtm}
//             onThumbsUp={handleThumbsUp}
//             onThumbsDown={handleThumbsDown}
//             onReset={onReset}
//           />
//           {!isEditing && (
//             <Button variant="ghost" size="sm" onClick={handleEdit}>
//               <Pencil size={16} />
//             </Button>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//           <div>
//             {Object.entries(jsonData).map(([key, value]) => {
//               if (value !== '' && value !== false) {
//                 return (
//                   <div key={key} className="mb-4">
//                     <h3 className="font-semibold">{key}</h3>
//                     {isEditing ? renderEditableField(key, value) : renderField(key, value)}
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>
//           {isEditing && (
//             <div className="mt-4 flex justify-end space-x-2">
//               <Button variant="outline" size="sm" onClick={handleCancel}>
//                 <X size={16} className="mr-2" /> Cancel
//               </Button>
//               <Button variant="default" size="sm" onClick={handleSave}>
//                 <Check size={16} className="mr-2" /> Save
//               </Button>
//             </div>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default PatientText;

// ======================================= 5 ===================================================

// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
// import { Button } from "@/components/ui/button";
// import { Pencil, X, Check } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";

// interface PatientTextProps {
//   text: string;
//   verified: boolean;
//   lgtm: boolean;
//   onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
//   onReset: () => void;
//   onTextChange: (newText: string) => void;
// }

// interface PatientData {
//   patient_text: string;
//   medical_condition: string;
//   final_recommendation: string;
//   retrieved_docs: string;
//   patient_text_verified: boolean;
//   medical_condition_verified: boolean;
//   final_recommendation_verified: boolean;
//   retrieved_docs_verified: boolean;
//   patient_text_lgtm: boolean;
//   medical_condition_lgtm: boolean;
//   final_recommendation_lgtm: boolean;
//   retrieved_docs_lgtm: boolean;
//   lab_reports: string;
//   diagnostic_tests_and_results: string;
//   [key: string]: any;
// }

// interface KeyValuePair {
//   key: string;
//   value: string;
// }

// const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [jsonData, setJsonData] = useState<PatientData>({} as PatientData);

//   useEffect(() => {
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing initial JSON:", error);
//       setJsonData({} as PatientData);
//     }
//   }, [text]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     try {
//       const parsedData = JSON.parse(text);
//       setJsonData(parsedData);
//     } catch (error) {
//       console.error("Error parsing JSON on cancel:", error);
//       setJsonData({} as PatientData);
//     }
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     const updatedText = JSON.stringify(jsonData, null, 2);
//     onTextChange(updatedText);
//   };

//   const handleThumbsUp = () => {
//     onUpdate(true, true);
//   };

//   const handleThumbsDown = () => {
//     onUpdate(true, false);
//   };

//   const handleFieldChange = (key: string, value: any) => {
//     setJsonData(prev => ({ ...prev, [key]: value }));
//   };

//   const handleKeyValueChange = (field: string, key: string, value: string) => {
//     setJsonData(prev => {
//       const pairs = prev[field].split(', ').map((pair: string) => {
//         const [pairKey, pairValue] = pair.split(': ');
//         if (pairKey === key) {
//           return `${key}: ${value}`;
//         }
//         return pair;
//       });
//       return { ...prev, [field]: pairs.join(', ') };
//     });
//   };

//   const renderEditableField = (key: string, value: any) => {
//     if (['current_symptoms', 'current_medications', 'patient_risk_factors'].includes(key)) {
//       return (
//         <Textarea
//           value={value}
//           onChange={(e) => handleFieldChange(key, e.target.value)}
//           className="w-full"
//         />
//       );
//     } else if (['lab_reports', 'diagnostic_tests_and_results'].includes(key)) {
//       const pairs: KeyValuePair[] = value.split(', ').map((pair: string) => {
//         const [pairKey, pairValue] = pair.split(': ');
//         return { key: pairKey, value: pairValue };
//       });
//       return (
//         <div>
//           {pairs.map((pair: KeyValuePair, index: number) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <span className="font-medium">{pair.key}:</span>
//               <Input
//                 value={pair.value}
//                 onChange={(e) => handleKeyValueChange(key, pair.key, e.target.value)}
//                 className="flex-grow"
//               />
//             </div>
//           ))}
//         </div>
//       );
//     } else if (typeof value === 'boolean') {
//       return (
//         <Input
//           type="checkbox"
//           checked={value}
//           onChange={(e) => handleFieldChange(key, e.target.checked)}
//         />
//       );
//     } else {
//       return (
//         <Input
//           value={value}
//           onChange={(e) => handleFieldChange(key, e.target.value)}
//           className="w-full"
//         />
//       );
//     }
//   };

//   const renderField = (key: string, value: any) => {
//     if (['current_symptoms', 'current_medications', 'patient_risk_factors'].includes(key)) {
//       const items = value.split(',').map((item: string) => item.trim());
//       return (
//         <ul className="list-disc list-inside">
//           {items.map((item: string, index: number) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       );
//     } else if (['lab_reports', 'diagnostic_tests_and_results'].includes(key)) {
//       const pairs: KeyValuePair[] = value.split(', ').map((pair: string) => {
//         const [pairKey, pairValue] = pair.split(': ');
//         return { key: pairKey, value: pairValue };
//       });
//       return (
//         <div>
//           {pairs.map((pair: KeyValuePair, index: number) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <span className="font-medium">{pair.key}:</span>
//               <span>{pair.value}</span>
//             </div>
//           ))}
//         </div>
//       );
//     } else if (typeof value === 'boolean') {
//       return <p>{value.toString()}</p>;
//     } else {
//       return <p>{value}</p>;
//     }
//   };

//   return (
//     <Card className="mb-4">
//       <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
//         <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
//         <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
//           <StatusIndicator
//             verified={verified}
//             lgtm={lgtm}
//             onThumbsUp={handleThumbsUp}
//             onThumbsDown={handleThumbsDown}
//             onReset={onReset}
//           />
//           {!isEditing && (
//             <Button variant="ghost" size="sm" onClick={handleEdit}>
//               <Pencil size={16} />
//             </Button>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-[calc(100vh-200px)] pr-4">
//           <div>
//             {Object.entries(jsonData).map(([key, value]) => {
//               if (value !== '' && value !== false) {
//                 return (
//                   <div key={key} className="mb-4">
//                     <h3 className="font-semibold">{key}</h3>
//                     {isEditing ? renderEditableField(key, value) : renderField(key, value)}
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>
//           {isEditing && (
//             <div className="mt-4 flex justify-end space-x-2">
//               <Button variant="outline" size="sm" onClick={handleCancel}>
//                 <X size={16} className="mr-2" /> Cancel
//               </Button>
//               <Button variant="default" size="sm" onClick={handleSave}>
//                 <Check size={16} className="mr-2" /> Save
//               </Button>
//             </div>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default PatientText;

// ======================================= 6 ===================================================
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from '@/components/PatientComponents/StatusIndicator'; 
import { Button } from "@/components/ui/button";
import { Pencil, X, Check, User, Calendar, Activity, AlertTriangle, Pill, Droplet, Stethoscope, FileText, Plus, Minus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PatientTextProps {
  text: string;
  verified: boolean;
  lgtm: boolean;
  onUpdate: (newVerified: boolean, newLgtm: boolean) => void;
  onReset: () => void;
  onTextChange: (newText: string) => void;
}

interface PatientData {
  [key: string]: any;
}

const PatientText: React.FC<PatientTextProps> = ({ text, verified, lgtm, onUpdate, onReset, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [jsonData, setJsonData] = useState<PatientData>({});
  const [editedData, setEditedData] = useState<PatientData>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [showAddField, setShowAddField] = useState(false);
  const [addFieldError, setAddFieldError] = useState('');


  useEffect(() => {
    try {
      const parsedData = JSON.parse(text);
      setJsonData(parsedData);
      setEditedData(parsedData);
    } catch (error) {
      console.error("Error parsing initial JSON:", error);
      setJsonData({});
      setEditedData({});
    }
  }, [text]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewKey('');
    setNewValue('');
    setShowAddField(false);
    setAddFieldError('');
    setEditedData(jsonData);  // Revert to original data
  };

  const handleSave = () => {
    setIsEditing(false);
    setNewKey('');
    setNewValue('');
    setShowAddField(false);
    setAddFieldError('');
    setJsonData(editedData);  // Update the main data
    const updatedText = JSON.stringify(editedData, null, 2);
    onTextChange(updatedText);  // Send to parent component/database
  };

  const handleThumbsUp = () => {
    onUpdate(true, true);
  };

  const handleThumbsDown = () => {
    onUpdate(true, false);
  };

  const handleFieldChange = (key: string, value: any) => {
    setEditedData(prev => ({ ...prev, [key]: value }));
  };

  const handleAddNewField = () => {
    if (!newKey.trim() || !newValue.trim()) {
      setAddFieldError('Both key and value must be non-empty.');
      return;
    }
    setEditedData(prev => ({
      ...prev,
      [newKey.trim()]: newValue.trim()
    }));
    setNewKey('');
    setNewValue('');
    setShowAddField(false);
    setAddFieldError('');
  };

  const handleDeleteField = (keyToDelete: string) => {
    setEditedData(prev => {
      const { [keyToDelete]: _, ...rest } = prev;
      return rest;
    });
  };

  const getIcon = (key: string) => {
    switch (key) {
      case 'patient_name': return <User className="h-5 w-5 text-blue-500" />;
      case 'age': return <Calendar className="h-5 w-5 text-green-500" />;
      case 'gender': return <Activity className="h-5 w-5 text-purple-500" />;
      case 'current_symptoms': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'current_medications': return <Pill className="h-5 w-5 text-green-500" />;
      case 'patient_risk_factors': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'lab_reports': return <Droplet className="h-5 w-5 text-blue-500" />;
      case 'diagnostic_tests_and_results': return <Stethoscope className="h-5 w-5 text-purple-500" />;
      default: return <FileText className="h-5 w-5 text-cyan-500 shadow-sm" />;
    }
  };

  const renderEditableField = (key: string, value: any) => {
    return (
      <Textarea
        value={value}
        onChange={(e) => handleFieldChange(key, e.target.value)}
        className="w-full mt-2 h-[7rem] px-3 py-2 resize-none overflow-y-auto border border-gray-300 rounded-md"
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
      />
    );
  };

  const renderField = (key: string, value: any) => {
    return <p className="mt-2">{value}</p>;
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row mb-6 items-center justify-between py-2">
        <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
        <div className="flex items-center space-x-2 flex-grow mr-2 ml-2">
          <StatusIndicator
            verified={verified}
            lgtm={lgtm}
            onThumbsUp={handleThumbsUp}
            onThumbsDown={handleThumbsDown}
            onReset={onReset}
          />
          {!isEditing && (
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Pencil size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* <ScrollArea className="h-[calc(100vh-200px)] pr-4"> */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <User className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Patient Name</h3>
                  <p className="font-semibold text-gray-800">{editedData.patient_name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <Calendar className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Age</h3>
                  <p className="font-semibold text-gray-800">{editedData.age}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <Activity className="h-8 w-8 text-purple-500" />
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Gender</h3>
                  <p className="font-semibold text-gray-800">{editedData.gender}</p>
                </div>
              </div>
            </div>
            {Object.entries(editedData).map(([key, value]) => {
              if (!['patient_id', 'patient_name', 'age', 'gender'].includes(key)) {
                return (
                  <div
                    key={key}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getIcon(key)}
                        <h3 className="text-lg font-semibold">{key}</h3>
                      </div>
                      {isEditing && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteField(key)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus size={16} />
                        </Button>
                      )}
                    </div>
                    {isEditing ? renderEditableField(key, value) : renderField(key, value)}
                  </div>
                );
              }
              return null;
            })}
            {isEditing && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-600">
                {!showAddField ? (
                  <Button onClick={() => setShowAddField(true)} className="w-full">
                    <Plus size={16} className="mr-2" /> Add Field
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold mb-2">Add New Field</h3>
                    <Input
                      placeholder="Key"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      className="w-full"
                    />
                    <Textarea
                      placeholder="Value"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full h-24 resize-none"
                    />
                    {addFieldError && (
                      <Alert variant="destructive">
                        <AlertDescription>{addFieldError}</AlertDescription>
                      </Alert>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => {
                        setShowAddField(false);
                        setNewKey('');
                        setNewValue('');
                        setAddFieldError('');
                      }}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddNewField}>
                        Add Field
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {isEditing && (
              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X size={16} className="mr-2" /> Cancel
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Check size={16} className="mr-2" /> Save
                </Button>
              </div>
            )}
        {/* </ScrollArea> */}
      </CardContent>
    </Card>
  );
};

export default PatientText;