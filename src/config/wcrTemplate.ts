import { WCRFormData } from '../types/wcr';

export const WCR_FIXED_TEXT = {
  documentTitle: 'SOLAR PV SYSTEM WORK COMPLETION REPORT',
  
  scopeOfWorkIntro: 'The scope of work included design, supply, installation, testing, and commissioning of a grid-connected solar photovoltaic system, including:',
  
  scopeOfWorkBullets: [
    'Supply and installation of solar PV modules',
    'Supply and installation of grid-tied inverter',
    'Module mounting structure installation',
    'DC and AC cabling with proper dressing and tagging',
    'DCDB, ACDB, isolators, earthing, and lightning protection',
    'String formation, testing, and commissioning',
    'System handover after successful testing',
  ],

  stringConfigSentence: (numStrings: string, inverterMake: string, inverterSize: string) =>
    `The solar PV array is configured into ${numStrings || '__'} DC strings connected to the ${inverterMake || 'Solis'} ${inverterSize || '110 kW'} inverter. String voltage and current readings were recorded during commissioning as detailed below:`,
};

export const INITIAL_WCR_FORM_DATA: WCRFormData = {
  // Section 1: Project Details
  projectName: 'Solar PV System Installation at Courtyard IVY Housing Society',
  clientName: 'Courtyard IVY CHS LTD.',
  siteLocation: 'Pokhran Rd No. 2, opposite GlaxoSmithKline, Pawar Nagar, Thane West, Maharashtra 400610',
  installedCapacity: '80 kWp (DC)',
  inverterCapacity: '80 kW (AC)',
  systemType: 'On-Grid Solar PV System',
  completionDate: '',

  // Section 3: System Configuration
  moduleMake: 'Premier',
  moduleRatedCap: '600 Wp per module',
  moduleQty: '136 Nos.',
  moduleTotalDcCap: '81.6 kW',
  modulesSerialNo: '',
  inverterSerialNo: '',

  inverterMake: 'Solis',
  inverterRatedCap: '80 kW',
  inverterType: 'String Inverter',

  // Section 4: String Configuration
  dcStringsCount: '8',
  stringInverterMake: 'Solis',
  stringInverterSize: '110 kW',
  stringRows: Array.from({ length: 8 }, (_, i) => ({
    id: `string-${i + 1}`,
    stringNo: i + 1,
    mpptNo: `${Math.floor(i / 2) + 1}`,
    time: '12:30 PM',
    noOfModules: '17',
    stringVoltage: '',
    stringCurrent: '',
  })),

  phaseVoltages: {
    ry: '',
    yb: '',
    br: '',
    rpn: '',
    ypn: '',
    bpn: '',
    pe: '',
  },

  phaseCurrents: {
    rPhase: '',
    yPhase: '',
    bPhase: '',
  },

  // Section 5: Electrical Installation
  dcCables: 'As per approved design and inverter specifications',
  acCables: 'As per load and utility standards',
  dcdbInstalled: 'Yes',
  acdbInstalled: 'Yes',
  acIsolator: 'Provided',
  earthingSystem: 'Provided for modules, inverter, and panels',
  lightningArrester: 'Installed',

  // Section 6: Net Metering
  netMeterApp: 'Submitted',
  netMeterInstalled: 'Yes',
  dateOfSync: '',
  discom: 'MSEDCL',
  meterTypeRatio: '',
  ctRatio: '',

  // Section 7: Client Remark
  clientRemark: '',

  // Sign-off Area
  companyName: 'MinusCO2 Energy Pvt.Ltd.',
  companySignatoryName: '',
  companySignatoryDesignation: '',
  clientSignatoryName: 'IVY Courtyard Housing Society',
  clientSignatoryDesignation: '',
};
