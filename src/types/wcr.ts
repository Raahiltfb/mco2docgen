export interface StringRow {
  id: string;
  stringNo: number;
  mpptNo: string;
  time: string;
  noOfModules: string;
  stringVoltage: string;
  stringCurrent: string;
}

export interface PhaseVoltages {
  ry: string;
  yb: string;
  br: string;
  rpn: string;
  ypn: string;
  bpn: string;
  pe: string;
}

export interface PhaseCurrents {
  rPhase: string;
  yPhase: string;
  bPhase: string;
}

export interface WCRFormData {
  // Section 1: Project Details
  projectName: string;
  clientName: string;
  siteLocation: string;
  installedCapacity: string;
  inverterCapacity: string;
  systemType: string;
  completionDate: string; // YYYY-MM-DD format (manual date)

  // Section 3.1: Solar PV Modules
  moduleMake: string;
  moduleRatedCap: string;
  moduleQty: string;
  moduleTotalDcCap: string;
  modulesSerialNo: string;
  inverterSerialNo: string;

  // Section 3.2: Inverter Details
  inverterMake: string;
  inverterRatedCap: string;
  inverterType: string;

  // Section 4: String Configuration Details
  dcStringsCount: string; // numeric integer string, e.g. "8"
  stringInverterMake: string; // e.g. "Solis"
  stringInverterSize: string; // e.g. "110 kW"
  stringRows: StringRow[];

  // AC side Voltages and current
  phaseVoltages: PhaseVoltages;
  phaseCurrents: PhaseCurrents;

  // Section 5: Electrical Installation Details
  dcCables: string;
  acCables: string;
  dcdbInstalled: string;
  acdbInstalled: string;
  acIsolator: string;
  earthingSystem: string;
  lightningArrester: string;

  // Section 6: Net Metering Status
  netMeterApp: string;
  netMeterInstalled: string;
  dateOfSync: string; // YYYY-MM-DD
  discom: string;
  meterTypeRatio: string;
  ctRatio: string;

  // Section 7: Client Remark
  clientRemark: string;

  // Sign-off Area
  companyName: string;
  companySignatoryName: string;
  companySignatoryDesignation: string;
  clientSignatoryName: string;
  clientSignatoryDesignation: string;
}

export interface WCRValidationErrors {
  [key: string]: string;
}
