# Minus CO2 Document Generator
## WCR Implementation Prompt

We already have a working Minus CO2 Document Generator application with a Dashboard, a completed COD Intimation Letter generator, and a Work Completion Report (WCR) currently shown as Coming Soon.

The COD implementation is approved and must NOT be modified. Replace only the WCR Coming Soon state with a fully functional WCR generator.

## CRITICAL: DO NOT MODIFY COD

Do not redesign or refactor the working COD implementation unless absolutely required to add WCR cleanly. Do not change COD wording, form fields, PDF layout, PDF generation, header, footer, logo, typography, or behavior.

Use the existing COD implementation as the architectural and UX pattern for WCR.

---

# 1. SOURCE DOCUMENT

The supplied source PDF is:

`IVY Courtyard WCR.docx.pdf`

It is the existing four-page Minus CO2 Work Completion Report template.

Inspect all four pages and their rendered visual layout before implementing.

Treat the supplied PDF as the source of truth for:
- fixed wording
- section organization
- logo
- green header element
- footer
- tables
- page structure
- terminology
- signature structure
- visual hierarchy

Do not silently rewrite, grammar-correct, shorten, or otherwise improve the source wording. This is an automation and standardization project, not a copywriting exercise.

---

# 2. WORKFLOW

The WCR workflow should be:

Dashboard
→ Work Completion Report
→ Fill form
→ Live A4 preview
→ Generate PDF

The output must be a proper A4 PDF suitable for sending to a client.

---

# 3. DASHBOARD

The existing dashboard has:
- COD Intimation Letter
- Work Completion Report

Keep the COD card unchanged.

Make the WCR card active and open the WCR generator.

Do not remove or alter the COD functionality.

---

# 4. SECTION 1: PROJECT DETAILS

All project details in this section are editable.

Fields:

### Project Name
Text input.

### Client Name
Text input.

### Site Location
Multiline text input.

### Installed System Capacity
Numeric input.
The source example is `80 kWp (DC)`.

### Inverter Capacity
Numeric input.
The source example is `80 kW (AC)`.

### Type of System
Text input.
The source example is `On-Grid Solar PV System`.

### Date of Completion
Date picker.
This is manually entered. Do NOT automatically replace it with today's date.

The source currently has a blank completion-date line.

---

# 5. SECTION 2: SCOPE OF WORK

Scope of Work is FIXED. Do not create editable fields for it.

Preserve the source wording and bullet structure:

The scope of work included design, supply, installation, testing, and commissioning of a grid-connected solar photovoltaic system, including:

- Supply and installation of solar PV modules
- Supply and installation of grid-tied inverter
- Module mounting structure installation
- DC and AC cabling with proper dressing and tagging
- DCDB, ACDB, isolators, earthing, and lightning protection
- String formation, testing, and commissioning
- System handover after successful testing

Do not silently change this wording.

---

# 6. SECTION 3: SYSTEM CONFIGURATION DETAILS

All fields in System Configuration Details are editable.

## 3.1 Solar PV Modules

Editable fields:

- Make
- Rated Capacity
- Total Quantity
- Total DC Capacity
- Modules Serial Number

The source examples are:
- Make: Premier
- Rated Capacity: 600 Wp per module
- Total Quantity: 136 Nos.
- Total DC Capacity: 81.6 kW

Do not hardcode these values.

## 3.2 Inverter Details

Editable fields:

- Make
- Rated Capacity
- Type

The source examples are:
- Make: Solis
- Rated Capacity: 80 kW
- Type: String Inverter

Do not hardcode these values.

---

# 7. SECTION 4: STRING CONFIGURATION DETAILS

The source sentence is:

"The solar PV array is configured into __ DC strings connected to the Solis 110 kW inverter. String voltage and current readings were recorded during commissioning as detailed below:"

Only these values are dynamic:

### Number of DC Strings
Numeric input, positive integer.

### Inverter Make
Text input.

### Inverter Size
Text/numeric input, such as `110 kW`.

Generate the fixed sentence by inserting these values:

"The solar PV array is configured into [NUMBER] DC strings connected to the [INVERTER MAKE] [INVERTER SIZE] inverter. String voltage and current readings were recorded during commissioning as detailed below:"

Do not make the whole sentence editable.

---

# 8. STRING VOLTAGE AND CURRENT TABLE

The source table is titled:

`String voltages and Current details`

Columns:

- String No.
- MPPT NO
- Time
- No. of Modules
- String Voltage (V DC)
- String Current (I DC)

The measurement values are editable.

The number of rows should dynamically correspond to the Number of DC Strings.

For example, if the user enters 8 DC strings, create 8 rows.

Each row contains:
- String No.
- MPPT No.
- Time
- No. of Modules
- String Voltage
- String Current

String No. should preferably be automatically numbered 1, 2, 3, etc. based on row position.

The user enters the other values.

Provide a sensible way to adjust rows if required, without breaking the configured string count.

If the table becomes too long for one page, allow it to flow cleanly to subsequent pages. Do not shrink the entire document to unreadable text.

---

# 9. AC SIDE VOLTAGES AND CURRENT

Preserve the source heading:

`AC side Voltages and current`

## Phase Voltages

Fixed phase labels:

- R-Y
- Y-B
- B-R
- R-P-N
- Y-P-N
- B-P-N
- P-E

The voltage value for each row is editable.

Do not alter the phase labels or invent additional phases.

## Phase Current

Fixed phase labels:

- R phase
- Y phase
- B phase

The current value for each row is editable.

---

# 10. SECTION 5: ELECTRICAL INSTALLATION DETAILS

All values in this section are editable.

The fixed labels are:

- DC Cables
- AC Cables
- DCDB Installed
- ACDB Installed
- AC Isolator
- Earthing System
- Lightning Arrester

The associated values are editable.

The source examples are:

DC Cables: As per approved design and inverter specifications
AC Cables: As per load and utility standards
DCDB Installed: Yes
ACDB Installed: Yes
AC Isolator: Provided
Earthing System: Provided for modules, inverter, and panels
Lightning Arrester: Installed

Do not hardcode these example values.

Keep the labels fixed and make their values editable.

---

# 11. SECTION 6: NET METERING STATUS

All values in this section are editable.

Fixed labels:

- Net Meter Application
- Net Meter Installed
- Date of Synchronization
- Discom
- Meter Type-(Ratio)
- CT-(Ratio)

The source examples are:
- Net Meter Application: Submitted
- Net Meter Installed: Yes

Do not hardcode them.

Use a date picker for Date of Synchronization where appropriate.

Allow the user to enter Discom, Meter Type/Ratio, and CT Ratio.

---

# 12. SECTION 7: CLIENT REMARK

The source contains a dedicated Client Remark section with blank lines.

Implement this as a multiline text field.

If no remark is entered, preserve a clean blank remark area in the generated document.

Do not invent additional fields.

---

# 13. SIGN-OFF AREA

Preserve the source's two-sided sign-off structure:

Company name | Client
Name | Name
Designation | Designation
Signature | Signature

Do not invent signatory names or designations.

Use the WCR Client Name from Project Details for the client name rather than asking for duplicate client information.

For the company side, preserve the Minus CO2 company identity from the existing template/application.

Keep unspecified signatory fields blank or appropriately editable only as needed to faithfully reproduce the template. Do not invent data.

---

# 14. FORM UX

Organize the form into logical sections:

1. Project Details
2. System Configuration
3. String Configuration
4. Electrical Installation
5. Net Metering
6. Client Remark
7. Sign-off

Use:
- text inputs
- multiline inputs
- numeric inputs
- date pickers
- structured tables
- appropriate controls for Yes/No values where useful

Do not require duplicate entry of information that is already known from another field.

---

# 15. FORM VALIDATION

Required core project fields:
- Project Name
- Client Name
- Site Location
- Installed System Capacity
- Inverter Capacity
- Type of System
- Date of Completion

Also validate required system configuration fields where appropriate.

DC string count must be a positive integer.

String readings should correspond to the configured number of strings.

Measurement fields should accept sensible numeric values without unnecessarily restricting real-world readings.

Do not show `undefined`, `null`, or broken placeholders for empty optional fields.

---

# 16. VISUAL STANDARDIZATION

The current WCR contains inconsistent formatting. Standardize it while preserving the existing design.

Use:
- one professional font family
- consistent body font size
- consistent section heading size
- consistent subsection hierarchy
- consistent line spacing
- consistent paragraph spacing
- consistent table typography
- consistent table borders
- consistent margins
- consistent alignment

Preserve:
- Minus CO2 logo
- green top accent/header element
- footer
- section numbering
- table structure
- overall A4 document identity

Do NOT redesign it into a modern web-style report.

The result should look like a professionally standardized version of the supplied WCR.

---

# 17. PAGE STRUCTURE

The source WCR is four pages.

Aim to preserve the source's page structure and hierarchy.

Dynamic content must still be handled safely.

Requirements:
- A4 pages
- no clipped text
- no overlapping text
- no table overflow
- no footer collisions
- clean page breaks
- readable tables
- consistent header/footer treatment

If the string table requires more space, let it continue naturally across pages.

Do not force everything into exactly four pages if doing so makes the document unreadable.

---

# 18. LIVE PREVIEW

Create a live A4 preview similar to the existing COD preview.

The preview must use the same data/template logic as the generated PDF.

The user should be able to review the completed WCR before generating the final PDF.

---

# 19. PDF GENERATION

Create a dedicated WCR PDF document component using the same deterministic PDF-generation approach already used by COD.

Do not unnecessarily modify the COD PDF generator.

The WCR PDF must:
- be A4
- use the supplied Minus CO2 logo
- preserve the green header
- preserve the footer
- preserve the document hierarchy
- render tables cleanly
- support dynamic string rows
- handle long text
- handle page breaks
- contain no clipping or overlap

Actually generate the PDF. Do not stop at a browser-only preview.

---

# 20. FILE NAME

Use:

`WCR_[ClientName]_[Capacity]kWp_[Date].pdf`

Example:

`WCR_Courtyard_IVY_80kWp_09-09-2026.pdf`

Sanitize the client name for filesystem safety.

Use Date of Completion for the filename when supplied.

If Date of Completion is blank, use the generation date for the filename only. Do not replace the document's completion date with today's date.

---

# 21. ARCHITECTURE

Keep WCR-specific data and rendering separate from COD.

Conceptually:

Document Generator
├── Dashboard
├── COD
│   └── existing approved implementation, unchanged
└── WCR
    ├── WCRForm
    ├── WCRPreview
    └── WCRPdfDocument

Use reusable components where appropriate, but do not introduce a refactor that risks breaking COD.

---

# 22. SOURCE-SPECIFIC CONTENT CHECK

The supplied WCR contains:

Page 1:
- SOLAR PV SYSTEM WORK COMPLETION REPORT
- 1. Project Details
- 2. Scope of Work
- 3. System Configuration Details
- 3.1 Solar PV Modules
- 3.2 Inverter Details

Page 2:
- 4. String Configuration Details
- String voltage/current table
- AC side Voltages and current
- Phase voltage table
- Phase current table

Page 3:
- continuation of phase current
- 5. Electrical Installation Details
- 6. Net Metering Status
- 7. Client Remark
- company/client sign-off

Page 4:
- continuation of sign-off area as shown in the source

Use the actual supplied PDF for exact layout and page positioning rather than relying only on this text description.

---

# 23. TESTING

Before declaring WCR complete, perform actual testing.

### Basic case
- normal project name
- normal client
- normal address
- normal capacities
- normal module/inverter details
- several string rows
- electrical details
- net-meter details

### Dynamic string cases
Test:
- 4 strings
- 8 strings
- 12+ strings

Verify table rows and pagination.

### Long text
Test:
- long project name
- long client name
- long site address
- long inverter make/description
- long electrical detail values

Verify no clipping or overlap.

### PDF verification
Actually click Generate/Download PDF.

Inspect the actual PDF page by page.

Compare it against the supplied WCR source for:
- logo
- green header
- typography
- margins
- section positioning
- tables
- page breaks
- footer
- sign-off area

Do not declare completion based only on the browser preview.

---

# 24. DEFINITION OF DONE

WCR is complete when:

1. Dashboard WCR card is active.
2. COD remains unchanged and functional.
3. WCR opens its own generator.
4. All specified Project Details are editable.
5. Scope of Work remains fixed.
6. All Solar PV Module fields are editable.
7. All Inverter Details fields are editable.
8. DC string count is dynamic.
9. Inverter make and inverter size in the string sentence are dynamic.
10. String readings are editable.
11. String table rows respond appropriately to string count.
12. AC voltage values are editable.
13. Phase current values are editable.
14. Electrical Installation Details values are editable.
15. Net Metering Status values are editable.
16. Client Remark is supported.
17. Sign-off structure is preserved.
18. Typography is standardized.
19. Logo/header/footer are preserved.
20. Live A4 preview works.
21. Actual PDF generation works.
22. PDF page breaks are clean.
23. Dynamic string tables do not break the PDF.
24. Filename follows the WCR convention.
25. The result looks like a polished, standardized version of the supplied WCR.

Do not stop at a UI mockup.

Most importantly: DO NOT MODIFY THE ALREADY-APPROVED COD IMPLEMENTATION.
