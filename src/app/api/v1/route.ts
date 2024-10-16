import { NextResponse } from 'next/server'

const mockData = {
  "patient": {
    "d59fe1bd-17c6-4645-b383-d62bbe26dde8": "Daniel Walker",
    "a1b2c3d4-e5f6-4747-a8b9-c0d1e2f3g4h5": "Emily Johnson",
    "h5g4f3e2-d1c0-4848-b9a8-7654321fedcb": "Michael Smith",
    "i9j8k7l6-m5n4-4949-o3p2-q1r0s9t8u7v6": "Sarah Brown",
    "v6u5t4s3-r2q1-5050-p0o9-n8m7l6k5j4i3": "David Lee"
  },
  "guideline": {
    "6cfd94044eb9dc4af51df1c0ad6978ebae6a5f09d05df97dc898a9e8b608af36": "Thyroid Storm Management",
    "7dfe05155fca0d5bf62ef2d1be7a89fcbf7b6e1aef6ea8edc999baf9c719be47": "Graves' Disease Treatment",
    "8egf16266gdb1e6cg73fg3e2cf8b9agdcg8c7f2bfg7fb9fedeaaacbgad82acf58": "Hyperthyroidism in Pregnancy",
    "9fhg27377hec2f7dh84gh4f3dg9c0bhgdh9d8g3cgh8gca0gfefbbdchbe93bdg69": "Radioactive Iodine Therapy Guidelines",
    "0gih38488ifd3g8ei95hi5g4eh0d1ciheie9h4dhi9hdb1hgfgccedcif04ceh70": "Thyroidectomy Procedures"
  }
}

export async function GET() {
  // Simulate a delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(mockData)
}