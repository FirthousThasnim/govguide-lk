export type Service = {
  id: string;
  name: string;
  category: string;
  department: string;
  description: string;
  documents: string[];
  fee: string;
  processingTime: string;
  steps: string[];
};

export const services: Service[] = [
  {
    id: '1',
    name: 'National Identity Card (NIC) - New',
    category: 'Identity',
    department: 'Department for Registration of Persons',
    description: 'Apply for a new National Identity Card for citizens aged 15 and above.',
    documents: ['Birth certificate', 'Grama Niladhari certificate', 'Two passport size photos', 'Parents NIC copies'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Varies by office',
    steps: [
      'Collect the application form from the Grama Niladhari',
      'Fill in the form and attach the required documents',
      'Submit through the Divisional Secretariat',
      'Collect the NIC when notified',
    ],
  },
  {
    id: '2',
    name: 'Passport - New Application',
    category: 'Travel',
    department: 'Department of Immigration and Emigration',
    description: 'Apply for a new Sri Lankan passport for travel abroad.',
    documents: ['NIC', 'Birth certificate', 'Two passport size photos', 'Completed application form'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Normal or same day service available',
    steps: [
      'Fill in the application form',
      'Visit the Immigration office or the relevant regional office',
      'Submit documents and pay the fee',
      'Collect the passport on the given date',
    ],
  },
  {
    id: '3',
    name: 'Driving Licence - New',
    category: 'Transport',
    department: 'Department of Motor Traffic',
    description: 'Obtain a new driving licence after passing the required tests.',
    documents: ['NIC', 'Medical certificate', 'Two photos', 'Learner permit'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Varies',
    steps: [
      'Obtain a medical certificate',
      'Get the learner permit',
      'Pass the written and practical tests',
      'Pay the fee and collect the licence',
    ],
  },
  {
    id: '4',
    name: 'Birth Certificate - Copy',
    category: 'Civil Registration',
    department: 'Registrar General Department',
    description: 'Get a certified copy of a birth certificate.',
    documents: ['Applicant NIC', 'Birth registration details', 'Application form'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Varies',
    steps: [
      'Fill in the application form',
      'Submit at the Divisional Secretariat or Registrar office',
      'Pay the fee',
      'Collect the certified copy',
    ],
  },
  {
    id: '5',
    name: 'Marriage Certificate - Copy',
    category: 'Civil Registration',
    department: 'Registrar General Department',
    description: 'Get a certified copy of a marriage certificate.',
    documents: ['Applicant NIC', 'Marriage registration details', 'Application form'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Varies',
    steps: [
      'Fill in the application form',
      'Submit at the Registrar office',
      'Pay the fee',
      'Collect the certified copy',
    ],
  },
    {
    id: '6',
    name: 'Police Clearance Certificate',
    category: 'Identity',
    department: 'Sri Lanka Police',
    description: 'Obtain a police clearance report, often needed for jobs and visas.',
    documents: ['NIC', 'Passport copy', 'Completed application form'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Varies',
    steps: [
      'Fill in the application form',
      'Submit at the relevant police office',
      'Pay the fee',
      'Collect the report when ready',
    ],
  },
  {
    id: '7',
    name: 'Vehicle Revenue Licence Renewal',
    category: 'Transport',
    department: 'Provincial Department of Motor Traffic',
    description: 'Renew the annual revenue licence of your vehicle.',
    documents: ['NIC', 'Vehicle registration certificate', 'Valid insurance certificate'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Usually same day',
    steps: [
      'Renew your vehicle insurance',
      'Visit the relevant licensing office',
      'Pay the fee',
      'Collect the new licence label',
    ],
  },
  {
    id: '8',
    name: 'Death Certificate - Copy',
    category: 'Civil Registration',
    department: 'Registrar General Department',
    description: 'Get a certified copy of a death certificate.',
    documents: ['Applicant NIC', 'Death registration details', 'Application form'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Varies',
    steps: [
      'Fill in the application form',
      'Submit at the Registrar office',
      'Pay the fee',
      'Collect the certified copy',
    ],
  },
  {
    id: '9',
    name: 'Electoral Register Enrolment',
    category: 'Identity',
    department: 'Election Commission',
    description: 'Register your name in the electoral register to be able to vote.',
    documents: ['NIC', 'Proof of residence'],
    fee: 'Free',
    processingTime: 'Varies',
    steps: [
      'Get the registration form from the Grama Niladhari',
      'Fill in the form and attach documents',
      'Submit it to the Grama Niladhari',
      'Check the register when it is published',
    ],
  },
  {
    id: '10',
    name: 'Business Registration (Sole Proprietorship)',
    category: 'Business',
    department: 'Divisional Secretariat / Registrar of Business Names',
    description: 'Register a small business under your own name.',
    documents: ['NIC', 'Proof of business address', 'Completed application form'],
    fee: 'Check with the department for the current fee',
    processingTime: 'Varies',
    steps: [
      'Choose a business name',
      'Fill in the application form',
      'Submit at the Divisional Secretariat',
      'Collect the registration certificate',
    ],
  },
];