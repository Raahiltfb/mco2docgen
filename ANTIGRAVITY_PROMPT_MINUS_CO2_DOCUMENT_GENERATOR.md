# Minus CO2 Document Generator
## Antigravity Build Prompt

Build an internal web application for Minus CO2 called **Minus CO2 Document Generator**.

The purpose of this application is to eliminate manual creation of repetitive company documents. Users should fill out a structured form, preview the resulting document, and generate a standardized PDF.

A source PDF containing the current **COD Intimation Letter** template is provided alongside this prompt:

`Phase 2 COD Intimation Letter _Manavsthal.docx.pdf`

You MUST inspect the supplied PDF carefully, including both pages and their visual layout, before implementing the COD document. Treat the supplied document as the source of truth for the fixed wording, logo, header, footer, spacing, page structure, and overall visual identity unless this prompt explicitly says otherwise.

---

# 1. Scope for this build

Build the application shell/dashboard now, and fully implement the **COD Intimation Letter**.

The **Work Completion Report (WCR)** option must appear on the dashboard, but WCR generation is NOT part of this implementation yet.

Dashboard:

- COD Intimation Letter
- Work Completion Report

COD Intimation Letter:
- Fully functional
- Form
- Validation
- Preview
- PDF generation

Work Completion Report:
- Visible as an option
- Clearly indicate that it is coming soon / not yet implemented
- Do not invent WCR fields or document content
- Do not build a fake WCR generator

The application should be architected cleanly so WCR can be added later without rebuilding the application.

---

# 2. Dashboard

Create a clean internal-tool dashboard branded for Minus CO2.

Suggested structure:

MINUS CO2
Document Generator

Two large document cards/buttons:

1. COD Intimation Letter
   Generate a standardized Commercial Operational Date Intimation Letter.

2. Work Completion Report
   Coming soon.

Clicking COD Intimation Letter should open the COD generator.

Clicking WCR should either show a "Coming Soon" state/modal or a disabled card. Do not attempt to generate a WCR yet.

Keep the dashboard simple and professional. This is an internal business tool, not a public marketing website.

---

# 3. COD Intimation Letter

Create a form-based document generator.

The workflow should be:

Dashboard
→ COD Intimation Letter
→ Fill form
→ Preview
→ Generate PDF
→ Download/open generated PDF

The generated PDF must be a proper PDF document suitable for sending directly to a client.

---

# 4. Source document and visual fidelity

The supplied PDF is the existing Minus CO2 COD Intimation Letter.

It is a two-page document.

The existing document has:
- Minus CO2 logo at the top
- Green horizontal line/header element
- Letter content
- Corporate footer
- Website, email and phone information
- Consistent overall company identity across both pages

Preserve the existing visual identity.

Do NOT redesign the document unnecessarily.

The goal is to standardize and automate the existing document, not create a new letter design.

However, the current document has some font/size inconsistencies. As part of the implementation, standardize the typography so the generated document has:
- One consistent font family
- Consistent body font size
- Consistent heading/subject styling
- Consistent line spacing
- Consistent paragraph spacing
- Consistent bolding
- Consistent alignment
- Consistent margins

Do not make arbitrary visual changes beyond what is necessary for professional consistency.

The logo, header, footer, wording and company identity should remain faithful to the supplied source document.

---

# 5. Editable vs fixed content

IMPORTANT:

Only the fields explicitly identified below should be editable.

Everything else from the source document remains fixed.

Do not expose fixed document wording as user inputs.

---

# 6. COD Form Fields

## A. Letter Date

Field:
- Letter Date

Behavior:
- Automatically detect/use the current date when generating the document.
- The user should NOT normally have to enter this manually.
- Use a consistent date format.

The current source document shows:
`Date:21/02/2026`

The automated version should use the current date at generation time.

---

## B. Client / Recipient

Fields:

### Client / Society Name
Single-line text input.

### Client Address
Multiline text input.

The entire recipient block underneath "To" is editable.

The current source contains:

Manavsthal Tower CO-OP HSG.Society LTD,
CTS No.2841, Village Malwani, Taluka-Borivali, off.Marve Road,
Malad West, Mumbai - 400095

This entire block is an example only. It must be replaced by the user's form input.

Do not hardcode Manavsthal Tower as the client.

---

# 7. Project Details

The source sentence is:

"I am pleased to inform you that the installation of 71.98 KWp Solar System For D-Wing (Phase 2) has been Completed along with the Generation Meter and Net Meter has been successfully completed."

Only the following pieces are editable:

### System Capacity
Input:
- Numeric
- Unit displayed as kWp

Example:
`71.98`

The generated document should render it as:
`71.98 KWp`

### Building
Input:
- Text

Example:
`D-Wing`

### Phase
Input:
- Text

Example:
`Phase 2`

These fields should be inserted into the fixed sentence.

Do not allow the user to edit the entire paragraph.

Maintain the source document's wording except for inserting the supplied values.

---

# 8. Joint Reading Person

Field:

### Joint Reading Person Name
Text input.

Example:
`Kinnari Koppikar`

This ONE input must populate every relevant occurrence in the document.

It should populate:

"Today, we jointly took the first reading with Ms [NAME] the official from your society."

And:

"Name: [NAME]"

Do not ask the user to enter the same person's name twice.

---

# 9. Energy Provider

Field:

### Energy Provider
Text input.

Example:
`Adani`

This value replaces the provider in:

"The net meter measures both import and export units to determine the amount of energy consumed from [ENERGY PROVIDER]."

Do not alter the rest of the paragraph.

---

# 10. Joint Reading Date

Field:

### Joint Reading Date
Date picker.

IMPORTANT:
This is manually entered by the user.

It must NOT automatically use today's date.

The source currently shows:
`21/02/2026`

The user must be able to choose a different date.

This date appears in:

"Please find the joint readings taken on Date: [DATE]"

Use a consistent readable date format in the final document.

---

# 11. Meter Readings

The source currently contains one generation meter and one net meter section.

The application MUST support multiple generation meters.

Do NOT hardcode a single meter.

Start the form with:

### Generation Meter 1

Fields:

- Generation Meter Reading
- Net Meter Import
- Net Meter Export

Example:

Generation Meter 1:
- Generation: 0.0 KWH
- Import: 100
- Export: 50

Provide:

`+ Add Generation Meter`

When clicked, create:

### Generation Meter 2

with its own:
- Generation Meter Reading
- Net Meter Import
- Net Meter Export

Continue allowing additional meters.

The number of meters should be dynamic.

Each meter must have independent values.

The generated document should dynamically render all entered meters in a clean, standardized format.

For example, if there are two meters:

1. Generation Meter: 0.0 KWH
   Net Meter:
   A) Import: 100 KWH
   B) Export: 50 KWH

2. Generation Meter: 0.0 KWH
   Net Meter:
   A) Import: 200 KWH
   B) Export: 75 KWH

Use the source document's terminology and structure as the baseline.

Do not invent additional meter types or fields.

The user should also be able to remove an added meter if necessary.

---

# 12. Joint Reading Signature Section

The source contains:

"Joint Reading person Name with Sign"

"Name: Kinnari Koppikar"

"Sign:"

The name should automatically use the Joint Reading Person Name field.

Do NOT create another name input.

The signature area itself should remain a blank area / line for physical signing unless there is a later requirement for digital signatures.

Do not invent a digital signature workflow.

---

# 13. First Billing Reading Date

Field:

### First Reading for Billing Date

Date picker.

IMPORTANT:
This is manually entered by the user.

It must NOT automatically use today's date.

The source currently says:

"Please note: Our first readings for billing is scheduled for 28th February 2026."

The selected date should be automatically formatted into a natural written date.

For example:

Input:
`28/02/2026`

Output:
`28th February 2026`

The rest of this paragraph remains fixed.

The following wording remains fixed:

"The generation invoice will be sent to you between the 1st and 5th of the following month, and the payment due date would be 15 days from the invoice date."

Do not expose this wording as editable.

---

# 14. Issuing Company

Field:

### Issuing Company

This MUST be a dropdown, not free text.

Options:

1. Minus CO2 Pvt. Ltd.
2. Minus CO2 Solar Assist LLP.

The selected company should be reflected in:

"For [COMPANY]."

The company selection should also control the relevant company identity where appropriate in the signature area.

Do not allow arbitrary company names.

IMPORTANT:
The source document currently contains:
`MINUS CO2 SOLAR ASSIST LLP`

The implementation must support the two specified options above.

If the two company options have different official footer/company details, structure the application so those details can be configured centrally rather than duplicated throughout the code. Do not invent different addresses or contact details unless they are supplied later.

For now, preserve the supplied source footer/company details from the template unless a later requirement explicitly changes them.

---

# 15. Authorized Signatory

Fields:

### Signatory Name
Text input.

Example:
`AKSHAY PATIL.`

### Signatory Designation
Text input.

Example:
`Manager - Accounts & Administration.`

These replace the existing signatory information.

The name and designation should be separate inputs.

Do not duplicate the signatory name in multiple form fields.

---

# 16. Fixed content

The following content should remain fixed based on the supplied source PDF:

- Subject: Commercial Operational Date (COD) Intimation
- Dear Chairman / Secretary / Treasurer.
- Main explanation of installation completion
- Explanation of generation meter
- Explanation of net meter
- Explanation of check meter
- Billing/invoice explanation
- Thank you for choosing us as your partner in sustainable energy.
- Corporate office details
- Website
- Email
- Phone number
- Logo
- Header
- Footer
- General page layout

Do not rewrite the source language unless required to insert an editable value.

Preserve the source terminology.

---

# 17. PDF generation

This is a core requirement.

The final output MUST be a PDF.

The generated PDF should:
- Have clean page breaks
- Preserve the Minus CO2 branding
- Keep the header/logo correctly positioned
- Keep the footer correctly positioned
- Have no clipped text
- Have no overlapping text
- Handle longer client addresses
- Handle longer building/phase names
- Handle multiple generation meters
- Handle longer signatory names/designations
- Maintain professional spacing

The PDF should not look like a web page printed to PDF.

Prefer a deterministic document/PDF generation approach where the template layout is controlled directly.

If the implementation uses HTML/CSS as an intermediate format, make sure the PDF rendering is tested carefully.

---

# 18. Preview

Before generating/downloading the final PDF, provide a preview.

The user should be able to review the completed document before final generation.

Recommended workflow:

[Preview Document]

Then show a PDF-like preview.

Then:

[Generate PDF]

The generated PDF should use the exact same data and layout as the preview.

---

# 19. Validation

Add sensible validation.

Required:
- Client / Society Name
- Client Address
- System Capacity
- Building
- Phase
- Joint Reading Person Name
- Energy Provider
- Joint Reading Date
- At least one generation meter
- Generation Meter Reading for each meter
- Import value for each meter
- Export value for each meter
- First Billing Reading Date
- Issuing Company
- Signatory Name
- Signatory Designation

Capacity and meter readings should accept appropriate numeric values.

Do not over-restrict real-world values unnecessarily.

Show clear validation messages.

---

# 20. Form UX

Organize the form into sections:

1. Client Details
2. Project Details
3. Joint Reading Details
4. Meter Readings
5. Billing Details
6. Letter / Signatory Details

Use date pickers for dates.

Use numeric inputs for numeric values.

Use a dropdown for issuing company.

Use multiline input for client address.

Provide clear Add Meter / Remove Meter controls.

The form should feel like an internal business application and should be quick for staff to complete.

---

# 21. File naming

Use a standardized filename for generated PDFs.

Recommended pattern:

`COD_Intimation_[ClientName]_[Capacity]kWp_[Date].pdf`

Sanitize the client name so the filename is safe.

Example:

`COD_Intimation_Manavsthal_Tower_71.98kWp_08-09-2026.pdf`

---

# 22. Technical expectations

Build this as a production-quality internal application, not a throwaway demo.

Requirements:
- Clean component structure
- Maintainable code
- Strong separation between form data and document rendering
- Centralized document/template configuration
- Easy to add WCR later
- No unnecessary dependencies
- No hardcoded user-specific project values
- No hardcoded Manavsthal data
- No fake functionality
- Proper error handling
- Responsive UI

The application should run locally using the project's normal development command.

---

# 23. Architecture for future WCR

Even though WCR is not being implemented now, structure the application so future documents can follow the same pattern.

Conceptually:

Document Generator
├── Dashboard
├── COD Intimation
│   ├── Form
│   ├── Preview
│   └── PDF Generator
└── WCR
    └── Coming Soon

Keep document-specific logic separate.

Do not mix COD-specific fields throughout the global application.

---

# 24. Important implementation principle

There are three categories of data:

### Dynamic user data
Entered in the form.

### Automatically generated data
For example, the letter generation date.

### Fixed template data
The official Minus CO2 wording, logo, footer, formatting, etc.

Keep these categories separate in the implementation.

The PDF should be generated by combining the fixed template with the dynamic data.

---

# 25. Source-of-truth instruction

The supplied PDF is the authoritative source for the existing COD Intimation Letter's wording and visual structure.

Inspect both pages.

Do not rely solely on text extraction. Visually inspect the pages so that logo placement, spacing, footer placement, page breaks and other layout details are preserved.

The source is a two-page document. The generated document should remain professionally structured across pages.

Do not silently "improve" the wording.

If a formatting adjustment is necessary because dynamic content changes the layout, preserve the visual hierarchy and intent of the source.

---

# 26. Definition of done

This implementation is complete when:

1. The dashboard opens.
2. The dashboard has COD Intimation Letter and WCR options.
3. COD Intimation Letter opens a working form.
4. All specified editable fields are present.
5. The letter date is automatic.
6. Joint reading date is manual.
7. First billing reading date is manual.
8. Multiple generation meters can be added and removed.
9. Joint reading person's name is reused automatically.
10. Issuing company is a dropdown with exactly the two specified options.
11. Signatory name and designation are editable.
12. Fixed content remains fixed.
13. The existing logo/header/footer are preserved.
14. Typography is standardized.
15. A document preview works.
16. PDF generation works.
17. Generated PDFs are professionally formatted and usable.
18. Longer text and multiple meters do not break the layout.
19. WCR is visible but not implemented.
20. The codebase is structured so WCR can be added later.

Do not stop at creating the UI mockup. The COD Intimation Letter must actually generate the PDF.

Before considering the work complete, test the PDF with:
- Short client address
- Long client address
- One meter
- Two meters
- Three or more meters
- Long building/phase text
- Different signatory names
- Both issuing-company dropdown options

The result should be a polished internal Minus CO2 document-generation tool.
